import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]; // get socket id from userSocketMap
};

const userSocketMap = {}; // to store user socket ids

// socket.on is used to listen for events from the client and server

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
});

const userId = socket.handshake.query.userId; // get userId from query params
if (userId != "undefined") userSocketMap[userId] = socket.id; // store userId and socket id in userSocketMap

io.emit("getOnlineUsers", Object.keys(userSocketMap)); // emit online users to all clients

io.on("disconnect", (socket) => {
  console.log(`User disconnected: ${socket.id}`);
  delete userSocketMap[userId]; // remove userId from userSocketMap
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
});

export { app, server, io };
