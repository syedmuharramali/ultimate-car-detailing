# Deploying Ultimate Car Detailing

Two pieces deploy separately: the React client (Vercel) and the Express API
(Render). They find each other through two environment variables that have to
agree — that is where nearly every failed deploy of this kind goes wrong.

```
Vercel (client)  --VITE_API_URL-->  Render (API)  -->  MongoDB Atlas
       ^                                  |
       +--------- CLIENT_ORIGINS ---------+
```

Deploy the **API first**, because the client needs its URL at build time.

---

## 1. MongoDB Atlas

1. In your cluster: **Network Access → Add IP Address**.
2. Render's outbound IP is not fixed on the free plan, so allow `0.0.0.0/0`.
   Your database is still protected by its username and password. If you later
   move to a paid Render plan with a static outbound IP, narrow this to that IP.
3. **Database Access** → confirm the user in your connection string exists and
   its password matches. If the password contains `@ : / ?` or `#`, it must be
   percent-encoded in the URI.

## 2. API on Render

**New → Blueprint** and point it at this repo — `server/render.yaml` configures
the service. Or create a Web Service manually with:

| Setting | Value |
| --- | --- |
| Root directory | `server` |
| Build command | `npm ci` |
| Start command | `npm start` |
| Health check path | `/api/health` |

Then set these environment variables in the Render dashboard:

| Key | Value |
| --- | --- |
| `MONGODB_URI` | your Atlas connection string |
| `DB_NAME` | `ultimate_car_detailing` |
| `JWT_SECRET` | a long random string — **not** the one from local dev |
| `CLIENT_ORIGINS` | your Vercel URL, **no trailing slash** |
| `TIMEZONE` | `America/Toronto` |
| `NODE_ENV` | `production` |
| `GMAIL_USER` | the sending Gmail address |
| `GMAIL_APP_PASSWORD` | 16-character App Password, not your real password |
| `NOTIFY_EMAIL` | where new-booking alerts go |

Do **not** set `PORT` — Render assigns it and the app reads it.

Do **not** set `DNS_SERVERS` in production. It exists only for local machines
whose ISP can't resolve Atlas SRV records; forcing external resolvers on a
cloud host can break the connection instead of fixing it.

Confirm it is up:

```
curl https://<your-api>.onrender.com/api/health
# {"ok":true,"uptime":12}
```

## 3. Client on Vercel

**Add New → Project**, import the repo, and set:

| Setting | Value |
| --- | --- |
| Root directory | `client` |
| Framework preset | Vite |
| Build command | `npm run build` (default) |
| Output directory | `dist` (default) |

Environment variable:

| Key | Value |
| --- | --- |
| `VITE_API_URL` | `https://<your-api>.onrender.com` — no trailing slash |

**Vite inlines `VITE_API_URL` at build time.** Changing it in Vercel does
nothing until you redeploy. If the site still calls `localhost:5000` after you
change it, that is why.

`client/vercel.json` already handles the two things a Vite SPA needs: a rewrite
sending every non-asset path to `index.html` (without it, refreshing on
`/services` or opening `/admin/login` directly returns 404), and immutable
caching on hashed assets.

## 4. Close the loop

Once Vercel gives you the real domain, go back to Render and set
`CLIENT_ORIGINS` to it, then redeploy the API. Until that is done the browser
blocks every request and the booking form fails with "failed to fetch".

Multiple origins are comma-separated:

```
CLIENT_ORIGINS=https://ultimatecardetailing.ca,https://www.ultimatecardetailing.ca
```

---

## Post-deploy checklist

- [ ] `GET /api/health` returns `{"ok":true}`
- [ ] Home page loads; hero image appears
- [ ] Navigate to `/services`, then **hard refresh** — still works, no 404
- [ ] Submit a booking from `/contact` — success message appears
- [ ] The booking arrives in `NOTIFY_EMAIL`
- [ ] Log in at `/admin/login`
- [ ] Dashboard shows the booking, and both charts render
- [ ] Change a booking's status in the table — it persists on reload
- [ ] Open the site on a phone: the Book Now bar is pinned at the bottom
- [ ] Drag the before/after slider on that phone

## When something breaks

| Symptom | Cause |
| --- | --- |
| Booking form: "failed to fetch" | `CLIENT_ORIGINS` missing the Vercel origin, or has a trailing slash |
| 404 on refresh at `/services` | `vercel.json` rewrite missing or root directory not `client` |
| API still called at `localhost:5000` | `VITE_API_URL` set but not redeployed |
| API exits at boot | `MONGODB_URI` or `JWT_SECRET` unset — the log names which |
| Atlas connection timeout | deploy host's IP not in Network Access |
| Login always fails | `JWT_SECRET` changed after the admin was created is fine; a wrong password is not — the admin lives in the database, not in env |
| First request after idle takes ~50s | Render free tier sleeps. Expected. A paid plan or an uptime pinger fixes it |
| Booking rejected with "too many requests" | rate limit is 5/hour per IP, and failed attempts count. Raise it in `server/src/middleware/rateLimiters.js` |

## Notes

- Images in `client/src/assets/` are already sized for their render dimensions.
  If you replace one, keep it near the size it is displayed at — the originals
  were ~9x larger than needed, which is what made mobile scrolling stutter.
- The admin dashboard is code-split: `recharts` (~382 KB) only downloads when
  someone visits `/admin`, never for a customer.
