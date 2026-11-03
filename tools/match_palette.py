#!/usr/bin/env python3
"""Pull every frame of a sprite set onto the palette of its reference frame.

Frames generated in separate batches come back with the same drawing but a different grade: a
shirt a few shades brighter here, jeans greener and lifted there. In motion that reads as the
character flickering between two colour versions. This script measures, material by material,
how each frame's tones differ from the reference frame and maps them back.

How: colours are split into materials by where they sit on the CIELAB chroma plane (k-means over
a,b of the reference's coloured pixels; near-grey pixels — outlines, boots, whites — form one
more material). Hue is what survives a regrade, so the same material split applies to every
frame. Within each material the frame's lightness and chroma distributions are quantile-matched
to the reference's, which corrects a lift, a crush or a stretch alike while keeping the shading
order inside the material. Pixels are mapped with a soft blend of the materials they are near so
anti-aliased edges don't band. Materials a frame barely shows are left alone.

Usage: python3 tools/match_palette.py <key> [<key>...] [--ref FRAME] [--dry] [--report DIR]
       python3 tools/match_palette.py --all          # every set in art/manifest.js with frames
"""
import json, os, sys, numpy as np, cv2
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAN_PATH = os.path.join(ROOT, 'art', 'manifest.js')
GREY = 12.0          # chroma below this is "no colour": outlines, blacks, whites
MAX_SHIFT = 36.0     # the furthest a material's tones are allowed to move

def manifest():
    src = open(MAN_PATH, encoding='utf-8').read()
    return json.loads(src[src.index('{'):src.rindex('}') + 1])

def to_lab(rgb):
    return cv2.cvtColor(rgb.reshape(-1, 1, 3).astype(np.uint8), cv2.COLOR_RGB2LAB).reshape(-1, 3).astype(np.float32)

def to_rgb(lab):
    lab = np.clip(lab, 0, 255).astype(np.uint8)
    return cv2.cvtColor(lab.reshape(-1, 1, 3), cv2.COLOR_LAB2RGB).reshape(-1, 3)

def kmeans(X, K, seed=0):
    from sklearn.cluster import KMeans
    km = KMeans(K, n_init=4, random_state=seed).fit(X)
    return km.cluster_centers_.astype(np.float32)

