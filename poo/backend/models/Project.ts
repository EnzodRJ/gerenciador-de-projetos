import pool from "../config/dp";

export default class Project {
  static async getAll(): Promise<any[]> {
    const [rows]: any[] = await pool.query("SELECT * FROM projects");
    return rows;
  }

  static async getById(id: number): Promise<any | null> {
    const [rows]: any[] = await pool.query("SELECT * FROM projects WHERE id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  static async create(name: string, description: string): Promise<number> {
    const [result]: any = await pool.query(
      "INSERT INTO projects (name, description) VALUES (?, ?)",
      [name, description]
    );
    return result.insertId;
  }
}