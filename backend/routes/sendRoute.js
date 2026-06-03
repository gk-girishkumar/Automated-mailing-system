const express = require("express");
const multer = require("multer");
const fs = require("fs");
const os = require("os");
const path = require("path");
const sendMail = require("../utils/sendMail");

const uploadDir = path.join(os.tmpdir(), "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

// Lazy load generateEmail to avoid OpenAI initialization errors at startup
let generateEmail;

const getGenerateEmail = () => {
  if (!generateEmail) {
    generateEmail = require("../utils/generateEmail");
  }
  return generateEmail;
};

const router = express.Router();

const upload = multer({ dest: uploadDir });

router.post("/", upload.single("resume"), async (req, res) => {
  let resumePath = req.file ? req.file.path : null;

  try {
    let companies = req.body.companies;
    const emailUser = req.body.emailUser;
    const emailPass = req.body.emailPass;
    const customPrompt = req.body.customPrompt || "";

    // companies is sent as a JSON string via FormData — parse it
    if (typeof companies === "string") {
      try {
        companies = JSON.parse(companies);
      } catch (e) {
        return res.status(400).json({ error: "Invalid companies JSON" });
      }
    }

    if (!companies || !Array.isArray(companies) || companies.length === 0) {
      return res.status(400).json({ error: "Companies array is required" });
    }

    if (!emailUser || !emailPass) {
      return res.status(400).json({ error: "Email credentials are required" });
    }

    const results = [];
    const errors = [];

    for (const company of companies) {
      try {
        if (!company.email || !company.company) {
          errors.push({
            company: company.company,
            error: "Missing email or company name",
          });
          continue;
        }

        // Generate personalized email
        const emailBody = await getGenerateEmail()(
          company.company,
          company.role || "Internship/Full-Time Role",
          company.contact_name || "Hiring Manager",
          customPrompt
        );

        // Send email
        const mailResult = await sendMail({
          to: company.email,
          subject: `Application for ${company.role || "Opportunity"}`,
          text: emailBody,
          attachmentPath: resumePath,
          emailUser,
          emailPass,
        });

        results.push({
          company: company.company,
          email: company.email,
          status: "sent",
          timestamp: new Date(),
        });

        console.log(`Email sent to ${company.email}`);
      } catch (error) {
        errors.push({
          company: company.company,
          email: company.email,
          error: error.message,
        });
      }
    }

    res.json({
      message: "Email sending complete",
      sent: results.length,
      failed: errors.length,
      results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    if (resumePath) {
      fs.unlink(resumePath, (unlinkError) => {
        if (unlinkError) {
          console.warn("Failed to delete temporary resume:", unlinkError.message);
        }
      });
    }
  }
});

module.exports = router;
