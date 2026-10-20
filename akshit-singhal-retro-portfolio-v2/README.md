# Akshit Singhal — Retro Desktop Portfolio

A personalized retro desktop-style portfolio built with React + Vite on the frontend and Express + MongoDB on the backend. It includes the animated welcome desktop, personal photo, Hintro Dashboard preview, PDF and Word resume downloads, education and internship timeline, theme toggle, draggable desktop windows, and a contact form that persists submissions to MongoDB when configured.

## Personal details included
- **Name:** Akshit Singhal
- **Email:** akshitt1922@gmail.com
- **Location:** Jaipur, Rajasthan, India
- **LinkedIn:** https://linkedin.com/in/akshit-singhal22
- **GitHub:** https://github.com/Aksh1922
- **Education:** B.Tech Computer Science Engineering, JK Lakshmipat University (2024–2028)
- **Experience:** IT/AI Intern, Anytime Invest Services Pvt. Ltd.

## Stack
- Frontend: React, Vite, React Router, Framer Motion, Lucide, CSS
- Backend: Node.js, Express, Mongoose, Helmet, rate limiting, optional Nodemailer
- Database: MongoDB Atlas or local MongoDB

## Run locally
Requirements: Node.js 20+ and a MongoDB connection string if you want contact form submissions stored.

1. Copy `server/.env.example` to `server/.env` and set `MONGO_URI`.
2. Copy `client/.env.example` to `client/.env` (the local API default is already configured).
3. At the project root, run:
   ```bash
   npm run install:all
   npm run dev
   ```
4. Open `http://localhost:5173`. API health check: `http://localhost:5000/health`.

The PDF and Word resumes are included at `client/public/resume.pdf` and `client/public/resume.docx`; both download links are available in the frontend. The Hintro Dashboard preview, personal photo, certificate illustration, and EV Battery Health ML project artwork are bundled in `client/public/`.

## Project cards
The featured projects are configured in `client/src/data/portfolio.js`. The EV Battery Health ML card is marked **In development** because its model details and evaluation metrics have not yet been verified. Update the description, technologies, and repository URL when the exact implementation is ready to showcase.

## Configure MongoDB contact storage
Set `MONGO_URI` in `server/.env`. If it is missing, the API still starts, but contact submissions return a clear service-unavailable response rather than pretending to save. Optional email notifications can be enabled with `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`, and optionally `CONTACT_FROM`.

## Deploy

### 1. MongoDB Atlas
1. Create a database cluster and database user.
2. Add the backend host's IP access as appropriate for your deployment environment.
3. Put the connection string in the backend environment as `MONGO_URI`. Never expose it in the frontend.

### 2. Backend on Render or Railway
1. Push this folder to a GitHub repository.
2. Create a Node web service with **root directory** `server`, build command `npm install`, and start command `npm start`.
3. Configure `MONGO_URI`, `CLIENT_URL` (your exact deployed frontend origin), and `NODE_ENV=production`.
4. Optional email notification environment variables are documented in `server/.env.example`.
5. Verify the deployed `/health` endpoint returns `{ "status": "ok" }`.

### 3. Frontend on Vercel or Netlify
1. Import the same repository and set **root directory** to `client`.
2. Build command: `npm run build`; output directory: `dist`.
3. Set `VITE_API_URL` to the deployed API base URL, with no trailing slash.
4. `client/vercel.json` and `client/public/_redirects` provide SPA routing support.
5. Add the deployed frontend origin to `CLIENT_URL` on the backend and redeploy the API.

## Before public launch
- The resume supplied with this build is included as-is.
- Project repository links currently point to your GitHub profile because individual repository URLs were not supplied; update each `github` value in `client/src/data/portfolio.js` when you want direct project links.
- No live-demo URLs or certificate verification URLs were supplied, so none are fabricated.
- The portrait uses an initials avatar; replace it with a real photo only if you want to.
- Add a privacy notice and consider abuse monitoring before collecting public messages.

## Main customization file
`client/src/data/portfolio.js`


## Visual update
The desktop now opens with an animated welcome card featuring your campus photo, intro, and quick actions. The desktop icons use a two-column layout on larger screens and a compact row on mobile. Keep `client/public/akshit-photo.jpg` in place to show your photo.
