import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import overviewRoutes from "./routes/overview.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/overview", overviewRoutes);

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, message: "API ayakta." });
});

export default app;
