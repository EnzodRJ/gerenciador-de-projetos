import Report from "../models/Report";
import { Request, Response } from 'express';

export const getReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const reports: any[] = await Report.getAll();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar relatórios" });
  }
};

export const createReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content }: { content: string } = req.body;
    const reportId: number | string = await Report.create(content);
    res.status(201).json({ id: reportId, content });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar relatório" });
  }
};