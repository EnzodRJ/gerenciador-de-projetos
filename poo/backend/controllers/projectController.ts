import { Request, Response } from "express";
import Project from "../models/Project";

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.getAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar projetos" });
  }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description }: { name: string; description: string } = req.body;
    const projectId: number = await Project.create(name, description);
    res.status(201).json({ id: projectId, name, description });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar projeto" });
  }
};
