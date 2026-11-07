#!/usr/bin/env python3
"""Copy EULA.md and PRIVACY.md into index.html as the in-game Guide pages (const EULA / const PRIVACY).

    python3 tools/embed_docs.py

Edit the .md files, never the arrays in index.html; run this afterwards so the game and the files match.
"""
import os, re, json
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def items(md):
    out = []
    for ln in md.splitlines():
        ln = ln.strip()
        if not ln or ln.startswith('# '): continue
        if ln.startswith('## '): out.append(['h', ln[3:]])
        elif ln.startswith('- '): out.append(['b', ln[2:]])
        else: out.append(['p', ln])
    # the pixel font has no lowercase or bold: drop markdown emphasis, upper-case everything
    return [[k, re.sub(r'\*\*(.*?)\*\*', r'\1', t).upper()] for k, t in out]

def main():
    p = os.path.join(ROOT, 'index.html'); s = open(p).read()
    for name, f in (('EULA', 'EULA.md'), ('PRIVACY', 'PRIVACY.md')):
        line = f'const {name}=' + json.dumps(items(open(os.path.join(ROOT, f)).read()), ensure_ascii=True) + ';'
        s, n = re.subn(rf'^const {name}=\[.*?\];$', lambda m: line, s, flags=re.M)
        if n == 0:   # first time: put PRIVACY right after EULA
            s = re.sub(r'^(const EULA=\[.*?\];)$', lambda m: m.group(1) + '\n' + line, s, count=1, flags=re.M)
    open(p, 'w').write(s)
    print('embedded EULA.md and PRIVACY.md')

if __name__ == '__main__':
    main()
