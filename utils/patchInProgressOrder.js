import { pool } from "db/db"

export default async function patchInProgressOrder(orderId, undo=false) {
    const response = await pool.query(`
    UPDATE orders
    SET in_progress=${undo}
    WHERE order_id=${orderId}
    `);

    return response.rows[0];
}