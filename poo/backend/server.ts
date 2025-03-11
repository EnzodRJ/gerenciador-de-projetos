import express, { Application} from "express";
import cors from "cors";
import { config } from "dotenv";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import teamRoutes from "./routes/teamRoutes";
import reportRoutes from "./routes/reportRoutes";
import { errorHandler } from "./middleware/errorHandler";

config(); // Carrega as variáveis de ambiente

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "5000", 10);

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/reports", reportRoutes);

// Middleware de erro
app.use(errorHandler);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


