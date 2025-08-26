import fetch from "node-fetch";

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);
    const userMessage = body.message;

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are Pixel Breeze Assistant, a friendly and professional AI that answers customer queries about services, portfolio, pricing, and contact details." },
          { role: "user", content: userMessage }
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: botReply })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "⚠️ Sorry, I couldn’t process your request right now." })
    };
  }
}
