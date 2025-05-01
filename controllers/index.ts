import { Request, Response } from "express";
import User from "../models/User";

// GET /
export const welcome = (_req: Request, res: Response): void => {
  res.json({ message: "Welcome to the API" });
};

// GET /health
export const health = (_req: Request, res: Response): void => {
  res.json({ status: "OK" });
};

// POST /users
export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// GET /users
export const getUser = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
