import pool from "../config/dp";

export default class Team {
  static async getAll(): Promise<any[]> {
    const [rows]: any[] = await pool.query("SELECT * FROM teams");
    return rows;
  }

  static async create(name: string): Promise<number> {
    const [result]: any = await pool.query("INSERT INTO teams (name) VALUES (?)", [name]);
    return result.insertId;
  }
}

