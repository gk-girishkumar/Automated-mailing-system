# 🚀 Deployment Guide

## Frontend Deployment (Netlify)

### Step 1: Prepare Frontend

```bash
cd frontend
npm install
npm run build
```

Verify the `dist/` folder is created.

### Step 2: Deploy to Netlify

```bash
npm i -g netlify-cli
cd frontend
netlify deploy --prod --dir=dist
```

Follow the prompts and connect the `frontend` folder as the site root.

### Step 3: Configure the Frontend API URL

In Netlify site settings, set an environment variable:

- `VITE_API_URL` = `https://<your-vercel-backend>.vercel.app`

This allows the deployed frontend to call the Vercel backend.

---

## Backend Deployment (Vercel)

### Step 1: Prepare Backend

```bash
cd backend
npm install
```

### Step 2: Deploy to Vercel

Install the Vercel CLI if needed:

```bash
npm i -g vercel
```

From the `backend` directory, run:

```bash
vercel
```

Choose:
- Project name: `ai-cold-mail-backend`
- Framework preset: `Other`
- Build command: `npm install`
- Output directory: `.`

Vercel will use `backend/vercel.json` to route requests to `server.js`.

### Step 3: Set Environment Variables

In the Vercel dashboard for your backend project, add:

- `EMAIL_USER`
- `EMAIL_PASS`
- `OPENAI_API_KEY`
- `DATABASE_URL`

You can also add `PORT` if needed, but Vercel sets the port automatically.

### Step 4: Deploy

Click deploy or run `vercel --prod`.

---

## Database Deployment (Neon)

### Step 1: Create Neon Account

Go to [neon.tech](https://neon.tech)

### Step 2: Create Project

1. New Project
2. Region: US East
3. Get connection string

### Step 3: Update Backend

Add to `backend/.env`:

```
DATABASE_URL=postgresql://user:password@ep-xxxxx.neon.tech/dbname?sslmode=require
```

### Step 4: Load Schema

```bash
psql "your_neon_connection_string" < database/schema.sql
```

---

## Updating Deployed Apps

### Frontend Update (Netlify)

```bash
cd frontend
git add .
git commit -m "Update frontend"
git push origin main
# Netlify auto-deploys if connected to Git
```

### Backend Update (Vercel)

```bash
cd backend
git add .
git commit -m "Update backend"
git push origin main
# Vercel auto-deploys if connected to Git
```

---

## Production Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed and running
- [ ] Environment variables set
- [ ] Database connected
- [ ] Email configured
- [ ] OpenAI API working
- [ ] CORS properly configured
- [ ] Error logging enabled
- [ ] Rate limiting added
- [ ] SSL certificates configured

---

## Monitoring

### Backend Logs (Vercel)
- Dashboard → Logs
- Monitor errors and requests

### Frontend Performance (Netlify)
- Dashboard → Analytics
- Check performance metrics

### Database (Neon)
- Dashboard → SQL Editor
- Monitor queries and performance

---

## Cost Estimation

| Service | Free Tier |
|---------|-----------|
| Vercel | ∞ requests |
| Netlify | Free tier with build minutes |
| Neon | 3GB storage |
| OpenAI | Pay-as-you-go |
| Gmail | Free |

---

## Troubleshooting Deployment

| Issue | Solution |
|-------|----------|
| Build fails | Check `npm install` works locally |
| Env vars not loaded | Verify in dashboard |
| Database connection fails | Test connection string locally |
| CORS errors | Update frontend API URL |
| Emails not sending | Verify Gmail app password |

---

## Custom Domain

### Vercel
1. Settings → Domains
2. Add custom domain
3. Update DNS records

### Vercel
1. Settings → Custom Domain
2. Add domain
3. Update CNAME record

---

## Scaling for Production

### Phase 1 (0-100 users)
- Current setup sufficient
- Add error logging

### Phase 2 (100-1000 users)
- Add rate limiting
- Database indexing (already done)
- Email queue system

### Phase 3 (1000+ users)
- Multiple backend instances
- Load balancing
- Redis caching
- CDN for frontend

---

## Monitoring & Analytics

Add to backend:

```javascript
// Error tracking
const Sentry = require("@sentry/node");
Sentry.init({ dsn: "your_dsn" });

// Analytics
const analytics = require("segment");
```

---

## Auto-Scaling

Vercel automatically scales based on traffic when your project is connected to Git. No extra server configuration is needed!

---

## Backup Strategy

### Database Backups
```bash
# Neon has automatic backups
# Manual backup:
pg_dump "your_connection_string" > backup.sql
```

### Restore Backup
```bash
psql "your_connection_string" < backup.sql
```

---

## Security in Production

- [ ] Remove console.logs in production
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Use HTTPS only
- [ ] Secure headers (CORS, CSP)
- [ ] API key rotation
- [ ] Audit logging

---

## Final Steps

1. ✅ Test all features in staging
2. ✅ Verify email sending works
3. ✅ Check database connectivity
4. ✅ Review security settings
5. ✅ Deploy to production
6. ✅ Monitor for 24 hours
7. ✅ Set up alerts

Congratulations! Your app is live! 🎉
