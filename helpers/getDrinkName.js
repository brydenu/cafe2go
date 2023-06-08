import { pool } from "db/db"

export default async function getDrinkName(menu_id) {
    const response = await pool.query(`SELECT drink_name FROM menu WHERE menu_id = ${menu_id}`);
    const drinkName = response.rows[0].drink_name;
    return drinkName;
}
