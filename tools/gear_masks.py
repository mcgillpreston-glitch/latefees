"""Build clothing masks so equipped gear can recolour the heroes' painted clothes.

For each hero this writes one atlas, art/mask/<hero>.webp: every frame (base image + animation
frames) as a strip of 4 alpha masks side by side (top, inner, pants, shoes), each the size of the
frame, stacked top to bottom. The row offsets go into art/manifest.js as <hero>.mask.y[frame].
  top   = outer upper-body garment (recoloured by the jacket, or the shirt if no jacket)
  inner = under layer, only where a hero visibly has one (recoloured by the shirt)
  pants = recoloured by pants
  shoes = recoloured by shoes
Masks come from per-hero colour rules below. Run: python3 tools/gear_masks.py [--preview out.png]
"""
import sys, os, json, re
import cv2, numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FR = ['', 'walk1', 'walk2', 'walk3', 'walk4', 'attack1', 'attack2', 'attack3', 'finish1', 'finish2', 'finish3', 'jump', 'jump2', 'jump3', 'kick',
      'hurt', 'hurt2', 'down', 'getup1', 'getup2', 'special', 'special2', 'special3', 'special4']

def hsv_of(im):
    hsv = cv2.cvtColor(im[..., :3], cv2.COLOR_RGB2HSV).astype(np.int16)
    return hsv[..., 0], hsv[..., 1], hsv[..., 2]

def hue_in(H, lo, hi):
    return (H >= lo) & (H <= hi) if lo <= hi else (H >= lo) | (H <= hi)

