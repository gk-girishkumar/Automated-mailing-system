const nodemailer = require("nodemailer");

const getTransporter = (emailUser, emailPass) => {
  if (!emailUser || !emailPass) {
    throw new Error(
      "Email credentials are required. Please provide emailUser and emailPass."
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

const sendMail = async ({ to, subject, text, attachmentPath, emailUser, emailPass }) => {
  const transporter = getTransporter(emailUser, emailPass);
  const mailOptions = {
    from: emailUser,
    to,
    subject,
    text,
    attachments: attachmentPath ? [
      {
        filename: "Resume.pdf",
        path: attachmentPath,
      },
    ] : [],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendMail;
