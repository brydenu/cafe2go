import { pool } from "db/db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            let response = await pool.query(`
                SELECT * FROM orders
                WHERE in_progress = true
            `)
            const orders = response.rows;
            res.status(200).json({orders});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error'});
        }
    }
}