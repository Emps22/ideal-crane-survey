# Ideal Crane Rental — Site Surveys

A simple internal survey/trivia tool with a public survey page and a
password-gated admin panel. Data (surveys + responses) is stored using
Netlify Blobs via the function in `netlify/functions/data.js`.

## Deploy with the Netlify CLI (no GitHub required)

1. Install Node.js if you don't have it (https://nodejs.org).
2. Install the Netlify CLI: `npm install -g netlify-cli`
3. From this project folder, run: `netlify login` (opens a browser to sign in / create a free account)
4. Run: `netlify deploy` — when prompted, choose "Create & configure a new site",
   accept the defaults (publish dir `public`, functions dir `netlify/functions`).
5. Once the draft deploy succeeds, run: `netlify deploy --prod` to publish it live.
6. Open the live URL Netlify gives you — that's your site.

Netlify Blobs works automatically on Netlify's infrastructure once deployed —
no extra database setup or API keys needed.

## Deploy via GitHub instead (optional)

If you'd rather have every future edit auto-deploy:

1. Create a new empty repository on GitHub.
2. Push this folder's contents to it (`git init`, `git add .`, `git commit -m "Initial commit"`,
   then follow GitHub's instructions to add the remote and push).
3. In Netlify: **Add new site → Import an existing project → Deploy with GitHub**,
   pick the repo. Build settings are already defined in `netlify.toml`,
   so you can leave the build command blank and click Deploy.

## After deploying

- Change the admin password: open `public/index.html`, find the line
  `const ADMIN_PASSWORD = "IdealSafety2026";` near the top of the `<script>`,
  change the text, then redeploy (`netlify deploy --prod`, or push to GitHub
  if using Git-based deploys).
- The admin password is a simple client-side check — good enough for keeping
  casual folks out, not real authentication.
- Use the "Share / QR code" button on any open survey in Admin to get a
  direct link/QR code — it uses whatever domain the site is actually live on,
  so it only works correctly after deployment.
