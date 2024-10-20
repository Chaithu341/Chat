# Lightweight Chat Application

## Project Overview

The Lightweight Chat Application enables users to join chat rooms using a display name, interact with others in real-time, and exchange messages instantly. This project focuses on simplicity and real-time interaction using Socket.IO, which creates live connections between clients and the server.

## Project Structure

The project consists of four key files:

1. **index.html**: Contains the structure of the chat interface, including a form for entering a display name and a chat area for sending/receiving messages.
2. **styles.css**: Styles the application interface, ensuring that the UI is clean and user-friendly.
3. **script.js**: Manages client-side logic, including event handling for sending messages, receiving updates, and connecting to the server.
4. **server.js**: Implements the Node.js server using Express and Socket.IO to handle real-time communication between users.

## Key Features

- **Dynamic User Names**: Users personalize their chat experience by entering a display name.
- **Real-Time Messaging**: Messages are sent and received instantly, creating a smooth and responsive user experience.
- **Simple Interface**: The chat UI is intuitive, making it easy for users to navigate.
- **Event Handling**: User actions (sending and receiving messages) are handled efficiently, with updates appearing in real-time.
- **Socket.IO**: WebSockets maintain a live, persistent connection for instant messaging between users.

---

## Algorithm

### Step 1: Initialize Server
- Start the **Node.js** server using **Express**.
- Integrate **Socket.IO** to handle real-time communication between clients and the server.

### Step 2: Serve Static Files
- Use Express to serve **index.html**, **styles.css**, and **script.js** to the client.

### Step 3: Handle User Connection
- When a user connects to the server:
  - Log the connection event.
  - Wait for the user to provide a display name.

### Step 4: User Joins Chat
- Once the display name is provided:
  - Store the name in the user's session or socket.
  - Broadcast to other users that a new user has joined.

### Step 5: Send and Receive Messages
- When a user sends a message:
  - Capture the message and display name.
  - Emit the message to all connected users via Socket.IO.

- When a message is received by a client:
  - Display the message along with the sender’s display name in the chat interface.

### Step 6: Display Messages
- Append new messages in real-time to the chat area for all users, ensuring a live chat experience.

### Step 7: Handle User Disconnection
- If a user disconnects:
  - Log the disconnection event.
  - Optionally notify other users that a user has left the chat room.

### Step 8: End
- The chat continues to run, allowing users to send/receive messages until they manually disconnect.

---

## Detailed Flow

1. **User Interface (`index.html`)**:
   - The user opens the webpage and is prompted to enter a display name.
   - Clicking “Start Chat” hides the input and shows the chat area, enabling the user to start chatting.

2. **Server Interaction (`server.js`)**:
   - When the user connects, the server listens for their messages.
   - Upon receiving a message, the server broadcasts it to all users connected to the chat.

3. **Messaging and Real-Time Updates (`script.js`)**:
   - Users can type messages into an input field and submit them by pressing “Send.”
   - The server handles broadcasting the message to all users in real-time, which appears in their chat area.

4. **Session Management (Socket.IO)**:
   - Each user is managed using a session created by Socket.IO without needing a traditional database.
   - When a user disconnects, their session is cleared, and the server can notify others.

---

## Prototype

1. **index.html**: Displays a simple text input for the user’s display name, a chat window, and an input field for messages.
2. **styles.css**: Ensures the chat window has proper layout, colors, and is mobile-friendly.
3. **script.js**: Manages sending and receiving messages via Socket.IO, updating the DOM with new messages.
4. **server.js**: Sets up the Express server, serves static files, and facilitates real-time message transmission using Socket.IO.

---

## Checkpoints for Testing Functionality

1. **Server Initialization Checkpoint**:
   - Verify that the **Node.js server** is running without errors.
   - Ensure **Socket.IO** is properly set up and handling connections.

2. **Static Files Loading Checkpoint**:
   - Open `index.html` in the browser and check if all elements (input fields, buttons) are visible and styled correctly.
   - Verify that **styles.css** is loaded by inspecting the page layout and design.

3. **User Connection Checkpoint**:
   - Open multiple browser windows to simulate multiple users connecting.
   - Ensure that each connection is logged on the server.

4. **Display Name Input Checkpoint**:
   - Enter a display name and click “Start Chat.” Ensure that the name input field is hidden and the chat window appears.

5. **Message Sending/Receiving Checkpoint**:
   - Type a message and click “Send.” Check if the message is:
     - Sent to the server.
     - Broadcasted to all other clients.
     - Displayed correctly in the chat window with the sender's name.

6. **Real-Time Messaging Checkpoint**:
   - Open multiple browsers or tabs to test if messages are received in real-time across all clients without refreshing the page.

7. **Disconnection Handling Checkpoint**:
   - Close one of the browser tabs and verify that the server logs the disconnection.
   - Optionally check if the remaining users are notified of the disconnection.

8. **Performance and Load Checkpoint**:
   - Test with multiple simultaneous users (e.g., 5–10) to ensure that the server and client-side performance remains smooth and real-time interaction continues without lag or errors.

By following these checkpoints, you can systematically verify that each component of the chat application works as intended.

---

## License

This project is open source and available under the [MIT License](LICENSE).
