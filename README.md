# Frontend Wizards — Stage 1B: Testable profile card

Static **HTML, CSS, and vanilla JavaScript** only (no React, no Next.js). The site entry point is **`index.html`**, which implements the accessible, responsive **profile card** with stable `data-testid` hooks for automated tests.

## Project layout

```text
ToDo/
index.html          # Profile card (site root)
css/
    profile.css     # Layout, breakpoints, focus styles
js/
    profile.js      # Epoch time (ms), avatar URL + file upload
images/
    ME.jpg          # Default avatar image
README.md   

## Run locally

- **Open the file**: double-click `index.html` or open it from your browser.
- **Static server** (recommended for consistent behavior with assets and links):


## Stage 1B — Profile card (current)

| Area | Details |
|------|---------|
| **Semantics** | `<article data-testid="test-profile-card">`, `<figure>` + `<img>`, name in `<h2>`, bio in `<p>`, `<nav>` + `<ul>` for social links, `<section>` + `<ul>` for hobbies and dislikes |
| **Test IDs** | `test-profile-card`, `test-user-name`, `test-user-bio`, `test-user-time`, `test-user-avatar`, `test-user-social-links`, `test-user-social-twitter` / `-github` / `-linkedin`, `test-user-hobbies`, `test-user-dislikes` |
| **Time** | `test-user-time` shows `Date.now()` in **milliseconds**, updated every **750ms** (within the 500–1000ms guidance), with `aria-live="polite"` and `aria-atomic="true"` |
| **Avatar** | Default `images/ME.jpg`; optional **image URL** (Apply) or **file upload** (object URL); `data-testid` stays on the `<img>` |
| **Social** | Links open in a new tab with `target="_blank"` and `rel="noopener noreferrer"` |
| **Layout** | Mobile: stacked; **768px+**: avatar left, content right; long text wraps without breaking the card |

## Deploy / submission

Host this folder on GitHub Pages, Netlify, Cloudflare Pages, or similar so `index.html` is the site root. Include `css/`, `js/`, and `images/` in the deploy.

- **Live URL**: _add after deploy_
- **GitHub repo**: _add your repository URL_

## Accessibility

- Skip link to main content; interactive controls use visible **`:focus-visible`** outlines.
- Avatar includes an **`alt`** attribute; social links have visible text (accessible names).
- Live region on the time readout for periodic updates.

## Known limitations

- Profile data (name, bio, links, lists) is **static in HTML** unless you extend `profile.js` to load JSON or a backend.
- **Delete** / persistence from earlier todo demos are not part of this page.

## Related: Stage 1A — Todo card

An earlier assignment built a **single interactive todo card** (edit mode, status/priority, collapsible description, due-time copy) as plain HTML/CSS/JS. That implementation used separate files such as `css/styles.css` and `js/app.js` with `data-testid="test-todo-*"`. It is **not** included in the default layout above; check your git branches or history if you need that bundle alongside this profile page.
