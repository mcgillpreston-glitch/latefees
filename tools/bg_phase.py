#!/usr/bin/env python3
"""Choose where each area's backdrop painting starts so the joins between areas fall on quiet wall, not through signs.

    python3 tools/bg_phase.py        # prints the BGOFF table; paste it over  const BGOFF={...}  in index.html

Reads the stages' areas and lengths from game-core.js. For each area it scores every starting column by the detail in the
painting's wall band (rows above the 62% floor line) within 32 px of where the area begins and ends (the join fades
over 64 px), and keeps the quietest. The first area's start and the last area's end aren't joins, so they don't count.
"""
import os, json, subprocess, numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BL = 32

def stages():
    js = "const C=require(process.argv[1]);const L=globalThis.LFCore||C.LFCore||C;console.log(JSON.stringify(L.LEVELS.map(l=>l.zones.map(z=>[z[0],z[1]]))))"
    try:
        return json.loads(subprocess.check_output(['node', '-e', js, os.path.join(ROOT, 'game-core.js')], stderr=subprocess.DEVNULL))
    except Exception:
        import re
        src = open(os.path.join(ROOT, 'game-core.js')).read()
        return [[(k, int(n)) for k, n in re.findall(r"\['([a-z-]+)',(\d+)", m)] for m in re.findall(r"zones:\[(.*?)\]\]", src)]

def busy(k):
    im = Image.open(f'{ROOT}/art/bg-{k}.webp').convert('L'); tw = im.width * 216 / im.height
    a = np.asarray(im.resize((round(tw), 216), Image.BOX)).astype(float)[8:134]
    g = np.abs(np.diff(a, axis=1, append=a[:, :1])).mean(0)
    return np.convolve(np.concatenate([g[-BL:], g, g[:BL]]), np.ones(2 * BL + 1) / (2 * BL + 1), 'valid')

def main():
    off = {}
    for st in stages():
        for i, (k, l) in enumerate(st):
            b = busy(k); n = len(b)
            cost = [(b[o] if i else 0) + (b[int(round(l + o)) % n] if i < len(st) - 1 else 0) for o in range(n)]
            off[k] = int(np.argmin(cost))
    print('const BGOFF=' + json.dumps(off, separators=(',', ':')) + ';')

if __name__ == '__main__':
    main()
