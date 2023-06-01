import { pool } from "db/db"
import CreateNewOrder from "db/CreateNewOrder";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let data = req.body;
            CreateNewOrder(data);
            res.status(200).json({data});
          } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Internal server error' })
          }
    }
}
