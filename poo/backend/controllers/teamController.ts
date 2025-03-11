import Team from "../models/Team";
import { Request, Response } from "express";

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await Team.getAll();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar equipes" });
  }
};

export const createTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const teamId = await Team.create(name);
    res.status(201).json({ id: teamId, name });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar equipe" });
  }
};