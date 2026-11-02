"""Remove stray fragments from cut-out sprites (bits of neighbouring cells, thin edge lines).

Usage: python3 tools/clean_cutouts.py <in_folder> <out_folder>
Keeps the largest connected shape plus other shapes that are big enough, not thin lines,
and close to the main figure (so sparks, stars and dropped props survive).
"""
import sys, os, glob
import cv2, numpy as np
from PIL import Image

def clean(path, out):
    im = np.array(Image.open(path).convert('RGBA'))
    a = (im[..., 3] > 40).astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(a, 8)
    if n <= 2:
        Image.fromarray(im).save(out); return 0
    areas = st[1:, cv2.CC_STAT_AREA]; big = 1 + int(np.argmax(areas)); A = areas.max()
    x, y, w, h = st[big, :4]
    pad = int(max(w, h) * .18)
    box = (x - pad, y - pad, x + w + pad, y + h + pad)
    keep = np.zeros(n, bool); keep[big] = True
    for i in range(1, n):
        if i == big: continue
        cx, cy, cw, ch, ca = st[i]
        thin = min(cw, ch) <= 12 and max(cw, ch) > 6 * min(cw, ch)
        near = not (cx > box[2] or cx + cw < box[0] or cy > box[3] or cy + ch < box[1])
        if ca >= A * .004 and not thin and near: keep[i] = True
    m = keep[lab]
    # stray cell-border lines that touch the figure: long thin vertical strokes at the left/right edge
    ys, xs = np.where(m); x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max(); fw, fh = x1 - x0 + 1, y1 - y0 + 1
    mm = m.astype(np.uint8)
    thick = cv2.morphologyEx(mm, cv2.MORPH_OPEN, np.ones((1, 9), np.uint8)).astype(bool)
    resid = m & ~thick
    rn, rlab, rst, _ = cv2.connectedComponentsWithStats(resid.astype(np.uint8), 8)
    for i in range(1, rn):
        cx, cy, cw, ch, ca = rst[i]
        if ch > fh * .3 and cw <= 10 and (cx - x0 < fw * .1 or x1 - (cx + cw) < fw * .1):
            m = m & ~(cv2.dilate((rlab == i).astype(np.uint8), np.ones((3, 3), np.uint8)).astype(bool))
    # pieces cut off by removing the line: keep only what's still attached to the main body
    n2, lab2, st2, _ = cv2.connectedComponentsWithStats(m.astype(np.uint8), 8)
    if n2 > 2:
        A2 = st2[1:, cv2.CC_STAT_AREA].max()
        m = np.isin(lab2, [i for i in range(1, n2) if st2[i, cv2.CC_STAT_AREA] >= A2 * .004])
    # also drop faint pixels that belong to removed parts
    im[..., 3] = np.where(m | (cv2.dilate(m.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(bool) & (im[..., 3] <= 40)), im[..., 3], 0)
    Image.fromarray(im).save(out)
    return int((~keep[1:]).sum())

if __name__ == '__main__':
    src, dst = sys.argv[1], sys.argv[2]; os.makedirs(dst, exist_ok=True)
    tot = 0
    for p in sorted(glob.glob(os.path.join(src, '*.png'))):
        r = clean(p, os.path.join(dst, os.path.basename(p))); tot += r
        if r: print(os.path.basename(p), 'removed', r)
    print('fragments removed:', tot)
