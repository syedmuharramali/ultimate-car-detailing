# Ultimate Car Detailing — Full Project

Two folders, one repo:

```
client/   → public site + admin dashboard, one React app
             (Vite + React Router + Tailwind v4 + Framer Motion + lucide-react icons)
server/   → Express + MongoDB API
             (models, controllers, routes, middleware, Gmail email via Nodemailer)
```

## Client routes

Public: `/`, `/services`, `/gallery`, `/about`, `/contact`
Admin (separate layout — no public nav/footer): `/admin/login`, `/admin`

## Server structure

```
server/src/
  models/       Booking.js, Admin.js
  controllers/  bookingController.js, authController.js
  routes/       bookings.js, auth.js
  middleware/   requireAuth.js       (JWT check for admin routes)
  utils/        mailer.js            (Nodemailer, Gmail only)
  scripts/      seedAdmin.js         (creates the first admin login)
  config/       db.js
  server.js
```

Endpoints:
- `POST /api/bookings` — public, customer submits a booking
- `GET /api/bookings` — admin only (JWT), list bookings, filterable by `?status=`
- `PATCH /api/bookings/:id/status` — admin only, update a booking's status
- `GET /api/bookings/stats` — admin only, dashboard analytics
- `POST /api/auth/login` — admin login, returns a JWT
- `GET /api/auth/me` — validates the current token

## Setup

### 1. Database — MongoDB Atlas
Free M0 cluster, a database user, allow network access, copy the connection
string into `server/.env`.

### 2. Server
```bash
cd server
cp .env.example .env
# fill in MONGO_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD,
# GMAIL_USER, GMAIL_APP_PASSWORD, NOTIFY_EMAIL
npm install
npm run seed:admin   # creates your admin login, once
npm run dev           # http://localhost:5000
```

### 3. Client
```bash
cd client
cp .env.example .env   # VITE_API_URL=http://localhost:5000
npm install
npm run dev             # http://localhost:5173
```

That's it — two `npm install`s, two `npm run dev`s. Public site at `/`,
admin at `/admin/login`.

## Gmail setup (Nodemailer)

Gmail blocks plain passwords for app logins. You need an **App Password**:
1. myaccount.google.com/security → turn on 2-Step Verification
2. myaccount.google.com/apppasswords → create one, name it anything
3. Copy the 16-character password (no spaces) into `GMAIL_APP_PASSWORD`

`GMAIL_USER` is the Gmail address sending the alert. `NOTIFY_EMAIL` is
who receives it — can be the same address or the client's own email.

## Things to swap before going live

- **`client/src/components/Footer.jsx`** and **`client/src/pages/ContactPage.jsx`** — Instagram and email are placeholders. Swap for the client's real handles/email. The Facebook link is already the real page.
- **Reviews** — the site shows real numbers (500+ vehicles, 78% recommend) but no individual review quotes yet. Add real testimonials once you have them.

## Deployment (when ready)

- `client` → Vercel
- `server` → Render or Railway (needs a persistent Node process, not serverless)
- Set `VITE_API_URL` in the client's `.env` to the deployed server URL
- Set `CLIENT_ORIGINS` in the server's `.env` to the deployed client URL
