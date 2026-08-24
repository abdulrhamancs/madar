# Thmanyah (خط ثمانية) — brand typeface

The real font files are present in this folder and verified genuine (their
internal sfnt `name` tables read "thmanyah serif display" / "thmanyah serif
text" / "thmanyah sans", not just the filenames — a corrupted or mislabeled
file would still have the right filename).

## The three families

| Family (CSS)         | Files                        | Used for                          |
|-----------------------|-------------------------------|------------------------------------|
| `Thmanyah Display`    | `thmanyahserifdisplay-*`      | h1 / h2 — large editorial headlines |
| `Thmanyah Text`       | `thmanyahseriftext-*`         | body copy, article text, h3 / h4   |
| `Thmanyah Sans`       | `thmanyahsans-*`               | UI chrome — buttons, nav, form controls |

Each ships five weights — Light (300), Regular (400), Medium (500), Bold
(700), Black (900) — as both `.woff2` (primary) and `.otf` (fallback), wired
in `thmanyah.css` in this folder.

All three families were confirmed by glyph-coverage inspection to include a
complete Latin set (letters, digits) alongside Arabic, so this is one
bilingual identity rather than an Arabic face patched with a Latin substitute.

## Why the declarations live here, not in `src/styles.css`

CRA points webpack's `resolve.roots` at this directory, so a `url(/fonts/…)`
inside a *bundled* stylesheet is resolved at **build** time and fails
`npm run build` the moment a font file is missing. `thmanyah.css` is linked
directly from `public/index.html` instead, so it is never parsed by webpack —
the app builds and runs whether the binaries are present or not, and a
missing file just degrades to the fallback stack defined in `src/styles.css`
(`--font-brand`, `--font-display`, `--font-ui`).

## If you ever need to replace these files

The previous delivery attempts arrived as 221-byte macOS AppleDouble stubs —
the `._name` resource-fork sidecar, not the font — because the zip was made
without `-X`. Verify any future delivery before trusting it:

    ls -l public/fonts/*.woff2       # real files are 70-90 KB, not 221 bytes
    head -c 4 public/fonts/*.woff2 | xxd   # must read  wOF2

and zip on macOS with `zip -X -r thmanyah.zip "thmanyah typeface"` to strip
resource forks at the source.
