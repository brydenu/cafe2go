import { pool } from "db/db"

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { ingredient_type } = req.query;
            let response = await pool.query(`
                SELECT * FROM ingredients
                WHERE type = '${ingredient_type}'    
            `);
            let ingredientOptions = response.rows;
            res.status(200).json({ ingredientOptions });
          } catch (error) {
            // console.error(error)
            res.status(500).json({ message: 'Internal server error' })
          }
    }
}
