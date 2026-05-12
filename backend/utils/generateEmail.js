const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateEmail(company, role, recipientName = "Hiring Manager") {
  const prompt = `
Write a professional cold email for Girish Kumar applying for an internship/full-time role.

Skills:
- React.js
- Node.js
- PostgreSQL
- Full Stack Development
- AI projects
- Cybersecurity basics

Company: ${company}
Role: ${role}
Recipient: ${recipientName}

Requirements:
- Keep it professional and concise (3-4 paragraphs)
- Personalize it based on the company and role
- Show enthusiasm for the opportunity
- Mention relevant skills
- Include a call to action
- Keep it under 200 words
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating email:", error);
    throw error;
  }
}

module.exports = generateEmail;
