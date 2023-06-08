import { pool } from "db/db"

export default async function getMenu(menu_id) {
    let response;
    if (menu_id) {
        response = await pool.query(`SELECT drink_name FROM menu WHERE menu_id = ${menu_id}`);
        return response.rows[0];
    } else {
        response = await pool.query('SELECT * FROM menu');
    }
    return response.rows;
}
