import { pool } from "db/db";

export default async function getOrderHistory(user_id) {
    const res = await pool.query(`
    SELECT * FROM orders
    WHERE user_id = ${user_id};
    `);

    return res.rows;
}