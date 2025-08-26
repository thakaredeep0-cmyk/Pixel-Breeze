// netlify/functions/chatbotJs.js

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);

    const userMessage = body.message || "Hello";

    // Basic chatbot replies
    let reply;
    if (userMessage.toLowerCase().includes("hello")) {
      reply = "Hi 👋 How can I help you today?";
    } else if (userMessage.toLowerCase().includes("services")) {
      reply = "We provide digital marketing services like Social Media Marketing, Ads, SEO, and Smart Designs.";
    } else {
      reply = "I’m not sure about that, but my team at Pixel Breeze can assist you!";
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong." }),
    };
  }
};