class Palette:
    """Reference materials: centres on the a,b plane plus per-material L and chroma quantiles."""
    def __init__(self, lab, K=8):
        ab = lab[:, 1:] - 128
        C = np.sqrt((ab ** 2).sum(1))
        col = C > GREY
        X = ab[col]
        self.cent = kmeans(X[::max(1, len(X) // 30000)], K)
        self.cent = np.vstack([self.cent, [[0, 0]]])        # last material = greys
        m = self.material(lab)
        self.hL, self.hC = [], []
        for k in range(len(self.cent)):
            s = m == k
            self.hL.append(hist(lab[s, 0], 0, 256) if s.sum() > 50 else None)
            self.hC.append(hist(np.log2(np.maximum(C[s], 1)), 0, 8, 0.05) if s.sum() > 50 else None)

    def dist(self, lab):
        ab = lab[:, 1:] - 128
        d = np.sqrt(((ab[:, None, :] - self.cent[None, :, :]) ** 2).sum(2))
        C = np.sqrt((ab ** 2).sum(1))
        d[:, -1] = np.where(C > GREY, 1e6, 0)        # greys are their own material, never blended into colours
        d[:, :-1][C <= GREY] = 1e6
        return d

    def material(self, lab):
        return self.dist(lab).argmin(1)

def hist(v, lo, hi, step=1.0, sigma=3.0):
    """smoothed, normalised histogram of v over [lo, hi) in bins of `step`"""
    n = int(round((hi - lo) / step))
    h = np.histogram(v, bins=n, range=(lo, hi))[0].astype(np.float32)
    r = int(3 * sigma); g = np.exp(-0.5 * (np.arange(-r, r + 1) / sigma) ** 2)
    h = np.convolve(h, g, mode='same')
    return h / max(h.sum(), 1e-9)

def align(ht, hr, max_shift):
    """shift (in bins) that best lays histogram ht over hr: the lag of peak cross-correlation"""
    best, arg = -1, 0
    for sft in range(-max_shift, max_shift + 1):
        if sft >= 0: c = (ht[:len(ht) - sft] * hr[sft:]).sum() if sft else (ht * hr).sum()
        else: c = (ht[-sft:] * hr[:len(hr) + sft]).sum()
        if c > best: best, arg = c, sft
    return arg

def correct_frame(arr, pal, min_share=0.006, sigma=7.0, gain_lim=(0.8, 1.25)):
    """Per material: shift lightness by the median difference to the reference and scale chroma by
    the median ratio. Near-grey pixels (outlines, whites) are left as drawn. Returns the corrected
    array and (mean move, 95th-percentile move, materials corrected)."""
    a = arr[..., 3]
    sel = a > 0
    P = to_lab(arr[..., :3][sel])
    solid = a[sel] > 230
    Ps = P[solid]
    ms = pal.material(Ps)
    K = len(pal.cent)
    L = P[:, 0]; ab = P[:, 1:] - 128; C = np.sqrt((ab ** 2).sum(1))
    Cs = np.sqrt(((Ps[:, 1:] - 128) ** 2).sum(1))
    dL = np.zeros(K, np.float32); gC = np.ones(K, np.float32); used = np.zeros(K, bool)
    for k in range(K - 1):                      # K-1: the grey material stays put
        s = ms == k
        if s.sum() < min_share * len(Ps) or pal.hL[k] is None:
            continue
        used[k] = True
        dL[k] = align(hist(Ps[s, 0], 0, 256), pal.hL[k], int(MAX_SHIFT))
        gC[k] = float(np.clip(2 ** (0.05 * align(hist(np.log2(np.maximum(Cs[s], 1)), 0, 8, 0.05), pal.hC[k], 12)), *gain_lim))
    # soft blend over nearby materials so anti-aliased edges between two colours don't band
    d = pal.dist(P)
    w = np.exp(-(d / sigma) ** 2) * used[None, :]
    near = d.argmin(1)
    w[np.arange(len(P)), near] += 1e-3 * used[near]
    ws = w.sum(1)
    w = w / np.maximum(ws, 1e-9)[:, None]
    L2 = L + (w * dL[None, :]).sum(1)
    scale = (w * gC[None, :]).sum(1) + (1 - np.minimum(ws, 1)) * 0   # pixels near no corrected material keep scale 1 via w=0
    scale = np.where(ws > 0, scale, 1)
    out_lab = np.stack([L2, ab[:, 0] * scale + 128, ab[:, 1] * scale + 128], 1)
    out = arr.copy()
    out[..., :3][sel] = to_rgb(out_lab)
    moved = np.sqrt(((out_lab - P) ** 2).sum(1))
    return out, (float(moved.mean()), float(np.percentile(moved, 95)), int(used.sum()))

def run(key, man, ref='base', dry=False, report=None):
    ent = man[key]
    frames = ent.get('frames', {})
    if not frames:
        return []
    files = {'base': ent['src']}
    files.update({f: v['src'] for f, v in frames.items()})
    R = np.asarray(Image.open(os.path.join(ROOT, files[ref])).convert('RGBA'))
    pal = Palette(to_lab(R[..., :3][R[..., 3] > 230]))
    done = []
    for f, p in files.items():
        if f == ref:
            continue
        path = os.path.join(ROOT, p)
        arr = np.asarray(Image.open(path).convert('RGBA'))
        out, (mean_mv, p95, nused) = correct_frame(arr, pal)
        print('  %-10s moved %4.1f (p95 %4.1f) over %d materials' % (f, mean_mv, p95, nused))
        if report:
            os.makedirs(report, exist_ok=True)
            side = Image.new('RGBA', (arr.shape[1] * 2 + 8, arr.shape[0]), (110, 110, 110, 255))
            side.alpha_composite(Image.fromarray(arr), (0, 0)); side.alpha_composite(Image.fromarray(out), (arr.shape[1] + 8, 0))
            side.save(os.path.join(report, '%s_%s.png' % (key, f)))
        if not dry:
            Image.fromarray(out).save(path, 'WEBP', quality=88, method=6)
        done.append((p, mean_mv))
    return done

def main():
    args = sys.argv[1:]
    ref, dry, report = 'base', False, None
    if '--ref' in args: i = args.index('--ref'); ref = args[i + 1]; del args[i:i + 2]
    if '--dry' in args: args.remove('--dry'); dry = True
    if '--report' in args: i = args.index('--report'); report = args[i + 1]; del args[i:i + 2]
    man = manifest()
    keys = [k for k in man if man[k].get('frames')] if '--all' in args else args
    for key in keys:
        print('==', key)
        run(key, man, ref, dry, report)

if __name__ == '__main__':
    main()
