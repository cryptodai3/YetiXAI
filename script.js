// Toggle light/dark mode & persist choice
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// On load, apply saved theme
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
});

// Placeholder: X login
function loginWithX() {
  // implement OAuth flow here
  updateStatus('Logging in with X…');
}

// Placeholder: Wallet connect
function connectWallet() {
  // implement Web3 wallet connection here
  updateStatus('Connecting wallet…');
}

function updateStatus(msg) {
  document.getElementById('status-message').textContent = msg;
}

// Chatbot form handling
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatContainer = document.getElementById('chat-container');

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userText = chatInput.value.trim();
  if (!userText) return;

  appendMessage(userText, 'user');
  chatInput.value = '';

  // call your AI endpoint
  const botReply = await sendToBot(userText);
  appendMessage(botReply, 'bot');
  chatContainer.scrollTop = chatContainer.scrollHeight;
});

function appendMessage(text, who) {
  const div = document.createElement('div');
  div.className = `chat-message ${who}`;
  div.textContent = text;
  chatContainer.append(div);
}

// Replace URL and payload to match your backend
async function sendToBot(message) {
  try {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    if (!resp.ok) throw new Error('Network error');
    const { reply } = await resp.json();
    return reply;
  } catch (err) {
    console.error(err);
    return 'Oops, something went wrong. Try again later.';
  }
}
