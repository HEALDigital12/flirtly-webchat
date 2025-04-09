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
  const response = await getAIResponse(char, text);
  addMessage("ai", response);
}

async function getAIResponse(character, userText) {
  if (character === "Mila") return "Oh, du bist ja ganz schön mutig... Ich mag das.";
  if (character === "Lukas") return "Das klingt wirklich schön. Erzähl mir mehr über dich.";
  if (character === "Anna") return "Haha! Du bringst mich zum Lachen. Noch so ein Spruch?";
  if (character === "Jonas") return "Klingt interessant. Aber ich höre lieber als ich rede.";
  if (character === "Lina") return "Wie in einem Traum... Stell dir vor, wir wären an einem See bei Mondschein.";
  return "Erzähl mir mehr!";
}