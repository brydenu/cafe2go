import { pool } from "db/db"

export default async function getOrderById(order_id) {
    let order = await pool.query(`SELECT * FROM orders WHERE order_id = ${order_id}`);
    return order.rows[0];
}
