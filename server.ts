import app from "app";
import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
  // Listen for messages from the client
  socket.on("clientmessage", (msg) => {
    console.log("message: ", msg);
    // Broadcast the message to all connected clients
    io.emit("message", msg);
  });
});

export default httpServer;