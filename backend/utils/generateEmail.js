const OpenAI = require("openai");

let openai = null;

function initializeOpenAI() {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

// Fallback: template-based professional cold email
function generateTemplateEmail(company, role, recipientName = "Hiring Manager") {
  return `Dear ${recipientName},

I hope this message finds you well. My name is Girish Kumar, and I am reaching out to express my strong interest in the ${role} position at ${company}.

I am a full-stack developer with hands-on experience in React.js, Node.js, and PostgreSQL, along with a passion for building AI-powered applications and a foundational understanding of cybersecurity. I have worked on several end-to-end projects that demonstrate my ability to design, develop, and deploy scalable web solutions.

I am particularly excited about the opportunity at ${company} because I believe my skill set aligns well with your team's goals, and I am eager to contribute meaningfully from day one. I am a fast learner, a collaborative team player, and someone who takes ownership of problems end-to-end.

I have attached my resume for your reference. I would love the opportunity to discuss how I can add value to your team. Please feel free to reach out at your convenience.

Thank you for your time and consideration.

Best regards,
Girish Kumar
gky.girishkumar@gmail.com`;
}

async function generateEmail(company, role, recipientName = "Hiring Manager", customPrompt = "") {
  const client = initializeOpenAI();

  // Try OpenAI first if key is available
  if (client) {
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

${customPrompt ? `Additional Instructions from User:\n${customPrompt}\n` : ''}
Requirements:
- Keep it professional and concise (3-4 paragraphs)
- Personalize it based on the company and role
- Show enthusiasm for the opportunity
- Mention relevant skills
- Include a call to action
- Keep it under 200 words
${customPrompt ? "- Follow the additional instructions provided by the user above." : ""}
`;

    try {
      const response = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      });
      return response.choices[0].message.content;
    } catch (error) {
      // If quota exceeded or auth error, fall back to template
      if (error.status === 429 || error.status === 401 || error.code === "insufficient_quota") {
        console.warn(`OpenAI unavailable (${error.status}), using template fallback for ${company}`);
        return generateTemplateEmail(company, role, recipientName);
      }
      throw error; // Re-throw unexpected errors
    }
  }

  // No OpenAI key — use template directly
  console.warn("No OPENAI_API_KEY set, using template fallback");
  return generateTemplateEmail(company, role, recipientName);
}

module.exports = generateEmail;
