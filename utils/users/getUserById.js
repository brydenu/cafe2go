import { pool } from "db/db";

export default async function getUserById(id) {
    const res = await pool.query(`
    SELECT user_id, first_name, last_name, email, phone_number
    FROM users
    WHERE user_id = ${id}`);
    const user = res.rows[0];
    return user;
}