#!/usr/bin/env python3
"""Tone stage backdrops so neighbouring areas sit together.  ONE-SHOT: running it again tones the paintings again.

    python3 tools/tone_bg.py [--dry]

1. water-lockers (by far the brightest painting) is dimmed as a whole to sit with the rest.
2. On each stage, every area's floor (below the 62% floor line, row 402 of 648) is moved halfway, in brightness
   ratio, toward the stage's average floor brightness, so walking from one area into the next doesn't jump from a
   pitch-dark floor to a glaring one. The change eases in over 12 rows at the floor line so no edge appears.
Gains are capped (x0.70 to x1.45) so no floor loses its own character.
"""
import sys, os, numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
S = [['suburb','mall','lot'],['school-hall','school-gym','school-field'],['camp-cabins','camp-lake','camp-woods'],
     ['rink-snack','rink-floor','rink-dj'],['drivein-stand','drivein-cars','drivein-screen'],['bowl-lanes','bowl-arcade','bowl-bar'],
     ['video-shelves','video-dock','video-office'],['water-wave','water-slides','water-lockers'],['tv-news','tv-studio','tv-roof'],
     ['crater-woods','crater-hull','crater-core']]
WHOLE = {'water-lockers': .84}
FLOOR, RAMP, PULL, LO, HI = 402, 12, .5, .70, 1.45
Y = np.array([.299, .587, .114])

def load(k): return np.asarray(Image.open(f'{ROOT}/art/bg-{k}.webp').convert('RGB')).astype(float)

def main(dry):
    for st in S:
        im = {k: load(k) * WHOLE.get(k, 1) for k in st}
        fl = {k: (a[FLOOR:] @ Y).mean() for k, a in im.items()}
        tgt = np.exp(np.mean([np.log(v) for v in fl.values()]))
        for k, a in im.items():
            g = float(np.clip((tgt / fl[k]) ** PULL, LO, HI))
            H = a.shape[0]; rows = np.ones(H)
            r = np.clip((np.arange(H) - (FLOOR - RAMP / 2)) / RAMP, 0, 1); r = r * r * (3 - 2 * r)
            rows = 1 + (g - 1) * r
            out = (a * rows[:, None, None]).clip(0, 255)
            print(f'{k:15s} whole x{WHOLE.get(k,1):.2f}  floor {fl[k]/WHOLE.get(k,1):6.1f} -> {(out[FLOOR+RAMP:] @ Y).mean():6.1f}  (x{g:.2f})')
            if not dry:
                Image.fromarray(out.astype(np.uint8)).save(f'{ROOT}/art/bg-{k}.webp', 'WEBP', quality=90, method=6)

if __name__ == '__main__':
    main('--dry' in sys.argv)
