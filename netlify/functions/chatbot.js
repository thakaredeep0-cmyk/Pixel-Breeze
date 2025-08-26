import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body);

    // Call OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or gpt-4 if enabled
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    // Extract bot reply
    const botReply = data.choices?.[0]?.message?.content || "Sorry, I couldn’t understand that.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: botReply }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Error: " + error.message }),
    };
  }
}
