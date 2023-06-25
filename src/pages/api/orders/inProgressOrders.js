import { pool } from "db/db";
import createDrinkLabel from "utils/createDrinkLabel";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            let response = await pool.query(`
                SELECT * FROM orders
                WHERE in_progress = true
            `)
            const ordersRes = response.rows;
            let orders = [];
            for (let order of ordersRes) {
                const label = await createDrinkLabel(order);
                orders.push(label);
            }
            res.status(200).json({orders});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error'});
        }
    }
}