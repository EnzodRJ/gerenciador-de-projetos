import pool from "../config/dp";

export default class User {
  static async getAll(): Promise<any[]> {
    const [rows]: any[] = await pool.query("SELECT * FROM users");
    return rows;
  }

  static async create(username: string, email: string): Promise<number> {
    const [result]: any = await pool.query(
      "INSERT INTO users (username, email) VALUES (?, ?)",
      [username, email]
    );
    return result.insertId;
  }
}
