"""Import the rescued-neighbour sprites: surv_<name>.png (scared, waving for help) and surv_<name>_cheer.png (saved).

Usage: python3 tools/import_survivors.py <folder>
Writes art/surv_<name>.webp and art/surv_<name>_cheer.webp and adds surv_<name> to art/manifest.js
with a 'cheer' frame. Both poses are scaled together by silhouette area, so a jumping cheer stays the
same body size as the scared pose.
"""
import sys, os, json, re, glob
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_H = 360

def crop(path):
    im = Image.open(path).convert('RGBA')
    a = np.array(im)[..., 3]
    ys, xs = np.where(a > 40)
    return im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))

def area(im):
    return float((np.array(im)[..., 3] > 128).sum()) ** .5

def anchor(im):
    a = np.array(im)[..., 3] > 128
    h = a.shape[0]
    cols = np.where(a[int(h * .85):].any(0))[0]
    return int((cols.min() + cols.max()) / 2)

def main(folder):
    man_path = os.path.join(ROOT, 'art', 'manifest.js')
    man = json.loads(re.search(r'LF_ART=(\{.*\});', open(man_path).read(), re.S).group(1))
    for p in sorted(glob.glob(os.path.join(folder, 'surv_*.png'))):
        if p.endswith('_cheer.png'): continue
        key = os.path.basename(p)[:-4]
        cp = p[:-4] + '_cheer.png'
        base = crop(p)
        k = OUT_H / base.height
        base = base.resize((round(base.width * k), OUT_H), Image.LANCZOS)
        base.save(os.path.join(ROOT, 'art', key + '.webp'), 'WEBP', quality=88, method=6)
        e = {'src': f'art/{key}.webp', 'w': base.width, 'h': base.height, 'ax': anchor(base), 'hx': base.width // 2, 'hy': 40, 'hs': 72}
        if os.path.exists(cp):
            ch = crop(cp)
            ref = area(crop(p))
            drawn = area(ch) / ref
            ch = ch.resize((round(ch.width * k), round(ch.height * k)), Image.LANCZOS)
            ch.save(os.path.join(ROOT, 'art', key + '_cheer.webp'), 'WEBP', quality=88, method=6)
            rel = (ch.height / OUT_H) / (drawn ** .75)
            e['frames'] = {'cheer': {'src': f'art/{key}_cheer.webp', 'w': ch.width, 'h': ch.height, 'ax': anchor(ch), 'rel': round(rel, 4)}}
        man[key] = e
        print(key, base.size, 'cheer' if 'frames' in e else '', e.get('frames', {}).get('cheer', {}).get('rel', ''))
    open(man_path, 'w').write('// Sprite manifest: feet anchor (ax at bottom edge), head box for HUD portraits, optional animation frames.\nglobalThis.LF_ART=' + json.dumps(man) + ';\n')

if __name__ == '__main__':
    main(sys.argv[1])
