const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { message } = JSON.parse(event.body);

    // Simple AI-like responses (replace with real OpenAI API if you want)
    let reply = "🤖 I’m not sure about that, but I’ll try to help!";

    if (/hello|hi/i.test(message)) {
      reply = "👋 Hello! How can I assist you today?";
    } else if (/services|offer/i.test(message)) {
      reply = "📌 We offer branding, web design, and digital marketing services.";
    } else if (/contact|email/i.test(message)) {
      reply = "📧 You can reach us at: your@email.com";
    } else if (/bye|thank/i.test(message)) {
      reply = "😊 Thank you! Have a great day!";
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "⚠️ Error processing your request." })
    };
  }
};
