#!/usr/bin/env python3
"""Bake the handheld shell's printed labels into index.html as SVG paths.

Phones with a large system text size scale every HTML font, which blew the shell's
printed labels (JUMP, START, the bezel line...) out of their slots. Vector paths are
immune to that. Each `<svg class="lab" data-l="NAME">` in index.html is filled in with
the outlines of its text, taken straight from the game's fonts.

Usage: python3 tools/shell_labels.py [index.html] --ps2p PressStart2P.ttf --bungee Bungee-Regular.ttf
"""
import argparse, re, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

# label id -> (font, text, per-letter classes or None)
LABELS = {
    'jump': ('px', 'JUMP', None), 'hit': ('px', 'HIT', None), 'spec': ('px', 'SPEC', None),
    'gear': ('px', 'GEAR', None), 'start': ('px', 'START', None), 'power': ('px', 'POWER', None),
    'vhs': ('px', 'VHS QUALITY WITH STEREO SOUND', None), 'brand': ('px', 'THE LAST VIDEO STORE', None),
    'ok': ('px', 'OK', None), 'back': ('px', 'BACK', None), 'equip': ('px', 'EQUIP', None), 'scrap': ('px', 'SCRAP', None),
    'scrapq': ('px', 'SCRAP?', None), 'close': ('px', 'CLOSE', None), 'sort': ('px', 'SORT', None), 'takeoff': ('px', 'TAKE OFF', None),
    'pwr': ('px', 'PWR', None), 'vol': ('px', 'VOL', None), 'hifi': ('px', 'HI-FI STEREO', None), 'pockettv': ('px', 'POCKET TV', None),
    'model': ('px', 'MODEL RP-1996', None), 'mark': ('bg', 'REWIND', None),
}


def text_paths(font, text, tracking=0.0):
    """Return ([(path_d, index)], bbox) for `text`, 100 units per em, baseline at y=0, y down."""
    upem = font['head'].unitsPerEm
    s = 100.0 / upem
    cmap = font.getBestCmap()
    gs = font.getGlyphSet()
    hmtx = font['hmtx']
    x = 0.0
    out = []
    bp = BoundsPen(gs)
    for i, ch in enumerate(text):
        gname = cmap.get(ord(ch))
        if gname is None:
            gname = cmap.get(ord('?'))
        adv = hmtx[gname][0] * s
        if ch != ' ':
            pen = SVGPathPen(gs)
            tp = TransformPen(pen, (s, 0, 0, -s, x, 0))
            gs[gname].draw(tp)
            gs[gname].draw(TransformPen(bp, (s, 0, 0, -s, x, 0)))
            d = pen.getCommands()
            if d:
                out.append((d, i))
        x += adv + tracking
    return out, bp.bounds


def fmt(v):
    return ('%.1f' % v).rstrip('0').rstrip('.')


def build(fonts):
    svgs = {}
    for key, (fk, text, classes) in LABELS.items():
        font = fonts[fk]
        paths, (x0, y0, x1, y1) = text_paths(font, text, tracking=2.0 if fk == 'bg' else 0.0)
        pad = 1.0
        vb = '%s %s %s %s' % (fmt(x0 - pad), fmt(y0 - pad), fmt(x1 - x0 + 2 * pad), fmt(y1 - y0 + 2 * pad))
        inner = ''.join('<path%s d="%s"/>' % ((' class="%s"' % classes[i]) if classes else '', d) for d, i in paths)
        svgs[key] = '<svg class="lab" data-l="%s" viewBox="%s" aria-hidden="true">%s</svg>' % (key, vb, inner)
    return svgs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('html', nargs='?', default='index.html')
    ap.add_argument('--ps2p', required=True)
    ap.add_argument('--bungee', required=True)
    a = ap.parse_args()
    fonts = {'px': TTFont(a.ps2p), 'bg': TTFont(a.bungee)}
    svgs = build(fonts)
    html = open(a.html, encoding='utf-8').read()
    n = 0
    def rep(m):
        nonlocal n
        key = m.group(2)
        if key not in svgs:
            print('no label for', key, file=sys.stderr)
            return m.group(0)
        n += 1
        return svgs[key].replace('class="lab"', 'class="%s"' % m.group(1), 1)
    html2 = re.sub(r'<svg class="(lab[^"]*)" data-l="([a-z0-9]+)"[^>]*>.*?</svg>', rep, html, flags=re.S)
    open(a.html, 'w', encoding='utf-8').write(html2)
    print('filled', n, 'labels;', len(html2) - len(html), 'bytes added')


if __name__ == '__main__':
    main()
