import { Request, Response } from "express";

export const getOverview = (req: Request, res: Response) => {
  res.json({
    services: 12,
    incidents: 2,
    errorRate: 1.4,
    avgResponseMs: 248,
    uptime: 99.95,
  });
};
