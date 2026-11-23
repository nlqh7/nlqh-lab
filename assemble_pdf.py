from pathlib import Path
import json
import shutil
import zipfile

workspace = Path(__file__).resolve().parent
source = workspace / 'references' / 'bentopdf-main'
dist = source / 'dist'
target = workspace / 'app' / 'public' / 'pdf'
if not (dist / 'index.html').exists() or not (dist / 'merge-pdf.html').exists():
    raise SystemExit('BentoPDF dist is incomplete')
if target.exists():
    shutil.rmtree(target)
target.mkdir(parents=True)

# Cloudflare Pages limits each asset to 25 MiB. Split the two large engine
# resources into ordered same-origin chunks; the loader reassembles them.
excluded = {'soffice.wasm.gz', 'soffice.data.gz'}
engine = dist / 'libreoffice-wasm'
chunk_size = 16 * 1024 * 1024
for name in sorted(excluded):
    data = (engine / name).read_bytes()
    parts = []
    for index, offset in enumerate(range(0, len(data), chunk_size)):
        part_name = f'{name}.part{index}'
        (engine / part_name).write_bytes(data[offset:offset + chunk_size])
        parts.append(part_name)
    (engine / f'{name}.parts.json').write_text(
        json.dumps({'parts': parts}), encoding='utf-8'
    )
for item in dist.rglob('*'):
    if item.is_file() and item.name not in excluded:
        relative = item.relative_to(dist)
        destination = target / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(item, destination)

archive = workspace / 'tmp' / 'nlqh-pdf-source.zip'
archive.parent.mkdir(parents=True, exist_ok=True)
if archive.exists():
    archive.unlink()
include_roots = ['src', 'scripts', 'translations', 'vendor']
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    for item in source.iterdir():
        if item.is_file() and item.suffix.lower() not in {'.log', '.zip', '.tgz'}:
            z.write(item, item.name)
    for name in include_roots:
        for item in (source / name).rglob('*'):
            if item.is_file():
                z.write(item, item.relative_to(source))
    for item in (source / 'public').rglob('*'):
        if not item.is_file():
            continue
        relative = item.relative_to(source)
        if relative.parts[:2] in [('public', 'libreoffice-wasm'), ('public', 'pdfjs-viewer'), ('public', 'pdfjs-annotation-viewer')]:
            continue
        z.write(item, relative)
    z.writestr('UPSTREAM-BINARIES.txt',
        'Third-party compiled viewer and LibreOffice assets are unchanged from upstream.\n'
        'Restore them from https://github.com/alam00000/bentopdf/tree/f1d685bcf607c904f0c6fb385e8048974a2bc8b0/public before a fully local build.\n'
        'The deployed NLQH adaptation serves these assets from its own ordered chunks.\n')
# Keep the source offer downloadable without presenting Cloudflare's upload UI
# with a second ZIP (only one archive per direct-upload selection is unpacked).
source_asset = 'nlqh-pdf-source.bin'
shutil.copy2(archive, target / source_asset)
for page in target.rglob('*.html'):
    text = page.read_text(encoding='utf-8')
    text = text.replace(
        'href="/pdf/source.zip" download=""',
        f'href="/pdf/{source_asset}" download="nlqh-pdf-source.zip"'
    )
    page.write_text(text, encoding='utf-8')

headers = (dist / '_headers').read_text(encoding='utf-8')
headers = headers.replace('/*\n', '/pdf/*\n', 1)
main_headers = '''/*
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Embedder-Policy: credentialless
  Cross-Origin-Resource-Policy: cross-origin
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

'''
(workspace / 'app' / 'public' / '_headers').write_text(main_headers + headers, encoding='utf-8')

large = []
for item in (workspace / 'app' / 'public').rglob('*'):
    if item.is_file() and item.stat().st_size > 25 * 1024 * 1024:
        large.append((str(item), item.stat().st_size))
if large:
    raise SystemExit(f'Files over Cloudflare limit: {large}')
print(f'PDF module assembled: {target}')
print(f'Modified source archive: {(target / source_asset).stat().st_size / 1024 / 1024:.1f} MiB')
