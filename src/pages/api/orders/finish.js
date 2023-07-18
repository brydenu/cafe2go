import patchInProgressOrder from 'utils/db/orders/patchInProgressOrder';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    try {
      const data = req.body;

      // Create a new row in the orders table
      const order = patchInProgressOrder(data.id);


      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
