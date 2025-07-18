import express from "express";
import cors from "cors";

const app = express();
const PORT = 2900;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});
