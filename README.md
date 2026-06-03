# 🚀 AI Cold Mail Automation Agent

An intelligent full-stack application for automating personalized cold email campaigns. Upload a list of companies, let AI generate personalized emails, and send them automatically to your target recipients.

## 📋 Features

### ✅ Version 1 (Current MVP)
- **CSV Upload**: Upload company data from CSV files
- **AI Email Generation**: Uses OpenAI to create personalized emails
- **Bulk Email Sending**: Send emails to multiple recipients automatically
- **Resume Attachment**: Attach your resume to every email
- **Email Tracking**: Track which emails were sent and their status
- **Simple Dashboard**: View all sent emails and their status

### 🚀 Future Features (V2+)
- Email open tracking with pixel tracking
- Follow-up automation (automatic reminder emails)
- AI personalization from company websites
- Email scheduling for optimal delivery times
- Multi-user support
- Subscription-based SaaS
- Resume ATS analysis
- AI resume optimization

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React.js + Tailwind CSS + Vite |
| **Backend** | Node.js + Express.js |
| **Database** | PostgreSQL (Neon recommended) |
| **Email** | Nodemailer (Gmail) |
| **AI** | OpenAI API (GPT-3.5-turbo) |
| **File Upload** | Multer |
| **CSV Parsing** | csv-parser |

---

## 📁 Project Structure

```
ai-cold-mail-agent/
│
├── backend/
│   ├── routes/
│   │   ├── uploadRoute.js      # CSV upload endpoint
│   │   └── sendRoute.js        # Email sending endpoint
│   ├── utils/
│   │   ├── sendMail.js         # Nodemailer configuration
│   │   └── generateEmail.js    # OpenAI email generation
│   ├── uploads/                # Temporary file storage
│   ├── server.js               # Express server
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadCSV.jsx   # CSV upload component
│   │   │   └── SendEmails.jsx  # Email sending component
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── database/
│   └── schema.sql              # Database schema
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- PostgreSQL database (local or Neon)
- OpenAI API key
- Gmail account with 2FA enabled

### 1. Backend Setup

```bash
cd backend
npm install
```

#### Create `.env` file

```env
PORT=5000

# Gmail Configuration (App Password required)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_app_password

# OpenAI API
OPENAI_API_KEY=sk-xxxxxxxxxx

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/cold_mail_agent
```

#### Gmail App Password Setup
1. Go to [Google Account](https://myaccount.google.com)
2. Security → 2-Step Verification
3. App passwords
4. Select "Mail" and "Windows Computer"
5. Copy the generated password to `.env`

#### Start Backend
```bash
npm run dev
```

Server runs on `http://localhost:5000`

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

### 3. Database Setup

#### Using Neon (Recommended)
1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string to `backend/.env`
4. Run schema:

```bash
psql "your_database_url" < database/schema.sql
```

#### Using Local PostgreSQL
```bash
createdb cold_mail_agent
psql cold_mail_agent < database/schema.sql
```

---

## 📖 How to Use

### 1. Prepare CSV File

Create a CSV with the following columns:

```csv
company,role,email,contact_name
Acme Corp,Full Stack Developer,jobs@acme.com,John Doe
Tech Startup,React Developer,hiring@techstartup.com,Jane Smith
BigTech,AI Engineer,careers@bigtech.com,Mike Johnson
```

**Required Columns:**
- `company` - Company name
- `email` - Contact email address

**Optional Columns:**
- `role` - Position title
- `contact_name` - Recipient name

### 2. Upload CSV & Resume

1. Open frontend at `http://localhost:5173`
2. Click "Upload CSV" tab
3. Select your CSV file
4. Click "Upload CSV"
5. Verify the data

### 3. Send Emails

1. Click "Send Emails" tab
2. Upload your resume (PDF)
3. Add companies manually OR paste from CSV upload
4. Review the information
5. Click "Send Emails"
6. Monitor progress

---

## 🤖 AI Email Generation

The system generates personalized emails based on:

**Your Skills:**
- React.js
- Node.js
- PostgreSQL
- Full Stack Development
- AI projects
- Cybersecurity basics

**Customization:**
Edit `backend/utils/generateEmail.js` to:
- Change your skills
- Adjust tone (professional, enthusiastic, etc.)
- Add company-specific research
- Include specific achievements

