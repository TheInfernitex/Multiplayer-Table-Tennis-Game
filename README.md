Multiplayer Table Tennis Game
A real-time multiplayer ping-pong game built to explore HTML Canvas and WebSockets. This project was created to gain a deeper understanding of game development in the browser, real-time communication using WebSockets, and the fundamentals of drawing and animating on the HTML5 Canvas.

Table of Contents
Features
Technologies
Getting Started
Prerequisites
Installation
Running the Project
Folder Structure
How It Works
Future Improvements
License
Features
Two players can join a room and play against each other in real time.
Real-time synchronization of ball movement, player positions, and scores using Socket.io.
Simple yet responsive gameplay built with HTML Canvas.
Customizable player paddles and ball speed.
The game ends when a player reaches 10 points.
Technologies
Backend: Node.js, Express, Socket.io
Frontend: HTML, CSS, JavaScript (using the HTML5 Canvas for drawing)
WebSockets: Real-time bi-directional communication via Socket.io
Getting Started
Prerequisites
Node.js (v14 or higher)
npm (comes with Node.js)
Installation
Clone this repository to your local machine:

bash
Copy code
git clone https://github.com/TheInfernitex/Multiplayer-Table-Tennis-Game.git
Navigate to the backend folder and install dependencies:

bash
Copy code
cd backend
npm install
Running the Project
Start the Backend: In the backend directory, run the server:

bash
Copy code
npm start
Run the Frontend: You can use a local server to run the game. For example, you can use the Live Server extension in VSCode or any other simple HTTP server to serve the public folder:

bash
Copy code
cd public
live-server
Open the game in two different browser tabs/windows and play!

Folder Structure
php
Copy code
project/
│
├── backend/
│ ├── index.js # Handles server
│ └── package.json # Server dependencies
│
├── public/ # Static assets served to users
│ ├── index.html
│ ├── styles.css
│ ├── main.js # Main game logic
│ ├── ball.js # Ball physics and movement
│ ├── player.js # Player logic and movement
│ ├── image.png
│ └── audio.mp3
│
├── README.md
└── .gitignore
How It Works
HTML Canvas is used to draw the game elements (ball, paddles, etc.) and animate them during gameplay.
Socket.io enables real-time communication between the server and the clients (players). When a player moves, the server updates the game state and broadcasts the changes to both players.
The game logic includes ball physics, paddle movement, and scorekeeping. The game ends when one player reaches 10 points.
Future Improvements
Add more customization options like different paddles, ball sizes, or power-ups.
Implement a matchmaking system for better player-room assignment.
Add sounds for in-game events such as ball hits and scoring.
Implement AI so that players can play against the computer.
License
This project is licensed under the MIT License. See the LICENSE file for details.