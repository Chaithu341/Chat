const socket = io();

// DOM Elements
const joinForm = document.getElementById('join-form');
const chatContainer = document.getElementById('chat-container');
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-btn');
const usernameInput = document.getElementById('username');
const joinButton = document.getElementById('join-btn');
const userDisplay = document.getElementById('user-display');

let username = '';

// Join Chat Handler
joinButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        socket.emit('join', username);
        joinForm.classList.add('hidden');
        chatContainer.classList.remove('hidden');
        userDisplay.textContent = `Logged in as: ${username}`;
    }
});

// Send Message Handler
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chatMessage', message);
        messageInput.value = '';
    }
}

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Socket Event Handlers
socket.on('message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    const time = new Date(data.timestamp).toLocaleTimeString();
    messageElement.innerHTML = `
        <div class="meta">
            <span class="username">${data.username}</span>
            <span class="time">${time}</span>
        </div>
        <div class="text">${data.message}</div>
    `;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

socket.on('userJoined', (data) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'system-message');
    messageElement.textContent = data.message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

socket.on('userLeft', (data) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'system-message');
    messageElement.textContent = data.message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});