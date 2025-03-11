import pool from "../config/dp";

export default class Task {
  static async getAll(): Promise<any[]> {
    const [rows]: any[] = await pool.query("SELECT * FROM tasks");
    return rows;
  }

  static async create(title: string, projectId: number): Promise<number> {
    const [result]: any = await pool.query(
      "INSERT INTO tasks (title, project_id) VALUES (?, ?)",
      [title, projectId]
    );
    return result.insertId;
  }
}
