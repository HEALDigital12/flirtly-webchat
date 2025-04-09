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

  const character = characterSelect.value;
  try {
    const res = await fetch("/.netlify/functions/gptchat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ character, userText: text })
    });

    const data = await res.json();
    addMessage("ai", data.reply || "Ups… keine Antwort erhalten.");
  } catch (err) {
    addMessage("ai", "Fehler bei der GPT-Antwort.");
    console.error(err);
  }
}