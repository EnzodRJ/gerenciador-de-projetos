import { Pool } from "mysql2/promise";
import pool from "../../backend/config/dp";

interface TeamData {
    id?: number;
    name: string;
}

export default class Team {
    // Buscar todas as equipes
    static async getAll(): Promise<TeamData[]> {
        const [rows] = await pool.query("SELECT * FROM teams");
        return rows as TeamData[];
    }

    // Buscar equipe por ID
    static async getById(id: number): Promise<TeamData | null> {
        const [rows] = await pool.query("SELECT * FROM teams WHERE id = ?", [id]);
        return (rows as TeamData[])[0] || null;
    }

    // Criar uma nova equipe
    static async create(team: TeamData): Promise<number> {
        const [result] = await pool.query("INSERT INTO teams SET ?", team);
        return (result as any).insertId;
    }

    // Atualizar equipe
    static async update(id: number, team: TeamData): Promise<boolean> {
        const [result] = await pool.query("UPDATE teams SET ? WHERE id = ?", [team, id]);
        return (result as any).affectedRows > 0;
    }

    // Deletar equipe
    static async delete(id: number): Promise<boolean> {
        const [result] = await pool.query("DELETE FROM teams WHERE id = ?", [id]);
        return (result as any).affectedRows > 0;
    }
}
