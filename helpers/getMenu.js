import { pool } from "db/db"

export default async function getMenu() {
    let response = await pool.query('SELECT * FROM menu');
    return response.rows;
}
