import { pool } from "db/db";
import { decodeToken } from "./auth";

export default async function checkAdmin(token) {
    const user = decodeToken(token);
    const userId = user.sub;
    const res = await pool.query(`
    SELECT admin 
    FROM users
    WHERE user_id = ${userId}`);
    
    return res.rows[0];
}