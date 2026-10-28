# Ideal Crane Rental — Site Surveys

Internal survey / safety-trivia tool with a public survey page and a
password-gated admin panel. Surveys and responses are stored with Netlify Blobs
through the function in `netlify/functions/data.js`.

## Files

- `public/index.html` — the whole app (public side + admin)
- `netlify/functions/data.js` — small storage API used by the page
- `netlify.toml` — tells Netlify to publish `public` and find the function
- `package.json` — pulls in `@netlify/blobs`

## Updating the live site

The Netlify project is connected to the GitHub repo. Upload changed files to the
repo (Add file → Upload files) and Netlify redeploys automatically in about a minute.

## Admin password

Open `public/index.html`, find `const ADMIN_PASSWORD = "..."` near the top of the
`<script>`, change the text, and upload the file again. This is a simple check in
the page itself, fine for keeping casual users out but not real authentication.
