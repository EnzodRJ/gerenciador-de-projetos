import pool from "../config/dp";

export default class Report {
  static async getAll(): Promise<any[]> {
    const [rows]: any[] = await pool.query("SELECT * FROM reports");
    return rows;
  }

  static async create(content: string): Promise<number> {
    const [result]: any = await pool.query("INSERT INTO reports (content) VALUES (?)", [content]);
    return result.insertId;
  }
}
