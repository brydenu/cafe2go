import { pool } from "db/db"

export default async function getIngredients() {
    let response = await pool.query('SELECT * FROM ingredients');
    return response.rows;
}
