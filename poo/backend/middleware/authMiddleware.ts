import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
  const token: string | undefined = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Acesso não autorizado" });
  }

  
  if (token !== "seu_token_secreto") {
    return res.status(403).json({ error: "Token inválido" });
  }

  next();
};
