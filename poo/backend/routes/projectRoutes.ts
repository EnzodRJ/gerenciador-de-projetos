import express, { Router } from "express";
import { getProjects, createProject } from "../controllers/projectController";

const router: Router = express.Router();

router.get("/", getProjects);
router.post("/", createProject);

export default router;
