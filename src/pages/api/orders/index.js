import { pool } from 'db/db';
import CreateNewOrder from "utils/orders/CreateNewOrder";
import getOrderById from 'utils/getOrderById';
import createDrinkLabel from 'utils/createDrinkLabel';

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { order_id } = req.query;
    try {
      const order = await getOrderById(order_id);
      const label = await createDrinkLabel(order);
      res.status(200).json({order: label});
    } catch (e) {
      console.error(`Error fetching order where id="${order_id}". Error:`, e);
      res.status(500).json({ message: "Internal server error" })
    }

  } else if (req.method === 'POST') {
    try {
      const data = req.body;

      // Create a new row in the orders table
      const order = await CreateNewOrder(data);


      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
