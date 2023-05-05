import { pool } from "db/db"

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            let response = await pool.query('SELECT * FROM ingredients');
            let ingredients = response.rows
            res.status(200).json({ingredients});
          } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Internal server error' })
          }
    }     
}
