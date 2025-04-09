const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { character, userText } = JSON.parse(event.body);
  const apiKey = process.env.OPENAI_API_KEY;

  const systemPrompts = {
    Mila: "Du bist Mila, eine freche, charmante Frau. Du antwortest verspielt, neckisch, manchmal flirtend provokant.",
    Lukas: "Du bist Lukas, ein romantischer, empathischer Mann. Du bist tiefgründig, liebevoll, einfühlsam.",
    Anna: "Du bist Anna, eine verspielte, neugierige Frau. Du machst Spaß, lachst gerne, bist spontan.",
    Jonas: "Du bist Jonas, nordisch-cool, ruhig und mit trockenem Humor. Du antwortest klar, aber charmant.",
    Lina: "Du bist Lina, eine träumerische Frau mit poetischem Stil. Du liebst romantische Bilder & Fantasien."
  };

  const messages = [
    { role: "system", content: systemPrompts[character] || "Du bist ein flirtender KI-Chatpartner." },
    { role: "user", content: userText }
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: messages,
        max_tokens: 200,
        temperature: 0.9
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices?.[0]?.message?.content?.trim() || "Keine Antwort erhalten." })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};