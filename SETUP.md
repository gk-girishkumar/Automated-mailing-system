# 🛠️ Installation & Development Guide

## Prerequisites Check

Before starting, ensure you have:
- [ ] Node.js v14+ installed: `node --version`
- [ ] npm installed: `npm --version`
- [ ] PostgreSQL installed OR Neon account
- [ ] Git installed: `git --version`
- [ ] VS Code or IDE of choice

## Step 1: Clone or Download

```bash
cd "g:\Projects\automatic mailing agent"
git init
git config user.email "you@example.com"
git config user.name "Your Name"
```

## Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

Wait for installation to complete.

## Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

This may take a few minutes.

## Step 4: Create Environment File

```bash
cd ../backend
cp .env.example .env
```

Then edit `backend/.env` with your credentials:

```env
PORT=5000

# Gmail - Get app password from Google Account
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=xxxx_xxxx_xxxx_xxxx

# OpenAI - Get from platform.openai.com
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx

# Database - Local or Neon
DATABASE_URL=postgresql://localhost/cold_mail_agent
```

## Step 5: Set Up Database

### Option A: Local PostgreSQL

```bash
# Create database
createdb cold_mail_agent

# Load schema
psql cold_mail_agent < database/schema.sql

# Verify
psql cold_mail_agent -c "\dt"
```

### Option B: Neon (Recommended)

1. Go to [neon.tech](https://neon.tech)
2. Create account
3. Create new project
4. Copy connection string
5. Paste into `backend/.env` as `DATABASE_URL`
6. Run: `psql "your_neon_connection_string" < database/schema.sql`

## Step 6: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.0.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

## Step 7: Test the Application

1. Open http://localhost:5173 in your browser
2. You should see the AI Cold Mail Agent dashboard

### Test CSV Upload

1. Click "Upload CSV" tab
2. Click file input
3. Select `sample-companies.csv` (in root directory)
4. Click "Upload CSV"
5. Should see: "Upload Successful! Records: 10"

### Test Email Sending

⚠️ **Optional**: Only if you want to send real emails

1. Click "Send Emails" tab
2. Upload a resume (PDF)
3. Manually enter 1 test company
4. Click "Send Emails"
5. Check email inbox

## 🎯 Project Structure Review

```
automatic mailing agent/
├── backend/              ← Express server
│   ├── routes/          ← API endpoints
│   ├── utils/           ← Helpers
│   ├── uploads/         ← Temp files
│   └── server.js
├── frontend/            ← React app
│   ├── src/
│   │   ├── components/
│   │   └── App.jsx
│   └── index.html
├── database/            ← SQL schema
├── README.md            ← Full documentation
├── QUICKSTART.md        ← Quick setup
└── package.json         ← Root commands
```

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] CSV upload works
- [ ] No console errors
- [ ] Database connected
- [ ] Tailwind CSS styling visible

## 🚀 Next: Customization

Edit these files to customize:
- `backend/utils/generateEmail.js` - Change your skills/bio
- `frontend/src/App.jsx` - Change colors/title
- `backend/routes/sendRoute.js` - Customize email behavior

## 📚 Learning Path

1. **Day 1**: Understand project structure
2. **Day 2**: Learn how CSV upload works
3. **Day 3**: Understand AI email generation
4. **Day 4**: Add your own features
5. **Day 5**: Deploy to production

## 🐛 Stuck? Check These:

| Error | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in `.env` |
| Module not found | Run `npm install` again |
| OpenAI error | Verify API key in `.env` |
| Database connection failed | Check DATABASE_URL |
| CORS error | Ensure backend is running |

## 🎓 What You'll Learn

✅ Full-stack development
✅ React.js with Hooks
✅ Node.js/Express.js
✅ PostgreSQL databases
✅ API integration (OpenAI)
✅ Email automation
✅ Deployment

## 🚀 Ready to Build?

Start with [QUICKSTART.md](./QUICKSTART.md) for a 5-minute setup!
