import { pool } from "db/db"

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { menu_id } = req.query;
            let response = await pool.query(`
                SELECT c.* 
                FROM menu_customizations mc 
                JOIN customizations c 
                ON mc.customization_id = c.customization_id 
                WHERE mc.menu_id = ${menu_id};
            `);
            let customizations = response.rows;
            res.status(200).json({ customizations });
          } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Internal server error' })
          }
    }
}
