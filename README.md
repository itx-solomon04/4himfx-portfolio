# 4him.fx — Portfolio (React + Three.js)

Your cinematic portfolio, rebuilt in React with a real 3D hero scene and
videos that autoplay the instant a visitor scrolls to them — no play button,
no clicking.

## 1. Install and run it locally

You need [Node.js](https://nodejs.org) (v18 or newer) installed on your
computer first.

```bash
cd 4himfx-portfolio
npm install
npm run dev
```

Open the link it prints (usually `http://localhost:5173`). Every time you
save a file, the page updates instantly.

## 2. Add your videos (the only file you need to touch)

Open **`src/data/videos.js`**. That file controls every video on the site:
the showreel, the YouTube Edits tab, and the Short Films tab.

**To add a YouTube video:**
1. Copy the video ID from the URL — `youtube.com/watch?v=`**`zKTwnUe73hk`**
2. Add an entry:
   ```js
   { type: 'youtube', id: 'zKTwnUe73hk', title: 'My New Edit', tc: '00:03:00:00' }
   ```

**To add your own raw video file (not YouTube):**
1. Drop the `.mp4` file into `public/videos/` (e.g. `public/videos/reel2.mp4`)
2. Optionally drop a thumbnail image into `public/images/`
3. Add an entry:
   ```js
   { type: 'local', src: '/videos/reel2.mp4', poster: '/images/reel2.jpg', title: 'My New Edit', tc: '00:03:00:00' }
   ```

That's it — no other file needs to change. Both types autoplay muted and
loop automatically as soon as they scroll into view, and pause when
scrolled away. A small speaker icon in the corner of each video lets
visitors turn sound on if they want.

**Tip:** compress your `.mp4` files first (Handbrake, or `ffmpeg -crf 28`)
so they're under ~15–20MB each — this keeps the site fast, especially on
phones.

## 3. Add your own photo

Drop your photo in as `public/images/profile.jpg` — it's used in the About
section automatically.

## 4. Deploy to Vercel (free)

**Easiest way — no command line needed:**
1. Create a free account at [vercel.com](https://vercel.com) (you can sign
   up with GitHub, GitLab, or email).
2. Push this project to a GitHub repository:
   - Create a new repo at [github.com/new](https://github.com/new)
   - In this project folder, run:
     ```bash
     git init
     git add .
     git commit -m "Initial portfolio"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
     git push -u origin main
     ```
3. In Vercel, click **Add New → Project**, pick your repo, and click
   **Deploy**. Vercel auto-detects Vite/React — you don't need to change
   any settings.
4. In a minute or two you'll get a live URL like
   `https://your-portfolio.vercel.app`.

**Even simpler — drag and drop (no GitHub needed):**
1. Run `npm run build` locally — this creates a `dist/` folder.
2. Go to [vercel.com/new](https://vercel.com/new), and drag the `dist`
   folder onto the page.

Either way, every time you push a change to GitHub (or re-upload `dist`),
Vercel automatically redeploys — no extra step.

### Custom domain
Once deployed, go to your Vercel project → **Settings → Domains** and add
your own domain (e.g. `4him.fx`) if you buy one — Vercel gives you the DNS
records to add at your domain registrar.

## 5. Editing text and links

- **Contact links** (WhatsApp, Instagram, Fiverr, LinkedIn): edit
  `src/components/Contact.jsx`.
- **Headline / intro text**: edit `src/components/Hero.jsx`.
- **About text and stats**: edit `src/components/About.jsx`.
- **Process steps**: edit `src/components/Process.jsx`.
- **Colors / fonts**: edit the `:root` variables at the top of
  `src/index.css`.

## 6. About the 3D hero

The hero background (`src/components/Hero3D.jsx`) is a real Three.js scene
built with `@react-three/fiber`: a wireframe torus-knot with orbiting rings
and floating particles, in your teal/orange palette. It reacts to mouse
movement and to scrolling (the camera dollies back as you scroll past the
hero). It automatically falls back to a static gradient for visitors with
"reduce motion" enabled in their OS — this is an accessibility requirement,
not optional.

## Project structure

```
src/
  components/     — every section of the page (Hero, About, Work, etc.)
  data/videos.js  — ← the file you edit to add/change videos
  hooks/          — small reusable scroll-reveal helper
  index.css       — all styling (colors, layout, animations)
  App.jsx         — assembles the page
public/
  videos/         — put your raw .mp4 files here
  images/         — put your photo + thumbnails here
```
