import express, { Router } from "express";
import { getTeams, createTeam } from "../controllers/teamController";

const router: Router = express.Router();

router.get("/", getTeams);
router.post("/", createTeam);

export default router;