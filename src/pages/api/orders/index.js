import { pool } from 'db/db';
import CreateNewOrder from "db/CreateNewOrder";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;

      // Create a new row in the orders table
      const order = CreateNewOrder(data);


      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
