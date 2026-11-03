#!/usr/bin/env python3
"""Add frames to a sprite set that already has some, without re-importing the rest.

Usage: python3 tools/add_frames.py <key> <folder> [--rel FRAME=R ...] [--match]
Expects <folder>/<key>_<frame>.png cut-outs (any frame name from import_frames.FRAMES). Each is
cleaned of white background pockets, scaled so its height is R times the set's standing height
(R defaults to 1 for walk frames — an upright stride is standing height — and must be given for
anything crouched or lunging), anchored at the feet, written to art/<key>_<frame>.webp and merged
into art/manifest.js. --match then pulls the new frames' colours onto the base sprite's palette
(tools/match_palette.py) so they don't flicker against the older frames.
"""
import os, sys, json, re
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from import_frames import load, FRAMES, ROOT

def main(key, folder, rels, match):
    man_path = os.path.join(ROOT, 'art', 'manifest.js')
    src = open(man_path).read()
    man = json.loads(re.search(r'LF_ART=(\{.*\});', src, re.S).group(1))
    e = man[key]
    frames = e.setdefault('frames', {})
    w1 = frames.get('walk1') or frames.get('walk2')
    S = w1['h'] / w1['rel'] if w1 else e['h']          # standing height in sprite pixels
    added = []
    for f in FRAMES:
        p = os.path.join(folder, f'{key}_{f}.png')
        if not os.path.exists(p):
            continue
        rel = rels.get(f, 1.0 if f.startswith('walk') else None)
        if rel is None:
            sys.exit(f'{key} {f}: give --rel {f}=R for a non-walk frame')
        im = load(p)
        h = max(1, round(S * rel)); w = max(1, round(im.width * h / im.height))
        im = im.resize((w, h), Image.LANCZOS)
        a = np.array(im)[..., 3] > 128
        cols = np.where(a[int(h * .82):].any(0))[0]
        ax = int((cols.min() + cols.max()) / 2) if cols.size else w // 2
        out = os.path.join(ROOT, 'art', f'{key}_{f}.webp')
        im.save(out, 'WEBP', quality=88, method=6)
        frames[f] = {'src': f'art/{key}_{f}.webp', 'w': w, 'h': h, 'ax': ax, 'rel': round(rel, 4)}
        added.append(f)
        print(f'{key:8s} {f:8s} {w}x{h} rel {rel:.2f} ax {ax}  {os.path.getsize(out)//1024} KB')
    open(man_path, 'w').write('// Sprite manifest: feet anchor (ax at bottom edge), head box for HUD portraits, optional animation frames.\nglobalThis.LF_ART=' + json.dumps(man) + ';\n')
    if match and added:
        from match_palette import Palette, to_lab, correct_frame
        R = np.asarray(Image.open(os.path.join(ROOT, e['src'])).convert('RGBA'))
        pal = Palette(to_lab(R[..., :3][R[..., 3] > 230]))
        for f in added:
            path = os.path.join(ROOT, frames[f]['src'])
            arr = np.asarray(Image.open(path).convert('RGBA'))
            out, (mv, p95, n) = correct_frame(arr, pal)
            Image.fromarray(out).save(path, 'WEBP', quality=88, method=6)
            print(f'  {f:8s} palette moved {mv:.1f} (p95 {p95:.1f})')
    print('manifest updated:', key, '+', ', '.join(added))

if __name__ == '__main__':
    args = sys.argv[1:]
    rels = {}
    while '--rel' in args:
        i = args.index('--rel'); f, r = args[i + 1].split('='); rels[f] = float(r); del args[i:i + 2]
    match = '--match' in args
    if match: args.remove('--match')
    main(args[0], args[1], rels, match)
