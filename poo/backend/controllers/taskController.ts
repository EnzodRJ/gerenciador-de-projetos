import Task from "../models/Task.js";
import { Request, Response } from "express";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks: any[] = await Task.getAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, projectId }: { title: string; projectId: number } = req.body;
    const taskId: number = await Task.create(title, projectId);
    res.status(201).json({ id: taskId, title, projectId });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
};

