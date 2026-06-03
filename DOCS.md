# 📚 Documentation Index

## Getting Started
- [QUICKSTART.md](./QUICKSTART.md) - 5-minute setup guide
- [README.md](./README.md) - Complete project documentation

## Backend
- `backend/server.js` - Express server entry point
- `backend/routes/` - API endpoints
  - `uploadRoute.js` - CSV upload handler
  - `sendRoute.js` - Email sending handler
- `backend/utils/` - Utility functions
  - `sendMail.js` - Nodemailer configuration
  - `generateEmail.js` - OpenAI integration
- `backend/.env.example` - Environment template

## Frontend
- `frontend/src/App.jsx` - Main app component
- `frontend/src/components/`
  - `UploadCSV.jsx` - CSV upload component
  - `SendEmails.jsx` - Email sending interface
- `frontend/vite.config.js` - Vite configuration

## Database
- `database/schema.sql` - PostgreSQL schema

## Configuration Files
- `.env` - Environment variables (create this)
- `.gitignore` - Git ignore rules
- `package.json` - Root package (npm run commands)

---

## 🎯 Build Timeline

### Day 1: Foundation
- [x] Create project structure
- [x] Set up backend with Express
- [x] Create database schema
- [ ] Install dependencies
- [ ] Test CSV upload

### Day 2: AI Integration
- [ ] Integrate OpenAI API
- [ ] Test email generation
- [ ] Fix any API issues

### Day 3: Frontend
- [ ] Build React components
- [ ] Create upload interface
- [ ] Create email dashboard

### Day 4: Integration & Testing
- [ ] Connect frontend to backend
- [ ] End-to-end testing
- [ ] Bug fixes

### Day 5: Deployment
- [ ] Deploy backend (Render/Railway)
- [ ] Deploy frontend (Vercel)
- [ ] Production testing

---

## 💻 Commands Cheat Sheet

```bash
# Install all dependencies
npm run install-all

# Start backend
cd backend && npm run dev

# Start frontend
cd frontend && npm run dev

# Test backend
curl http://localhost:5000

# Create database
createdb cold_mail_agent

# Load schema
psql cold_mail_agent < database/schema.sql
```

---

## 🔗 Important Links

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [OpenAI API](https://platform.openai.com/docs)
- [Nodemailer Docs](https://nodemailer.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Neon Database](https://neon.tech)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

---

## 📋 Checklist Before Launching

- [ ] Backend `.env` configured
- [ ] OpenAI API key obtained
- [ ] Gmail App Password set up
- [ ] Database created and schema loaded
- [ ] Dependencies installed
- [ ] Both servers running
- [ ] CSV upload tested
- [ ] Email generation tested
- [ ] Full integration tested
- [ ] Deployed to production

---

## 🚀 Quick Deploy

### Frontend on Netlify
```bash
cd frontend
npm install
npm run build
netlify deploy --prod --dir=dist
```

Set `VITE_API_URL` to your Vercel backend URL in Netlify site environment variables.

### Backend on Vercel
1. Push code to GitHub
2. Connect repo to Vercel
3. Add `EMAIL_USER`, `EMAIL_PASS`, `OPENAI_API_KEY`, `DATABASE_URL`
4. Deploy

---

## 📞 Troubleshooting

See the main README.md for detailed troubleshooting guide.
