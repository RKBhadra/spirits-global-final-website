# Spirits Global

Static marketing site and institutional client onboarding portal for Spirits Global.

The project is plain HTML, CSS, and classic browser JavaScript. Tailwind is loaded from its Play CDN, so there is no build step, package manager, or bundler.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Executive acoustic entrainment and corporate wellness homepage |
| `pages/onboarding.html` | Confidential 4-step institutional client onboarding flow |
| `main.html` | Legacy redirect to `index.html` |
| `onboarding/index.html` | Legacy redirect to `pages/onboarding.html` |
| `onboarding/client-onboarding.html` | Legacy redirect to `pages/onboarding.html` |

## Run Locally

Serve the project root over HTTP:

```sh
python3 -m http.server 8000
```

Then open:

- Homepage: <http://localhost:8000/>
- Onboarding: <http://localhost:8000/pages/onboarding.html>

Opening the pages directly with `file://` also works for normal browsing, but the homepage's self-contained HTML export relies on `fetch()` and is only fully supported over HTTP.

## Structure

```text
.
├── index.html
├── main.html
├── pages/
│   └── onboarding.html
├── onboarding/                # legacy redirects and onboarding notes
├── assets/
│   └── images/
├── css/
│   ├── home.css
│   └── onboarding.css
├── js/
│   ├── config/                # Tailwind CDN configuration
│   ├── data/                  # photo manifest and promo codes
│   ├── services/              # storage, audio, uploads, CRM
│   └── pages/                 # page orchestration and flows
├── components/                # page UI behaviors
└── utils/                     # shared storage and audio helpers
```

## Features

- Luxury obsidian-and-champagne responsive homepage.
- Interactive gallery filtering, lightbox, consultation modal, and mobile navigation.
- Web Audio API 432Hz singing-bowl and resonance synthesis.
- Local photo vault backed by IndexedDB with upload, bulk drop, reset, and image fallback.
- Self-contained HTML export with current photos, styles, and scripts inlined when served over HTTP.
- 4-step onboarding flow with sector selection, corporate-email hint, promo validation, pricing tiers, payment method, session pass, and print styling.
- Onboarding records are saved to `localStorage` under `spirits_global_crm_v1`.

## Notes and Limitations

- Onboarding data, including contact details, is stored only in the browser's `localStorage`. It is not sent to a backend and is not suitable for production PII without a secure server-side integration.
- The homepage photo manifest retains the original portfolio filenames. Those files were not all available in the source project, so curated Unsplash fallbacks remain in use. Local files in `assets/images/` are intentionally not wired into the manifest to preserve existing visuals.
- Promo codes are client-side constants in `js/data/promo-codes.js`; they are not secure authorization.
- Tailwind, Google Fonts, and fallback images require network access.

## Verification

This project has no automated test suite or lint tool. Verify changes by serving the site and checking both pages in a browser. See `AGENTS.md` for the available syntax, link, HTTP, and headless-browser smoke checks.
