import OpenAI from "openai";

export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // set this in Netlify Environment Variables
    });

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are PixelBot, a helpful assistant for Pixel Breeze Agency. You provide information about services like digital marketing, social media marketing, ad campaigns, and design." },
        { role: "user", content: body.message }
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: response.choices[0].message.content,
      }),
    };

  } catch (error) {
    console.error("Error in chatbot function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: "Sorry, something went wrong. Please try again later.",
      }),
    };
  }
}
