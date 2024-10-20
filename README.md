# Lightweight Chat Application

## Project Overview

The Lightweight Chat Application enables users to join chat rooms using a display name, interact with others in real-time, and exchange messages instantly. This project focuses on simplicity and real-time interaction using Socket.IO, which creates live connections between clients and the server.

## Project Structure

The project consists of four key files:

- **index.html**: Contains the structure of the chat interface, including a form for entering a display name and a chat area for sending/receiving messages.
- **styles.css**: Styles the application interface, ensuring that the UI is clean and user-friendly.
- **script.js**: Manages client-side logic, including event handling for sending messages, receiving updates, and connecting to the server.
- **server.js**: Implements the Node.js server using Express and Socket.IO to handle real-time communication between users.

## Key Features

- **Dynamic User Names**: Users personalize their chat experience by entering a display name.
- **Real-Time Messaging**: Messages are sent and received instantly, creating a smooth and responsive user experience.
- **Simple Interface**: The chat UI is intuitive, making it easy for users to navigate.
- **Event Handling**: User actions (sending and receiving messages) are handled efficiently, with updates appearing in real-time.
- **Socket.IO**: WebSockets maintain a live, persistent connection for instant messaging between users.

## Algorithm

1. **Initialize Server**
   - Start the Node.js server using Express.
   - Integrate Socket.IO to handle real-time communication between clients and the server.

2. **Serve Static Files**
   - Use Express to serve `index.html`, `styles.css`, and `script.js` to the client.

3. **Handle User Connection**
   - When a user connects to the server:
     - Log the connection event.
     - Wait for the user to provide a display name.

4. **User Joins Chat**
   - Once the display name is provided:
     - Store the name in the user's session or socket.
     - Broadcast to other users that a new user has joined.

5. **Send and Receive Messages**
   - When a user sends a message:
     - Capture the message and display name.
     - Emit the message to all connected users via Socket.IO.
   - When a message is received by a client:
     - Display the message along with the sender’s display name in the chat interface.

6. **Display Messages**
   - Append new messages in real-time to the chat area for all users, ensuring a live chat experience.

7. **Handle User Disconnection**
   - If a user disconnects:
     - Log the disconnection event.
     - Optionally notify other users that a user has left the chat room.

8. **End**
   - The chat continues to run, allowing users to send/receive messages until they manually disconnect.

## Detailed Flow

### User Interface (`index.html`)

- The user opens the webpage and is prompted to enter a display name.
- Clicking “Start Chat” hides the input and shows the chat area, enabling the user to start chatting.

### Server Interaction (`server.js`)

- When the user connects, the server listens for their messages.
- Upon receiving a message, the server broadcasts it to all users connected to the chat.

### Messaging and Real-Time Updates (`script.js`)

- Users can type messages into an input field and submit them by pressing “Send.”
- The server handles broadcasting the message to all users in real-time, which appears in their chat area.

### Session Management (Socket.IO)

- Each user is managed using a session created by Socket.IO without needing a traditional database.
- When a user disconnects, their session is cleared, and the server can notify others.
