import app from "./app";
import { createServer } from "http";
import { Server } from "socket.io";

// Create HTTP server and attach it to the Express app
const httpServer = createServer(app);

// Initialize Socket.io with CORS settings
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow GET and POST requests
  },
});

// When a client connects, handle their socket connection
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  // Listen for latitude data from HTML client
  socket.on("location", (location) => {
    console.log("Received latitude from HTML client:", location);

    // Broadcast the location to all clients in the 'reactAppRoom'
    io.to("reactAppRoom").emit("locationUpdate", location);
  });

  // Handle React app connection
  socket.on("reactAppConnect", () => {
    console.log("React app connected");

    // Add React app to 'reactAppRoom'
    socket.join("reactAppRoom");
  });

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });

  // Listen for client messages (optional)
  socket.on("clientmessage", (msg) => {
    console.log("message: ", msg);

    // Broadcast the message to all connected clients
    io.emit("message", msg);
  });
});

// Start the server on a specific port
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default httpServer;
