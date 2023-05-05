import { pool } from "db/db"

export default async function handler(req, res) {
    try {
        let response = await pool.query('SELECT * FROM menu');
        let menu = response.rows
        res.status(200).json({menu});
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
      }
      
}
