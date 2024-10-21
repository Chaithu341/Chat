const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for rooms
const rooms = {
  public: {},
  private: {}
};

function generateRoomId() {
  return crypto.randomBytes(4).toString('hex');
}

io.on('connection', (socket) => {
  console.log('New user connected');

  let currentRoom = null;
  let currentUsername = null;

  // Handle creating a public group
  socket.on('createPublicGroup', (groupName) => {
    const roomId = generateRoomId();
    rooms.public[roomId] = { name: groupName, users: {} };
    joinRoom(roomId, true);
  });

  // Handle creating a private group
  socket.on('createPrivateGroup', ({ groupName, pin }) => {
    const roomId = generateRoomId();
    rooms.private[roomId] = { name: groupName, pin, users: {} };
    joinRoom(roomId, false);
  });

  // Handle joining a public group
  socket.on('joinPublicGroup', (roomId) => {
    if (rooms.public[roomId]) {
      joinRoom(roomId, true);
    } else {
      socket.emit('error', 'Public group not found');
    }
  });

  // Handle joining a private group
  socket.on('joinPrivateGroup', ({ roomId, pin }) => {
    if (rooms.private[roomId] && rooms.private[roomId].pin === pin) {
      joinRoom(roomId, false);
    } else {
      socket.emit('error', 'Invalid room ID or PIN');
    }
  });

  // Handle joining a random public group
  socket.on('joinRandomPublicGroup', () => {
    const publicRoomIds = Object.keys(rooms.public);
    if (publicRoomIds.length > 0) {
      const randomRoomId = publicRoomIds[Math.floor(Math.random() * publicRoomIds.length)];
      joinRoom(randomRoomId, true);
    } else {
      socket.emit('error', 'No public groups available');
    }
  });

  // Handle chat messages
  socket.on('chatMessage', ({ roomId, message, username }) => {
    currentUsername = username;
    io.to(roomId).emit('message', { username, message });
  });

  // Handle user leaving a room
  socket.on('leaveRoom', () => {
    if (currentRoom) {
      socket.leave(currentRoom);
      io.to(currentRoom).emit('userLeft', { username: currentUsername || 'Anonymous' });
      currentRoom = null;
      currentUsername = null;
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
    if (currentRoom) {
      io.to(currentRoom).emit('userLeft', { username: currentUsername || 'Anonymous' });
    }
  });

  function joinRoom(roomId, isPublic) {
    if (currentRoom) {
      socket.leave(currentRoom);
    }
    socket.join(roomId);
    currentRoom = roomId;
    const roomType = isPublic ? 'public' : 'private';
    const roomName = rooms[roomType][roomId].name;
    socket.emit('joinedGroup', { roomId, groupName: roomName, isPublic });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
