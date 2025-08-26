// netlify/functions/chatbot.js

import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);
    const userMessage = body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",   // You can also use gpt-4 if enabled
        messages: [
          { role: "system", content: "You are a helpful assistant for Pixel Breeze Agency. Answer politely and professionally." },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: botReply }),
    };
  } catch (error) {
    console.error("Chatbot error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch response from AI" }),
    };
  }
}
