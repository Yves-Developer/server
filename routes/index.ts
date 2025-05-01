import { Router } from "express";
import { addUser, getUser, health, welcome } from "../controllers";
const router = Router();
router.get("/", welcome);
router.get("/health", health);
router.post("/user", addUser);
router.get("/users", getUser);
export default router;