def clean(m, k=3, keep=40):
    m = m.astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((k, k), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(m, 8)
    out = np.zeros_like(m)
    for i in range(1, n):
        if st[i, cv2.CC_STAT_AREA] >= keep: out[lab == i] = 1
    return out.astype(bool)

def grow_into(seed, allowed, it=2):
    """Let a mask spread into neighbouring pixels of the same garment (dark folds and ink-adjacent shading)."""
    m = seed.copy()
    for _ in range(it):
        m = m | (cv2.dilate(m.astype(np.uint8), np.ones((3, 3), np.uint8)).astype(bool) & allowed)
    return m

# Colour rules per hero, written against the art: returns dict of masks.
def rules(hero, im):
    a = im[..., 3] > 100
    H, S, V = hsv_of(im)
    sat = S > 70
    if hero == 'dex':      # cream bowling shirt with teal panel, purple pants, white high-tops
        pants = a & hue_in(H, 120, 168) & (S > 45) & (V > 35)
        cream = a & (((S < 100) & (V > 185) & hue_in(H, 8, 34)) | ((S < 40) & (V > 185)))
        teal = a & hue_in(H, 78, 104) & sat & (V > 50)
        return dict(top=cream | teal, pants=pants, shoes=cream | teal, _split='light', _attach=teal)
    if hero == 'rae':      # red/black flannel over black tank, teal jeans, black boots, pink hair
        # flannel = deep true red with black checks; hair is pinker (lower hue), the bass is brighter and more orange
        red = a & hue_in(H, 176, 2) & (S > 150) & (V > 60) & (V < 205)
        dk = cv2.blur((a & (V < 60)).astype(np.float32), (11, 11))
        flannel = clean(red & (dk > 0.12), k=5, keep=40)
        flannel = grow_into(flannel, red, 2)
        jeans = a & hue_in(H, 76, 104) & (S > 50) & (V > 50)
        dark = a & (V < 70)
        return dict(top=flannel, pants=jeans, shoes=dark, inner=dark, _split='dark')
    if hero == 'benny':    # yellow work shirt, lime cargo shorts, white/teal sneakers
        shirt = a & hue_in(H, 20, 32) & (S > 110) & (V > 150)
        shorts = a & hue_in(H, 33, 50) & sat & (V > 60)
        shoe = a & (((S < 60) & (V > 170)) | (hue_in(H, 78, 104) & sat))
        return dict(top=shirt, pants=shorts, shoes=shoe, _split='low')
    if hero == 'julia':    # teal jersey with stripes, orange shorts, pink skates
        jersey = a & hue_in(H, 80, 104) & sat & (V > 50)
        shorts = a & hue_in(H, 4, 16) & (S > 215) & (V > 190)   # brighter and more saturated than her skin
        shorts = grow_into(clean(shorts, keep=80), a & hue_in(H, 3, 16) & (S > 210) & (V > 70), 3)
        skates = a & hue_in(H, 160, 178) & (S > 110) & (V > 90)
        return dict(top=jersey, pants=shorts, shoes=skates, _split='skates')
    raise SystemExit('unknown hero ' + hero)

def masks_for(hero, im, frame):
    r = rules(hero, im)
    a = im[..., 3] > 100
    h, w = a.shape
    ys, xs = np.where(a)
    y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    lying = frame == 'down'
    # Where the feet are: bottom band of the figure, or (lying) the far end along x away from the head.
    if lying:
        left_heavy = a[:, :w // 2].sum() > 0
        foot = np.zeros_like(a)
        # feet are at whichever end has the pants nearest; take the outer 22% on that side
        pm = r['pants']; px = np.where(pm)[1]
        side_right = px.size and px.mean() > (x0 + x1) / 2
        cut = int(x0 + (x1 - x0) * (0.78 if side_right else 0.22))
        if side_right: foot[:, cut:] = True
        else: foot[:, :cut] = True
    else:
        foot = np.zeros_like(a); foot[int(y0 + (y1 - y0) * (0.80 if frame != 'kick' and frame != 'jump' else 0.62)):] = True
    out = {}
    split = r.pop('_split'); r.setdefault('_attach', False)
    shoes = r['shoes'] & foot
    if split in ('light', 'low'):          # same colours appear on the shirt: shoes only in the foot zone, top only above it
        top = r['top'] & ~foot if split == 'light' else r['top']
    else:
        top = r['top']
    if r.get('_attach') is not False and r.get('_attach') is not None:                    # drop light blobs that aren't attached to the torso (Dex's tape sock)
        pm = r['_attach'] & ~foot
        if pm.any():
            near = cv2.dilate(pm.astype(np.uint8), np.ones((9, 9), np.uint8)).astype(bool)
            n, lab, st, _ = cv2.connectedComponentsWithStats(clean(top, keep=20).astype(np.uint8), 8)
            keep = np.zeros_like(top)
            big = max(range(1, n), key=lambda i: st[i, cv2.CC_STAT_AREA]) if n > 1 else 0
            if big:
                core = lab == big
                touch = cv2.dilate(core.astype(np.uint8), np.ones((7, 7), np.uint8)).astype(bool)
                for i in range(1, n):
                    comp = lab == i
                    if i == big or (comp & touch).any(): keep |= comp
            top = keep
    out['top'] = top
    out['pants'] = r['pants'] & ~shoes
    out['shoes'] = shoes
    if 'inner' in r:                        # Rae's tank: dark pixels in the torso, not boots, not hair outline
        pm = np.where(out['pants'])[0]
        tm = np.where(out['top'])[0]
        inner = np.zeros_like(a)
        if pm.size and tm.size and not lying:
            band = np.zeros_like(a); band[int(np.percentile(tm, 10)):int(np.percentile(pm, 8))] = True
            inner = r['inner'] & band & ~foot
            # keep only blobs touching the flannel (the tank sits between its open fronts)
            near = cv2.dilate(out['top'].astype(np.uint8), np.ones((9, 9), np.uint8)).astype(bool)
            inner = inner & near
        out['inner'] = inner
    else:
        out['inner'] = np.zeros_like(a)
    for k in out:
        out[k] = clean(out[k], keep=30 if k == 'shoes' else 60)
    return out

def sprites():
    src = open(os.path.join(ROOT, 'art', 'manifest.js')).read()
    man = json.loads(re.search(r'LF_ART=(\{.*\});', src, re.S).group(1))
    for hero in ['dex', 'rae', 'benny', 'julia']:
        e = man[hero]
        yield hero, '', e['src']
        for f, fm in (e.get('frames') or {}).items():
            yield hero, f, fm['src']

def main():
    prev = sys.argv[sys.argv.index('--preview') + 1] if '--preview' in sys.argv else None
    os.makedirs(os.path.join(ROOT, 'art', 'mask'), exist_ok=True)
    man_path = os.path.join(ROOT, 'art', 'manifest.js')
    man_src = open(man_path).read()
    man = json.loads(re.search(r'LF_ART=(\{.*\});', man_src, re.S).group(1))
    tiles = {}
    strips = {}
    for hero, f, src in sprites():
        im = np.array(Image.open(os.path.join(ROOT, src)).convert('RGBA'))
        m = masks_for(hero, im, f or 'idle')
        h, w = im.shape[:2]
        strip = np.zeros((h, w * 4), np.uint8)
        for i, k in enumerate(['top', 'inner', 'pants', 'shoes']):
            strip[:, i * w:(i + 1) * w] = m[k] * 255
        strips.setdefault(hero, []).append((f, strip))
        if prev:
            vis = im.copy().astype(np.float32)
            for k, c in zip(['top', 'inner', 'pants', 'shoes'], [(255, 40, 40), (255, 230, 0), (40, 120, 255), (40, 255, 80)]):
                vis[m[k], :3] = vis[m[k], :3] * .35 + np.array(c) * .65
            tiles.setdefault(hero, []).append(Image.fromarray(vis.astype(np.uint8)))
    for hero, rows in strips.items():
        W = max(st.shape[1] for _, st in rows); H = sum(st.shape[0] for _, st in rows)
        atlas = np.zeros((H, W, 4), np.uint8); atlas[..., :3] = 255
        ys = {}; y = 0
        for f, st in rows:
            atlas[y:y + st.shape[0], :st.shape[1], 3] = st; ys[f] = y; y += st.shape[0]
        out = os.path.join(ROOT, 'art', 'mask', hero + '.webp')
        Image.fromarray(atlas).save(out, 'WEBP', lossless=True)
        man[hero]['mask'] = {'src': 'art/mask/%s.webp' % hero, 'y': ys}
        print('%-6s mask atlas %dx%d, %d frames, %d KB' % (hero, W, H, len(rows), os.path.getsize(out) // 1024))
    open(man_path, 'w').write(man_src[:man_src.index('globalThis.LF_ART=')] + 'globalThis.LF_ART=' + json.dumps(man) + ';\n')
    if prev:
        rows = list(tiles.values()); tw, th = 180, 270
        sheet = Image.new('RGBA', (tw * 10, th * len(rows)), (50, 30, 25, 255))
        for r, row in enumerate(rows):
            for c, t in enumerate(row):
                t = t.copy(); t.thumbnail((tw, th)); sheet.alpha_composite(t, (c * tw, r * th + th - t.height))
        sheet.save(prev)
    print('masks written')

if __name__ == '__main__':
    main()
