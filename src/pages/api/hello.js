// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pool } from "db/db"

export default async function handler(req, res) {
  try {
    let response = await pool.query('SELECT * FROM menu');
    res.status(200).json({response});
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
  
}
