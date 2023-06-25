import { pool } from "db/db"

export default async function getCustomizations() {
    let response = await pool.query('SELECT * FROM customizations');
    return response.rows;
}
