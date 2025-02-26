import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import messageRoutes from "./routes/personalmsg.route.js";
import broadcastMsg from "./routes/broadcastmsg.route.js";

dotenv.config();

const app = express();

// ✅ Fix CORS issue by allowing frontend & enabling credentials
app.use(
  cors({
    origin: "https://meet-frontend-dun.vercel.app/", // ✅ Remove trailing slash
    methods: ["POST", "GET"],
    credentials: true, // ✅ Allow cookies, authentication headers
  })
);

app.use(express.json());

const server = http.createServer(app);

// ✅ Fix Socket.IO CORS issue
const io = new Server(server, {
  cors: {
    origin: "https://meet-frontend-dun.vercel.app",
    methods: ["POST", "GET"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // ✅ Allow both WebSocket & polling
});

app.use("/api/users", userRoutes);
app.use("/api/broadcastmsg", broadcastMsg);
app.use("/api/message", messageRoutes);

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("send-message", (messageObj) => {
    console.log(messageObj);
    const receiver = messageObj.room;
    io.to(receiver).emit("receive-message", messageObj);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    server.listen(3000, () => {
      console.log("🚀 Server is running on port 3000");
    });
  })
  .catch((e) => {
    console.log("❌ MongoDB Connection Error:", e);
  });
