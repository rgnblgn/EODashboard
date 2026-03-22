import { Request, Response } from "express";

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "Backend",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/overview", (_req: Request, res: Response) => {
  res.json({
    services: 12,
    incidents: 2,
    errorRate: 1.4,
    avgResponseTime: 248,
    upTime: 99.95,
  });
});
