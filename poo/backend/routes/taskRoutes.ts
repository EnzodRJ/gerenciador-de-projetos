import express, { Router } from "express";
import { getTasks, createTask } from "../controllers/taskController";

const router: Router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);

export default router;
