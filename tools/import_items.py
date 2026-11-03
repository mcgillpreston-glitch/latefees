#!/usr/bin/env python3
"""Pack the 270 item icons into one sheet per slot: art/icons-<slot>.webp.

Usage: python3 tools/import_items.py <folder-with-item_<slot>_<index>.png ...> [--preview out.png]
Each sheet is a 6x5 grid of CELL px cells, item index i at column i%6, row i//6 (the order of
BASES in game-core.js). Every icon is cleaned (white background showing through holes such as a
ring's band or a bracelet becomes see-through, stray specks are dropped), trimmed, and scaled to
fit its cell. Icons of one slot share a scale where they can, so a sweatband doesn't come out the
size of a hard hat; very small items get a capped boost so they still read at bag size.
"""
import sys, os, glob
import numpy as np, cv2
from PIL import Image
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CATS = ['hat', 'glasses', 'shirt', 'jacket', 'belt', 'pants', 'shoes', 'bracelet', 'ring']
CELL, PAD, COLS = 96, 4, 6

def clean(arr):
    rgb = arr[..., :3].astype(int); a = arr[..., 3]
    fig = int((a > 100).sum())
    # flat white pockets enclosed by the item (holes the edge flood-fill couldn't reach)
    white = (a > 200) & (rgb.min(2) >= 232) & ((rgb.max(2) - rgb.min(2)) <= 10)
    lab, n = ndimage.label(white); hole = np.zeros(a.shape, bool)
    for i in range(1, n + 1):
        m = lab == i; sz = int(m.sum())
        if sz < 25 or sz > fig * .45 or rgb[m].std() >= 4.0: continue
        hole |= m
    arr = arr.copy()
    if hole.any():
        arr[hole, 3] = 0
        rim = cv2.dilate(hole.astype(np.uint8), np.ones((3, 3), np.uint8)).astype(bool) & ~hole & (rgb.min(2) >= 215)
        arr[rim, 3] = (arr[rim, 3] * .45).astype(np.uint8)
    # keep the item: the largest piece and anything sizeable touching or near it
    m = arr[..., 3] > 40
    n, lab, st, _ = cv2.connectedComponentsWithStats(m.astype(np.uint8), 8)
    if n > 2:
        A = st[1:, cv2.CC_STAT_AREA].max()
        keep = [i for i in range(1, n) if st[i, cv2.CC_STAT_AREA] >= A * .01]
        drop = m & ~np.isin(lab, keep)
        arr[drop, 3] = 0
    ys, xs = np.where(arr[..., 3] > 20)
    return arr[ys.min():ys.max() + 1, xs.min():xs.max() + 1], int(hole.sum())

def main(folders, preview=None):
    files = {}
    for f in folders:
        for p in glob.glob(os.path.join(f, '**', 'item_*.png'), recursive=True):
            files[os.path.basename(p)[5:-4]] = p
    missing = [f'{c}_{i}' for c in CATS for i in range(30) if f'{c}_{i}' not in files]
    if missing: sys.exit('missing: ' + ', '.join(missing))
    os.makedirs(os.path.join(ROOT, 'art'), exist_ok=True)
    box = CELL - 2 * PAD; prev_rows = []
    for c in CATS:
        items = [clean(np.array(Image.open(files[f'{c}_{i}']).convert('RGBA'))) for i in range(30)]
        fits = [box / max(im.shape[0], im.shape[1]) for im, _ in items]
        shared = float(np.median(fits))                        # the slot's common scale
        sheet = Image.new('RGBA', (CELL * COLS, CELL * 5), (0, 0, 0, 0))
        holes = 0
        for i, (im, h) in enumerate(items):
            holes += h > 0
            k = min(fits[i], shared * 1.35)                    # small items get up to a 35% boost, never past the cell
            w, hh = max(1, round(im.shape[1] * k)), max(1, round(im.shape[0] * k))
            t = Image.fromarray(im).resize((w, hh), Image.LANCZOS)
            x = (i % COLS) * CELL + (CELL - w) // 2; y = (i // COLS) * CELL + (CELL - hh) // 2
            sheet.alpha_composite(t, (x, y))
        out = os.path.join(ROOT, 'art', f'icons-{c}.webp')
        sheet.save(out, 'WEBP', quality=90, method=6)
        print(f'{c:9s} {os.path.getsize(out)//1024:3d} KB  holes cleared in {holes} icons')
        prev_rows.append(sheet)
    if preview:
        W = max(s.width for s in prev_rows); H = sum(s.height for s in prev_rows)
        p = Image.new('RGBA', (W, H), (70, 60, 60, 255)); y = 0
        for s in prev_rows: p.alpha_composite(s, (0, y)); y += s.height
        p.save(preview)

if __name__ == '__main__':
    a = sys.argv[1:]; prev = None
    if '--preview' in a: i = a.index('--preview'); prev = a[i + 1]; del a[i:i + 2]
    main(a, prev)
