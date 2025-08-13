import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import answerRoutes from "./routes/answerRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", questionRoutes);
app.use("/api", answerRoutes);

app.get("/", (req, res) => {
  res.send("Sveikas atvykęs į forumo backend!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB prisijungta"))
  .catch((err) => console.error(" Klaida jungiantis prie MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` Serveris veikia http://localhost:${PORT}`)
);
