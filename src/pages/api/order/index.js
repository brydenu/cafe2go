import { pool } from "db/db"
import EventSource from "eventsource";
import CreateNewOrder from "db/CreateNewOrder";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let data = req.body;
            await CreateNewOrder(data);

            console.log("right before eventsource");
            const eventSource = new EventSource('/api/orders/inProgressOrders');
            eventSource.onopen = () => {
                const newEvent = new Event('newOrder');
                eventSource.dispatchEvent(newEvent);
              };
            console.log("right after eventsource");

            res.status(201).json({data});
          } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Internal server error', error: error })
          }
    }
}
