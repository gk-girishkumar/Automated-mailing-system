const express = require("express");
const multer = require("multer");
const sendMail = require("../utils/sendMail");
const generateEmail = require("../utils/generateEmail");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { companies } = req.body;
    const resumePath = req.file ? req.file.path : null;

    if (!companies || !Array.isArray(companies) || companies.length === 0) {
      return res.status(400).json({ error: "Companies array is required" });
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
        const emailBody = await generateEmail(
          company.company,
          company.role || "Internship/Full-Time Role",
          company.contact_name || "Hiring Manager"
        );

        // Send email
        const mailResult = await sendMail({
          to: company.email,
          subject: `Application for ${company.role || "Opportunity"}`,
          text: emailBody,
          attachmentPath: resumePath,
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
  }
});

module.exports = router;
