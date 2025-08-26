import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are Pixel Breeze Agency's AI assistant. Answer queries professionally about services, portfolio, contact info, and general help." },
          { role: "user", content: message }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };

  } catch (error) {
    console.error("Chatbot error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "⚠️ Sorry, something went wrong with AI response." })
    };
  }
}
