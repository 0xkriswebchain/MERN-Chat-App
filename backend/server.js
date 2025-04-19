import express from "express";
import dotenv from "dotenv";
import authRoutes from "../backend/routes/auth.routes.js";
import messageRoutes from "../backend/routes/message.routes.js";
import userRoutes from "../backend/routes/user.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

// Middleware
app.use(express.json()); // to parse JSON data
app.use(cookieParser()); // to parse cookies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
// app.get("/", (req, res) => {
// root route http://localhost:5000/
//   res.send("Hello World");
// });

app.use(express.static(path.join(__dirname, "/frontend/dist")));

server.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server is running on ${PORT}`);
});