---

## 📊 API Endpoints

### Upload CSV
```
POST /api/upload
Content-Type: multipart/form-data

Body:
- file: CSV file

Response:
{
  "message": "File uploaded successfully",
  "count": 3,
  "data": [...]
}
```

### Send Emails
```
POST /api/send
Content-Type: multipart/form-data

Body:
- resume: PDF file
- companies: JSON array

Response:
{
  "message": "Email sending complete",
  "sent": 3,
  "failed": 0,
  "results": [...]
}
```

---

## 🔐 Security Best Practices

1. **Never commit `.env`** - Add to `.gitignore`
2. **Use Gmail App Passwords** - Never use your actual password
3. **Validate input** - All user inputs are validated
4. **CORS Protection** - Configure allowed origins
5. **Rate Limiting** - Add limits to prevent abuse
6. **Resume Security** - Store securely, auto-delete after sending

---

## 📈 Performance Tips

1. **Batch Sending** - Send emails in batches of 10-20
2. **Rate Limiting** - Add delays between emails (1-2 seconds)
3. **Database Indexes** - Already included in schema
4. **Image Optimization** - Compress attachments
5. **Error Handling** - Retry failed emails automatically

---

## 🐛 Troubleshooting

### Emails Not Sending
- ✅ Check Gmail app password in `.env`
- ✅ Enable "Less secure apps" access
- ✅ Check OpenAI API key validity
- ✅ Verify email addresses are correct

### CSV Upload Error
- ✅ Use comma-separated format
- ✅ Include headers in first row
- ✅ No special characters in company names
- ✅ Valid email addresses

### OpenAI Error
- ✅ Check API key is valid
- ✅ Verify API quota not exceeded
- ✅ Check rate limits

---

## 📚 Sample CSV Format

```csv
company,role,email,contact_name
Google,Full Stack Engineer,careers@google.com,Hiring Team
Microsoft,Cloud Developer,jobs@microsoft.com,Rebecca
Amazon,SDE Internship,careers@amazon.com,AWS Team
Meta,React Developer,jobs@meta.com,Engineering
Apple,Systems Engineer,careers@apple.com,Talent Team
```

---

## 🎯 Resume Description

### For Your Resume:

**AI Cold Mail Automation Agent**

Built an AI-powered full-stack web application that automates personalized cold email generation and bulk email sending for internship/job applications. Integrated OpenAI APIs for intelligent email content generation, Nodemailer for Gmail automation, CSV parsing for company management, and PostgreSQL for tracking email campaign metrics and performance analytics.

**Tech Stack:** React.js, Node.js, Express.js, PostgreSQL, OpenAI API, Nodemailer, Tailwind CSS

**Key Features:**
- Automated CSV import and data validation
- AI-generated personalized emails with company/role context
- Bulk email sending with resume attachments
- Email delivery and engagement tracking
- Professional dashboard for campaign monitoring

---

## 🚀 Deployment

### Frontend (Netlify)
```bash
cd frontend
npm install
npm run build
netlify deploy --prod --dir=dist
```

Set `VITE_API_URL` in Netlify site settings to your Vercel backend URL.

### Backend (Vercel)
```bash
cd backend
npm install
vercel
```

Choose `Other` for the framework preset and use `npm install` as the build command.

---

## 📝 Build Timeline

**Day 1:** Backend setup, Nodemailer, CSV upload
**Day 2:** AI email generation, testing
**Day 3:** Frontend UI, dashboard
**Day 4:** Full integration, bug fixes
**Day 5:** Deployment, optimization

---

## 🤝 Contributing

Contributions welcome! Please follow the existing code style and add tests for new features.

---

## 📄 License

MIT License - feel free to use this for your projects!

---

## 💡 Next Steps

1. Set up all environment variables
2. Install dependencies
3. Create database
4. Test CSV upload
5. Test email generation
6. Send test batch
7. Monitor results
8. Deploy to production

---

## 🎓 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [OpenAI API](https://platform.openai.com/docs)
- [Nodemailer Guide](https://nodemailer.com/about/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)

---

## 📧 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API responses and logs
3. Test with a single email first
4. Verify all environment variables

Good luck with your cold email campaigns! 🚀
