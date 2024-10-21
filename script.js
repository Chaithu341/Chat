const socket = io();

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const groupCreation = document.getElementById('group-creation');
const groupJoining = document.getElementById('group-joining');
const chatInterface = document.getElementById('chat-interface');
const groupTitle = document.getElementById('group-title');
const roomIdDisplay = document.getElementById('room-id-display');
const chatMessages = document.getElementById('chat-messages');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-message');

// Button click handlers
document.getElementById('create-public-group').addEventListener('click', () => showGroupCreation(true));
document.getElementById('create-private-group').addEventListener('click', () => showGroupCreation(false));
document.getElementById('join-public-group').addEventListener('click', () => showGroupJoining(true));
document.getElementById('join-private-group').addEventListener('click', () => showGroupJoining(false));
document.getElementById('join-random-public-group').addEventListener('click', joinRandomPublicGroup);
document.getElementById('create-group').addEventListener('click', createGroup);
document.getElementById('join-group').addEventListener('click', joinGroup);
document.getElementById('back-to-welcome').addEventListener('click', showWelcomeScreen);
document.getElementById('back-to-welcome-join').addEventListener('click', showWelcomeScreen);
document.getElementById('leave-group').addEventListener('click', leaveGroup);
sendButton.addEventListener('click', sendMessage);

let currentRoomId = null;

function showWelcomeScreen() {
    welcomeScreen.classList.remove('hidden');
    groupCreation.classList.add('hidden');
    groupJoining.classList.add('hidden');
    chatInterface.classList.add('hidden');
}

function showGroupCreation(isPublic) {
    welcomeScreen.classList.add('hidden');
    groupCreation.classList.remove('hidden');
    document.getElementById('group-pin').classList.toggle('hidden', isPublic);
}

function showGroupJoining(isPublic) {
    welcomeScreen.classList.add('hidden');
    groupJoining.classList.remove('hidden');
    document.getElementById('join-pin').classList.toggle('hidden', isPublic);
}

function createGroup() {
    const groupName = document.getElementById('group-name').value;
    const pin = document.getElementById('group-pin').value;
    
    if (pin) {
        socket.emit('createPrivateGroup', { groupName, pin });
    } else {
        socket.emit('createPublicGroup', groupName);
    }
}

function joinGroup() {
    const roomId = document.getElementById('join-room-id').value;
    const pin = document.getElementById('join-pin').value;
    
    if (pin) {
        socket.emit('joinPrivateGroup', { roomId, pin });
    } else {
        socket.emit('joinPublicGroup', roomId);
    }
}

function joinRandomPublicGroup() {
    socket.emit('joinRandomPublicGroup');
}

function sendMessage() {
    const message = messageInput.value;
    const username = usernameInput.value || 'Anonymous';
    
    if (message && currentRoomId) {
        socket.emit('chatMessage', { roomId: currentRoomId, message, username });
        messageInput.value = '';
    }
}

function leaveGroup() {
    if (currentRoomId) {
        socket.emit('leaveRoom');
        currentRoomId = null;
        showWelcomeScreen();
        chatMessages.innerHTML = '';
    }
}

// Socket event handlers
socket.on('joinedGroup', ({ roomId, groupName, isPublic }) => {
    currentRoomId = roomId;
    showChatInterface(groupName, roomId, isPublic);
});

socket.on('message', ({ username, message }) => {
    displayMessage(`${username}: ${message}`);
});

socket.on('userLeft', ({ username }) => {
    displayMessage(`${username} has left the chat`, 'system');
});

socket.on('error', (errorMessage) => {
    alert(errorMessage);
});

function showChatInterface(groupName, roomId, isPublic) {
    welcomeScreen.classList.add('hidden');
    groupCreation.classList.add('hidden');
    groupJoining.classList.add('hidden');
    chatInterface.classList.remove('hidden');
    groupTitle.textContent = groupName;
    roomIdDisplay.textContent = `Room ID: ${roomId} (${isPublic ? 'Public' : 'Private'})`;
}

function displayMessage(text, type = 'user') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'fade-in');
    if (type === 'system') {
        messageElement.classList.add('system-message');
    }
    messageElement.textContent = text;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add tooltips
addTooltip('create-public-group', 'Create a new public chat group');
addTooltip('create-private-group', 'Create a new private chat group with a PIN');
addTooltip('join-public-group', 'Join an existing public group using its ID');
addTooltip('join-private-group', 'Join a private group using its ID and PIN');
addTooltip('join-random-public-group', 'Join a random public group');

function addTooltip(elementId, text) {
    const element = document.getElementById(elementId);
    element.classList.add('tooltip');
    const tooltip = document.createElement('span');
    tooltip.classList.add('tooltiptext');
    tooltip.textContent = text;
    element.appendChild(tooltip);
}
