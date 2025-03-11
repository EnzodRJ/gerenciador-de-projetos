import express, { Router } from "express";
import { getReports, createReport } from "../controllers/reportController";

const router: Router = express.Router();

router.get("/", getReports);
router.post("/", createReport);

export default router;
