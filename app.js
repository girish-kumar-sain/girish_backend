import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import blogRouter from "./routes/blog.router.js";
import cors from "cors";
import connectDB from "./database/db.js";

dotenv.config();
const app = express();

const PORT = 2900;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

console.log("Registering /api/v1/user routes");
app.use("/api/v1/user", userRoute);
console.log("Registering /api/v1/blog routes");
app.use("/api/v1/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`server listen at ${PORT}`);
  connectDB();
});

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({
    isSuccess: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});
