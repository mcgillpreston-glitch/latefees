#!/usr/bin/env python3
"""Bring a stage backdrop into line with the others: floor line at 62% of the height, and a seamless repeat.

    python3 tools/fix_bg.py <key> [--floor ROW] [--sky ROWS] [--loop]

--floor ROW   the row (in the 648-px-tall painting) where the floor currently begins; the painting is remapped so it
              begins at row 402 (= TOP 134 of 216, 62%), the line every backdrop and the game's playfield share.
--sky ROWS    when the floor has to move down a lot, first push the painting down by ROWS and fill the gap with the
              painting's own sky (smoothed, a touch darker toward the top) so buildings and cars aren't stretched.
--loop        trim the painting to the pair of columns near its two ends that match best, and blend 48 px across the
              join, so it repeats without a visible seam.
"""
import sys, numpy as np
from PIL import Image
from scipy import ndimage

ROOT = __import__('os').path.dirname(__import__('os').path.dirname(__import__('os').path.abspath(__file__)))
FLOOR = 402

def remap_rows(a, knots):
    H = a.shape[0]; ys, yo = zip(*knots)
    src = np.interp(np.arange(H), yo, ys)                 # output row -> source row
    y0 = np.floor(src).astype(int).clip(0, H - 1); y1 = (y0 + 1).clip(0, H - 1); t = (src - y0)[:, None, None]
    return a[y0] * (1 - t) + a[y1] * t

def sky_push(a, d):
    H = a.shape[0]
    band = ndimage.uniform_filter1d(a[:6].mean(0), 41, axis=0)        # the painting's top sky, smoothed along x
    fill = np.repeat(band[None], d, 0) * np.linspace(.9, 1, d)[:, None, None]
    rng = np.random.default_rng(7); fill += rng.normal(0, 2.0, fill.shape)
    out = np.concatenate([fill, a[:H - d]], 0)
    k = 6                                                              # soften the join into the original sky
    for i in range(k): w = (i + 1) / (k + 1); out[d + i] = out[d + i] * w + fill[-1] * (1 - w)
    return out

def loop(a, search=320, win=24, blend=48):
    H, W, _ = a.shape; g = a.mean(2)
    best = None
    for c1 in range(win, search):
        L = a[:, c1 - win:c1]
        for c2 in range(W - search, W - win, 2):
            e = np.abs(a[:, c2 - win:c2] - L).mean()
            if best is None or e < best[0]: best = (e, c1, c2)
    e, c1, c2 = best
    out = a[:, c1:c2].copy()                      # tile = columns c1..c2-1; column c2 ~ column c1 continues it
    n = out.shape[1]
    for i in range(blend):                        # last `blend` columns ease into what follows c2-1, i.e. the tile's start
        w = (i + 1) / (blend + 1); w = w * w * (3 - 2 * w)
        out[:, n - blend + i] = a[:, c2 - blend + i] * (1 - w) + a[:, c1 - blend + i] * w
    return out, (c1, c2, e)

def main():
    args = sys.argv[1:]; key = args[0]
    p = f'{ROOT}/art/bg-{key}.webp'
    a = np.asarray(Image.open(p).convert('RGB')).astype(float); H = a.shape[0]
    if '--sky' in args:
        d = int(args[args.index('--sky') + 1]); a = sky_push(a, d)
    if '--floor' in args:
        f = int(args[args.index('--floor') + 1]) + (int(args[args.index('--sky') + 1]) if '--sky' in args else 0)
        a = remap_rows(a, [(0, 0), (f, FLOOR), (H - 1, H - 1)])
    if '--loop' in args:
        a, info = loop(a); print(key, 'loop cols', info[:2], 'match err %.1f' % info[2])
    Image.fromarray(a.clip(0, 255).astype(np.uint8)).save(p, 'WEBP', quality=90, method=6)
    print(key, Image.open(p).size)

if __name__ == '__main__':
    main()
