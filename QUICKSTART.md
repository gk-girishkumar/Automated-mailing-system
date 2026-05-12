# Getting Started Guide

## Quick Start (5 minutes)

### 1. Install Dependencies

```bash
# From root directory
npm run install-all
```

Or separately:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Set Up Environment

#### Backend Configuration

Create `backend/.env`:

```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_app_password
OPENAI_API_KEY=sk-xxxxx
DATABASE_URL=postgresql://localhost/cold_mail_agent
```

#### Frontend Configuration

No additional setup needed! The frontend uses Vite with automatic proxy to backend.

### 3. Database Setup

```bash
# Create local database
createdb cold_mail_agent

# Apply schema
psql cold_mail_agent < database/schema.sql
```

Or use Neon (recommended):
- Visit [neon.tech](https://neon.tech)
- Create project
- Copy connection string to `backend/.env`
- Run: `psql "your_neon_url" < database/schema.sql`

### 4. Start Development

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

### 5. Test It

1. Open http://localhost:5173
2. Create sample CSV:
   ```csv
   company,role,email
   TestCorp,Developer,test@example.com
   ```
3. Upload CSV
4. Send test email

---

## 🔑 Required API Keys

### OpenAI API Key
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create account
3. Get API key
4. Add to `.env` as `OPENAI_API_KEY=sk-xxx`

### Gmail App Password
1. [Go to Google Account](https://myaccount.google.com)
2. Security
3. 2-Step Verification (enable if needed)
4. App passwords
5. Select "Mail" and "Windows Computer"
6. Copy password to `.env` as `EMAIL_PASS=xxx`

---

## 📁 Key Files to Edit

### Customize AI Emails
Edit: `backend/utils/generateEmail.js`
- Change your skills
- Adjust tone
- Add company-specific logic

### Database Connection
Edit: `backend/.env`
- Update DATABASE_URL for production

### Frontend Branding
Edit: `frontend/src/App.jsx`
- Change title and colors

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` in the directory |
| Gmail auth fails | Use App Password, not regular password |
| OpenAI error | Check API key, verify quota |
| CORS error | Ensure backend is running on 5000 |
| CSV upload fails | Verify CSV format (company, role, email) |

---

## 📊 Testing

### Test Endpoints with cURL

```bash
# Test server
curl http://localhost:5000

# Upload CSV (requires actual file)
curl -X POST -F "file=@companies.csv" http://localhost:5000/api/upload

# Send emails (requires actual file)
curl -X POST \
  -F "resume=@resume.pdf" \
  -F 'companies=[{"company":"Test","email":"test@example.com","role":"Dev"}]' \
  http://localhost:5000/api/send
```

---

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Set up `.env`
3. ✅ Create database
4. ✅ Start servers
5. ✅ Test CSV upload
6. ✅ Send test email
7. ✅ Build your campaign

---

## 📞 Support

Check the main README.md for detailed documentation and troubleshooting.
