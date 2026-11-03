"""Import a character's animation frames into the game.

Usage: python3 tools/import_frames.py <sprite-key> <folder-with-pngs> [--hue LO HI] [--same-scale]
Set outfits use the key <hero>_<set>, e.g. dex_night with files dex_night_walk1.png ...
Expects files named <key>_<frame>.png (walk1, walk2, attack1, attack2, jump, kick, hurt, down, special)
on transparent backgrounds, all drawn at the same scale. Writes art/<key>_<frame>.webp and updates
art/manifest.js. Frames are sized relative to walk1 (or the first standing frame), so a jump or a
knockdown stays the same size as the character instead of being stretched to full height.

Image generators often draw a character at a slightly different size in each frame. --hue LO HI
(OpenCV hue, 0-180) picks a clothing color that is fully visible in every pose (for Dex, the purple
pants: 125 160); its area is used to measure and undo each frame's drawing scale.
--same-scale skips that correction, for frame sets that were already drawn at one shared scale (Rae's).
"""
import sys, os, json, re
import cv2
from PIL import Image
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRAMES = ['walk1', 'walk2', 'walk3', 'walk4', 'attack1', 'attack2', 'attack3', 'finish1', 'finish2', 'finish3', 'jump', 'jump2', 'jump3', 'kick',
          'hurt', 'hurt2', 'down', 'getup1', 'getup2', 'special', 'special2', 'special3', 'special4']
REF_ORDER = ['walk1', 'walk2', 'hurt', 'attack1']
OUT_H = 360  # pixel height a standing frame is exported at (matches the base sprites)

def clear_pockets(arr):
    """Knock out flat white pockets enclosed inside the figure (background between an arm and the body that the
    edge-connected cutout missed). Drawn whites have print grain, so only small, textureless blobs go."""
    from scipy import ndimage
    rgb = arr[..., :3].astype(int); a = arr[..., 3]; fig = int((a > 100).sum())
    white = (a > 200) & (rgb.min(axis=2) >= 232) & ((rgb.max(axis=2) - rgb.min(axis=2)) <= 10)
    lab, n = ndimage.label(white); hole = np.zeros(a.shape, bool)
    for i in range(1, n + 1):
        m = lab == i; sz = int(m.sum())
        if sz < 40 or sz > fig * .10 or rgb[m].std() >= 4.0: continue
        hole |= m
    if hole.any():
        arr = arr.copy(); arr[hole, 3] = 0
        rim = cv2.dilate(hole.astype(np.uint8), np.ones((3, 3), np.uint8)).astype(bool) & ~hole & (rgb.min(axis=2) >= 215)
        arr[rim, 3] = (arr[rim, 3] * .45).astype(np.uint8)
    return arr

def load(path):
    arr = clear_pockets(np.array(Image.open(path).convert('RGBA')))
    im = Image.fromarray(arr)
    a = arr[..., 3]
    ys, xs = np.where(a > 40)
    return im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))

def body_size(path, hue):
    im = np.array(Image.open(path).convert('RGBA'))
    a = im[..., 3] > 128
    if hue is None:
        return float(a.sum()) ** .5
    hsv = cv2.cvtColor(im[..., :3], cv2.COLOR_RGB2HSV)
    m = a & (hsv[..., 0] >= hue[0]) & (hsv[..., 0] <= hue[1]) & (hsv[..., 1] > 60)
    return float(m.sum()) ** .5

def main(key, folder, hue=None, same=False):
    found = {f: os.path.join(folder, f'{key}_{f}.png') for f in FRAMES if os.path.exists(os.path.join(folder, f'{key}_{f}.png'))}
    if not found: sys.exit('no frames found')
    crops = {f: load(p) for f, p in found.items()}
    ref = next((f for f in REF_ORDER if f in crops), next(iter(crops)))
    scale = OUT_H / crops[ref].height
    size = {f: body_size(p, hue) for f, p in found.items()}
    man_path = os.path.join(ROOT, 'art', 'manifest.js')
    src = open(man_path).read()
    man = json.loads(re.search(r'LF_ART=(\{.*\});', src, re.S).group(1))
    frames = {}
    for f, im in crops.items():
        w, h = max(1, round(im.width * scale)), max(1, round(im.height * scale))
        im = im.resize((w, h), Image.LANCZOS)
        a = np.array(im)[..., 3] > 128
        if f in ('down',):
            cols = np.where(a.any(0))[0]
        else:
            cols = np.where(a[int(h * .82):].any(0))[0]
        ax = int((cols.min() + cols.max()) / 2)
        out = os.path.join(ROOT, 'art', f'{key}_{f}.webp')
        im.save(out, 'WEBP', quality=88, method=6)
        drawn = 1 if same else (size[f] / size[ref] if size[ref] else 1)   # how big this frame was drawn vs the reference
        rel = (h / OUT_H) / (drawn ** .75 if drawn > 0 else 1)
        frames[f] = {'src': f'art/{key}_{f}.webp', 'w': w, 'h': h, 'ax': ax, 'rel': round(rel, 4)}
        print(f'{f:8s} {w}x{h} drawn at {drawn:.2f}x  rel {rel:.2f} ax {ax}  {os.path.getsize(out)//1024} KB')
    e = man.setdefault(key, {})
    e['frames'] = frames
    base = os.path.join(folder, f'{key}.png')
    if os.path.exists(base):   # standing image: full sprite height, feet anchored like the frames
        im = load(base); k = OUT_H / im.height
        im = im.resize((max(1, round(im.width * k)), OUT_H), Image.LANCZOS)
        a = np.array(im)[..., 3] > 128; cols = np.where(a[int(OUT_H * .82):].any(0))[0]
        im.save(os.path.join(ROOT, 'art', f'{key}.webp'), 'WEBP', quality=88, method=6)
        e.update(src=f'art/{key}.webp', w=im.width, h=im.height, ax=int((cols.min() + cols.max()) / 2), hx=im.width // 2, hy=40, hs=72)
    if 'src' not in e:   # outfit sprites (e.g. dex_night) have no separate standing image: stand on walk1
        f0 = frames.get('walk1') or next(iter(frames.values()))
        e.update(src=f0['src'], w=f0['w'], h=f0['h'], ax=f0['ax'])
    open(man_path, 'w').write('// Sprite manifest: feet anchor (ax at bottom edge), head box for HUD portraits, optional animation frames.\nglobalThis.LF_ART=' + json.dumps(man) + ';\n')
    print('manifest updated:', key, ', '.join(frames))

if __name__ == '__main__':
    args = sys.argv[1:]
    hue = None
    if '--hue' in args:
        i = args.index('--hue'); hue = (int(args[i + 1]), int(args[i + 2])); del args[i:i + 3]
    same = '--same-scale' in args
    if same: args.remove('--same-scale')
    main(args[0], args[1], hue, same)
