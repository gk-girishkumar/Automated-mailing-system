# 🚀 Deployment Guide

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

```bash
cd frontend
npm run build
```

Verify `dist/` folder is created.

### Step 2: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
vercel
```

Follow the prompts:
- Project name: `ai-cold-mail-frontend`
- Framework: `React`
- Build command: `npm run build`
- Output directory: `dist`

### Step 3: Update API URL

After deployment, update frontend to use production backend URL:

Edit `frontend/src/App.jsx` or create a config file:

```javascript
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"
```

---

## Backend Deployment (Render)

### Step 1: Prepare Backend

```bash
cd backend
# Ensure all dependencies are in package.json
npm install
```

### Step 2: Create Render Account

Go to [render.com](https://render.com) and sign up.

### Step 3: Push to GitHub

```bash
cd ../
git add .
git commit -m "Initial commit: AI Cold Mail Agent"
git push origin main
```

### Step 4: Connect to Render

1. New → Web Service
2. Connect GitHub repo
3. Name: `ai-cold-mail-backend`
4. Environment: Node
5. Build command: `cd backend && npm install`
6. Start command: `node backend/server.js`

### Step 5: Set Environment Variables

In Render dashboard → Environment:

```
PORT=10000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_app_password
OPENAI_API_KEY=sk-xxxxx
DATABASE_URL=postgresql://...
```

### Step 6: Deploy

Click "Deploy" - wait 2-3 minutes.

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

### Frontend Update (Vercel)

```bash
cd frontend
git add .
git commit -m "Update features"
git push origin main
# Vercel auto-deploys
```

### Backend Update (Render)

```bash
cd backend
git add .
git commit -m "Update API"
git push origin main
# Render auto-deploys
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

### Backend Logs (Render)
- Dashboard → Logs
- Monitor errors and requests

### Frontend Performance (Vercel)
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
| Render | 750 hours/month |
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

### Render
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

Render automatically scales based on load. No configuration needed!

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
