# AGENTS.md

## Project

Spirits Global is a zero-build static site: plain HTML, CSS, and classic browser JavaScript with Tailwind Play CDN.

Preserve the existing visual design exactly unless the user explicitly requests a design change. Do not alter colors, shades, typography, spacing, copy, or animation unless required and approved.

## Non-Negotiable Constraints

- No package manager, bundler, framework, or ES modules. `onclick` handlers rely on globally scoped classic scripts.
- Do not add build tooling or convert scripts to modules without an explicit request.
- Keep the critical homepage head order in `index.html`:
  1. `js/data/photo-manifest.js`
  2. `js/services/photo-store.js`
  3. `components/image-fallback.js`
- Keep dependency order in `pages/onboarding.html`: `utils/audio.js` and `utils/storage.js` must load before the scripts that call them.
- Preserve legacy redirects: `main.html`, `onboarding/index.html`, and `onboarding/client-onboarding.html`.
- Do not wire local files from `assets/images/` into the photo manifest merely because they exist. The manifest intentionally keeps the original missing filenames plus Unsplash fallbacks to preserve current visuals.
- Onboarding PII is stored only in browser `localStorage` (`spirits_global_crm_v1`). Do not claim it is server-persisted.

## Local Development

Serve from the project root:

```sh
python3 -m http.server 8000
```

- Homepage: <http://localhost:8000/>
- Onboarding: <http://localhost:8000/pages/onboarding.html>

There is no `npm`, `node`, lint, or test command.

## Verification

### JavaScript syntax

All `.js` files are classic scripts. Check them with JXA when Node is unavailable:

```sh
find . -name '*.js' -not -path './node_modules/*' -print0 | while IFS= read -r -d '' file; do
  osascript -l JavaScript -e "ObjC.import('Foundation'); const s=$.NSString.stringWithContentsOfFileEncodingError('$file', $.NSUTF8StringEncoding, null); new Function(s.js);" || exit 1
done
```

### Local references

Check that every local `src` and `href` resolves. External CDN and missing pre-existing portfolio image paths are expected.

### HTTP smoke check

```sh
python3 -m http.server 8000
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8000/
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8000/pages/onboarding.html
```

### Browser smoke check

For visual checks, use the installed Chrome:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars --window-size=1440,1100 \
  --screenshot=/tmp/spirits-home.png http://localhost:8000/
```

Repeat for `/pages/onboarding.html`. Check the DOM dump for `Uncaught`, `SyntaxError`, `ReferenceError`, and `TypeError`:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --dump-dom http://localhost:8000/ > /tmp/spirits-home-dom.html
```

## Key Files

- `index.html`: homepage markup and external asset references.
- `pages/onboarding.html`: onboarding markup and script order.
- `js/services/photo-store.js`: photo state and IndexedDB persistence.
- `components/photo-sync-studio.js`: photo vault modal and self-contained HTML export.
- `js/pages/onboarding/form-flow.js`: onboarding validation, record creation, and session pass.
- `js/services/crm-store.js`: onboarding `localStorage` writes.
- `utils/storage.js`: safe JSON read/write helpers.
- `utils/audio.js`: shared AudioContext helpers.

## Export Behavior

`exportEmbeddedHTML()` in `components/photo-sync-studio.js` is async. It inlines same-origin CSS and JavaScript into the cloned document before download. Over HTTP this produces a self-contained export; under `file://`, browser fetch restrictions can prevent inlining.

## Git

Do not commit, amend, or push unless explicitly asked.
