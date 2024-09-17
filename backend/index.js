const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require("cors");

// Use the PORT environment variable or default to 3000
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.static('public')); // Serve static files from the public directory

app.get("/", (req, res) => {
  res.send("<h1>The ONLINE TABLE TENNIS GAME SERVER</h1>");
});

let rooms = [];

io.on("connection", (socket) => {
  console.log("A user has connected");

  socket.on("join", () => {
    console.log(rooms);

    let room;
    if (rooms.length > 0 && rooms[rooms.length - 1].players.length === 1) {
      room = rooms[rooms.length - 1];
    }

    if (room) {
      socket.join(room.id);
      socket.emit("playerNo", 2);

      // Add player to room
      room.players.push({
        socketID: socket.id,
        playerNo: 2,
        score: 0,
        x: 690,
        y: 200,
      });

      // Send message to room
      io.to(room.id).emit("startingGame");

      setTimeout(() => {
        io.to(room.id).emit("startedGame", room);

        // Start game
        startGame(room);
      }, 3000);
    } else {
      room = {
        id: rooms.length + 1,
        players: [
          {
            socketID: socket.id,
            playerNo: 1,
            score: 0,
            x: 90,
            y: 200,
          },
        ],
        ball: {
          x: 395,
          y: 245,
          dx: Math.random() < 0.5 ? 1 : -1,
          dy: 0,
        },
        winner: 0,
      };
      rooms.push(room);
      socket.join(room.id);
      socket.emit("playerNo", 1);
    }
  });

  socket.on("move", (data) => {
    let room = rooms.find((room) => room.id === data.roomID);

    if (room) {
      if (data.direction === "up") {
        room.players[data.playerNo - 1].y -= 10;

        if (room.players[data.playerNo - 1].y < 0) {
          room.players[data.playerNo - 1].y = 0;
        }
      } else if (data.direction === "down") {
        room.players[data.playerNo - 1].y += 10;

        if (room.players[data.playerNo - 1].y > 440) {
          room.players[data.playerNo - 1].y = 440;
        }
      }
    }

    // Update rooms
    rooms = rooms.map((r) => {
      if (r.id === room.id) {
        return room;
      } else {
        return r;
      }
    });

    io.to(room.id).emit("updateGame", room);
  });

  socket.on("leave", (roomID) => {
    socket.leave(roomID);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

function startGame(room) {
  let interval = setInterval(() => {
    room.ball.x += room.ball.dx * 5;
    room.ball.y += room.ball.dy * 5;

    // Check if ball hits player 1
    if (
      room.ball.x < 110 &&
      room.ball.y > room.players[0].y &&
      room.ball.y < room.players[0].y + 60
    ) {
      room.ball.dx = 1;
      // Change ball direction
      if (room.ball.y < room.players[0].y + 30) {
        room.ball.dy = -1;
      } else if (room.ball.y > room.players[0].y + 30) {
        room.ball.dy = 1;
      } else {
        room.ball.dy = 0;
      }
    }

    // Check if ball hits player 2
    if (
      room.ball.x > 690 &&
      room.ball.y > room.players[1].y &&
      room.ball.y < room.players[1].y + 60
    ) {
      room.ball.dx = -1;
      // Change ball direction
      if (room.ball.y < room.players[1].y + 30) {
        room.ball.dy = -1;
      } else if (room.ball.y > room.players[1].y + 30) {
        room.ball.dy = 1;
      } else {
        room.ball.dy = 0;
      }
    }

    // Up and down walls
    if (room.ball.y < 5 || room.ball.y > 490) {
      room.ball.dy *= -1;
    }

    // Left and right walls
    if (room.ball.x < 7) {
      room.players[1].score += 1;
      room.ball.x = 395;
      room.ball.y = 245;
      room.ball.dx = 1;
      room.ball.dy = 0;
    }

    if (room.ball.x > 793) {
      room.players[0].score += 1;
      room.ball.x = 395;
      room.ball.y = 245;
      room.ball.dx = -1;
      room.ball.dy = 0;
    }

    if (room.players[0].score === 10) {
      room.winner = 1;
      rooms = rooms.filter((r) => r.id !== room.id);
      io.to(room.id).emit("endGame", room);
      clearInterval(interval);
    }

    if (room.players[1].score === 10) {
      room.winner = 2;
      rooms = rooms.filter((r) => r.id !== room.id);
      io.to(room.id).emit("endGame", room);
      clearInterval(interval);
    }

    io.to(room.id).emit("updateGame", room);
  }, 1000 / 60);
}

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
