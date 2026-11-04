#!/usr/bin/env python3
"""Pack every sprite's frames into sprite sheets: art/sheets/<key>-a.webp and <key>-b.webp.

Run this LAST, after any import or art fix (import_frames, add_frames, match_palette, clean_cutouts ...):
    python3 tools/pack_sprites.py
It reads the single-frame files listed in art/manifest.js (those stay the source the other tools edit) and writes, for
each sprite key, sheet 'a' with what the game needs first (the standing pose and the walk cycle) and sheet 'b' with
everything else. Each manifest entry gets  sheet: <url>, at: [x, y]  and the game reads frames from the sheets.
Loading ~110 sheets instead of ~440 frames keeps the published artifact under its file limit and the download quick.
"""
import os, re, json
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIRST = {'', 'walk1', 'walk2', 'walk3', 'walk4'}
ROW_W, PAD = 2048, 2

def pack(items):
    """shelf-pack [(name, image)] tallest first; returns (sheet, {name: (x, y)})"""
    items = sorted(items, key=lambda t: -t[1].height)
    x = y = rowh = 0; W = 0; pos = {}
    for name, im in items:
        if x and x + im.width > ROW_W:
            x = 0; y += rowh + PAD; rowh = 0
        pos[name] = (x, y); x += im.width + PAD; rowh = max(rowh, im.height); W = max(W, x)
    H = y + rowh
    sheet = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    for name, im in items:
        sheet.paste(im, pos[name])
    return sheet, pos

def main():
    mp = os.path.join(ROOT, 'art', 'manifest.js')
    src = open(mp).read()
    man = json.loads(re.search(r'LF_ART=(\{.*\});', src, re.S).group(1))
    os.makedirs(os.path.join(ROOT, 'art', 'sheets'), exist_ok=True)
    nfiles = 0; tot = 0
    for key, e in man.items():
        entries = {'': e}
        entries.update(e.get('frames', {}))
        groups = {'a': [], 'b': []}
        for f, m in entries.items():
            im = Image.open(os.path.join(ROOT, m['src'])).convert('RGBA')
            if (im.width, im.height) != (m['w'], m['h']):
                m['w'], m['h'] = im.width, im.height       # keep the manifest honest about frame sizes
            groups['a' if f in FIRST or key.startswith('surv_') else 'b'].append((f, im))
        for g, items in groups.items():
            if not items: continue
            sheet, pos = pack(items)
            rel = f'art/sheets/{key}-{g}.webp'
            sheet.save(os.path.join(ROOT, rel), 'WEBP', quality=92, method=6)
            nfiles += 1; tot += os.path.getsize(os.path.join(ROOT, rel))
            for f, (x, y) in pos.items():
                entries[f]['sheet'] = rel; entries[f]['at'] = [x, y]
    open(mp, 'w').write(src[:src.index('globalThis.LF_ART=')] + 'globalThis.LF_ART=' + json.dumps(man) + ';\n')
    print(f'{nfiles} sheets, {tot // 1024} KB')

if __name__ == '__main__':
    main()
