import express from "express";
import dotenv from "dotenv";
import connectionDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const port = process.env.PORT || 8000;


app.use(cors({
  origin: "https://chatly-frontend-f470.onrender.com", // ✅ matches your frontend
  credentials: true                // ✅ allows cookies
}));

app.use(express.json());
app.use(cookieParser())
app.get("/", (req, res) => {
    res.send("Hello Server");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);


// 👇 Connect to DB first, then start server
const startServer = async () => {
  try {
    await connectionDb(); // ensure this returns a Promise
    server.listen(port, () => {
      console.log(`✅ Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1); // optional: exit if DB connection fails
  }
};

startServer();
