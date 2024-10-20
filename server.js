const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Store connected users
const users = new Map();

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle user joining
    socket.on('join', (username) => {
        users.set(socket.id, username);
        io.emit('userJoined', {
            message: `${username} joined the chat`,
            timestamp: new Date().toISOString()
        });
    });

    // Handle chat messages
    socket.on('chatMessage', (message) => {
        const username = users.get(socket.id);
        io.emit('message', {
            username,
            message,
            timestamp: new Date().toISOString()
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        const username = users.get(socket.id);
        if (username) {
            io.emit('userLeft', {
                message: `${username} left the chat`,
                timestamp: new Date().toISOString()
            });
            users.delete(socket.id);
        }
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});