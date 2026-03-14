# email_analyzer_lesson2
This is code for project email_analyzer

## Frontend demo

A single-page frontend has been added to demonstrate the Python analyzer in the browser using Pyodide.

Files added:

- `index.html` — the single-page app with a black & yellow premium theme.
- `styles.css` — styling for the page.
- `script.js` — loads Pyodide and wires the UI to run the analyzer in-browser.

Run locally:

1. From the project root, serve the directory (this is the simplest option):

```bash
python3 -m http.server 8000
# or for Python 2: python -m SimpleHTTPServer 8000
```

2. Open `http://localhost:8000` in your browser and click the page.

Notes:
- The page uses Pyodide (loaded from CDN) so Python runs entirely in the browser — no server is required to execute the analyzer.
- The displayed Python source is the original script for reference; the site runs a safe in-browser wrapper function for the same logic.
- To deploy, you can push these files to GitHub and enable GitHub Pages, or deploy the static site to Netlify/Vercel.
