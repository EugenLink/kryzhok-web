import cookie from "cookie";
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.session_token;

  if (!token) {
    return res.status(401).json({ error: "Нет сессии" });
  }

  // Проверка токена в БД
  const conn = await mysql.createConnection({ host: "...", user: "...", password: "...", database: "..." });
  const [rows] = await conn.execute("SELECT * FROM users WHERE session_token = ?", [token]);
  await conn.end();

  if (rows.length === 0) {
    return res.status(401).json({ error: "Неверная сессия" });
  }

  const user = rows[0];
  delete user.password;

  res.status(200).json({ success: true, user });
}