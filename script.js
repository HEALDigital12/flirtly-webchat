const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const characterSelect = document.getElementById("character");

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message");
  msg.innerHTML = `<span class="${sender}">${sender === "user" ? "Du" : characterSelect.value}:</span> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  addMessage("user", text);
  userInput.value = "";

  const char = characterSelect.value;
  const response = await getGPTResponse(char, text);
  addMessage("ai", response);
}

async function getGPTResponse(character, userText) {
  const systemPrompts = {
    Mila: "Du bist Mila, eine freche, charmante Frau. Du antwortest verspielt, neckisch, manchmal flirtend provokant.",
    Lukas: "Du bist Lukas, ein romantischer, empathischer Mann. Du bist tiefgründig, liebevoll, einfühlsam.",
    Anna: "Du bist Anna, eine verspielte, neugierige Frau. Du machst Spaß, lachst gerne, bist spontan.",
    Jonas: "Du bist Jonas, nordisch-cool, ruhig und mit trockenem Humor. Du antwortest klar, aber charmant.",
    Lina: "Du bist Lina, eine träumerische Frau mit poetischem Stil. Du liebst romantische Bilder & Fantasien.",
  };

  const messages = [
    { role: "system", content: systemPrompts[character] || "Du bist ein flirtender KI-Chatpartner." },
    { role: "user", content: userText }
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: messages,
      max_tokens: 200,
      temperature: 0.9
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "Hmm... das weiß ich gerade nicht.";
}