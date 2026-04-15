# Todo Card — Stage 1 (plain HTML / CSS / JS)

Single-page demo of one interactive todo card: editable fields, status and priority controls, collapsible description, live due-time copy, and accessibility-oriented markup. There is **no** React or Next.js; open `index.html` in a browser or serve the folder statically.

## Run locally

- **Direct file**: double-click `index.html`, or open it from the browser (some browsers restrict `datetime-local` or ES modules; this project uses deferred classic script — no modules).
- **Static server** (recommended): from this folder run any static server, for example:

```bash
npx --yes serve .
```

Then visit the URL shown (often `http://localhost:3000`).

## Deploy (live URL)

Build a **live URL** by hosting this folder on GitHub Pages, Netlify, Vercel (static), Cloudflare Pages, or similar. Upload the contents of `ToDo/` (at minimum `index.html`, `css/`, `js/`) so `index.html` is the site root.

Replace this line with your real links when you submit:

- **Live URL**: _add after deploy_
- **GitHub repo**: _add your repository URL_

## What changed from Stage 0

- **Stack**: Replaced the Next.js + React app with **plain HTML, CSS, and JavaScript** files (`index.html`, `css/styles.css`, `js/app.js`).
- **Editing**: Edit toggles a real form with labeled fields; Save applies changes, Cancel restores a snapshot taken when Edit opened; focus returns to the Edit control when the form closes. Tab cycles inside the form (simple focus loop).
- **Status**: `Pending`, `In Progress`, and `Done` are available from a `<select>`; the checkbox, status pill, and dropdown stay in sync (checking completes the task; clearing completion sets **Pending**).
- **Priority**: Left accent on the card, a colored dot (`test-todo-priority-indicator`), and the existing priority badge (`test-todo-priority`) reflect Low / Medium / High.
- **Description**: Long copy is **collapsed** by default (line clamp); **Show more / Show less** toggles with `aria-expanded` and `aria-controls` pointing at the collapsible section id.
- **Time**: Relative strings are computed from the due datetime (e.g. “Due in 2 days”, “Due in 45 minutes”, “Overdue by 1 hour”). The label updates on an interval (45 seconds, within the 30–60s band). When status is **Done**, the pill shows **Completed** and the interval stops.
- **Overdue**: An explicit “Overdue” badge appears when the task is overdue and not completed; the card gets a stronger red border treatment.

## Design decisions

- **One card, one state object** in `app.js` keeps behavior predictable and matches “single component” scope.
- **Status source of truth**: Internal `state.status`; checkbox and `<select>` are updated from it and user actions write back through small sync helpers.
- **Collapse**: Character threshold (140) plus CSS line clamp keeps layout stable without measuring pixels.
- **Datetime**: Due date is edited with `datetime-local`; values are stored as local wall-clock strings consistent with the original demo.

## Known limitations

- **Delete** still uses `window.alert` like the Stage 0 demo (no persistence).
- **Tags** are not part of the edit form; they stay as defined in initial state unless you change the code.
- The old **`todo/`** Next.js project may still appear on disk if files were locked (e.g. dev server or antivirus). Close any running `next dev` processes and delete `todo/` manually if removal failed.

## Accessibility notes

- Edit fields use `<label for="…">` tied to inputs.
- Status `<select>` has `aria-label="Task status"` (and a visible “Status” label).
- Expand control uses `aria-expanded` and `aria-controls` matching `id="todo-collapsible-section"`.
- Live region: `aria-live="polite"` on the time-remaining span (and overdue badge) for periodic updates.
- Keyboard tab order in read mode follows: **checkbox → status → expand (when shown) → Edit → Delete**. In edit mode, focus is kept within the form via Tab wrapping; closing returns focus to **Edit**.

## `data-testid` checklist

Stage 0 ids are preserved where applicable; Stage 1 adds the new ids required by the brief (edit form, status control, priority indicator, expand/collapse, overdue indicator, etc.). Open `index.html` and `js/app.js` to verify names match your test suite.
