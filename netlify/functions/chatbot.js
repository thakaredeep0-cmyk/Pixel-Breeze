exports.handler = async function (event, context) {
  try {
    const body = JSON.parse(event.body);
    const message = body.message.toLowerCase();

    let reply = "🤖 I'm not sure about that, but I’ll try to help!";

    // Smart replies
    if (message.includes("hello") || message.includes("hi")) {
      reply = "👋 Hello! How can I assist you today?";
    } 
    else if (message.includes("brand") || message.includes("logo")) {
      reply = "🎨 We specialize in *Brand Identity & Logo Design*! Would you like to know about our design packages?";
    } 
    else if (message.includes("website") || message.includes("web design")) {
      reply = "💻 We create responsive & modern websites. Do you want a portfolio, business, or e-commerce site?";
    } 
    else if (message.includes("marketing") || message.includes("seo") || message.includes("digital")) {
      reply = "📢 Our Digital Marketing services cover SEO, social media, and ads. Shall I share details?";
    } 
    else if (message.includes("contact") || message.includes("email") || message.includes("support")) {
      reply = "📩 You can reach us at: **pixelbreezeagency@gmail.com** or via Instagram DM.";
    } 
    else if (message.includes("thanks") || message.includes("thank you")) {
      reply = "😊 You're welcome! Always here to help.";
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "⚠️ Server error. Please try again later." }),
    };
  }
};
