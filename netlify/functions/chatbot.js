// netlify/functions/chatbotJs.js
const OpenAI = require("openai");

exports.handler = async function (event, context) {
  try {
    const { message } = JSON.parse(event.body);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // or "gpt-4o-mini"
      messages: [{ role: "user", content: message }],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: response.choices[0].message.content,
      }),
    };

  } catch (error) {
    console.error("Chatbot error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "⚠️ Error: " + error.message }),
    };
  }
};
