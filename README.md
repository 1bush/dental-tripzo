# Dental Tripzo

Premium dental tourism landing page — saves 50–70% on veneers, All-on-4 and
Straumann implants in Tirana, Albania.

## Structure

```
index.html   # primary static page (self-contained + app.js)
app.js       # external JS (no inline handlers, XSS-safe writes)
App.jsx      # optional React component variant (needs a bundler)
package.json # tooling for the React variant (Vite)
```

Open `index.html` directly in a browser — no build step required.

## Languages & origin markets

The page is localised for **4 languages** and matches the origin country in the
flight widget:

| Lang | Button | Origin city / airport          |
|------|--------|--------------------------------|
| English   | EN | Prague (PRG)                   |
| Polish    | PL | Warsaw (WAW)                   |
| Czech     | CZ | Prague (PRG)                   |
| Slovak    | SK | Bratislava (BTS)               |

Target countries: **Poland**, the **Czech Republic** and **Slovakia**.

## Security improvements implemented

Based on OWASP guidance (Top 10 / XSS / Unrestricted File Upload):
- **Content-Security-Policy** meta header (scripts from `'self'` only).
- **No inline event handlers** — all logic lives in `app.js`, attached via
  `addEventListener` (no `on*=` attributes).
- **XSS-safe DOM writes** — user/control values rendered with `textContent`,
  never `innerHTML`.
- **File upload hardening** — type whitelist (JPEG/PNG), 10 MB size limit,
  client-side validation + clear error. Server-side re-validation is still
  mandatory in production.
- **GDPR consent** — explicit checkbox before any medical data (X-Ray) is
  transmitted; this is a static demo so nothing is sent until a backend is wired.
- **Honeypot** field to trap spam bots.
- **Accessibility** — `type="button"`, `aria-*`, `:focus-visible`, `role`
  attributes, keyboard-accessible cards and labels.
- **Metadata** — description + Open Graph tags for SEO/social sharing.
- **`rel="noopener"`** on external links.

## Deploy / production checklist (not yet implemented here)
1. Serve over **HTTPS only** (HSTS).
2. Move CSP to server response headers (add `frame-ancestors`/`upgrade-insecure-requests`).
3. Wire the contact form to a secure backend that:
   - re-validates the file **server-side** (magic bytes, size, safe storage name, no execution).
   - stores/transmits encrypted and logs minimal PII.
   - honours consent withdrawal and retention/deletion (GDPR).
4. Add CSRF token to the form if it becomes a POST endpoint.
5. Add a Privacy Policy and Terms page (placeholders exist in the footer).