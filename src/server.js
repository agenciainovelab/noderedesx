import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./api/auth/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`✅ API rodando em http://localhost:${port}`);
});