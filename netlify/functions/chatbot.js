// netlify/functions/chatbotJs.js
import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` // ✅ Use environment variable
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",  // ✅ lightweight, fast model
        messages: [
          { role: "system", content: "You are PixelBot, a helpful assistant for Pixel Breeze Agency." },
          { role: "user", content: message }
        ],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I’m not sure about that.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", details: err.message }),
    };
  }
}
