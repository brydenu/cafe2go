// pages/api/orders/updates.js
import EventSource from "eventsource";
import { pool } from "db/db";

// Keep track of the number of active SSE connections
let connectionCount = 0;

export default async function handler(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Transfer-Encoding", "chunked");

  // Increment the connection count
  connectionCount++;

  // Set up event source
  const eventSource = new EventSource(req.url);

  // Wait for new order event and send it to the client
  const sendNewOrderEvent = (orderId) => {
    res.write(`data: ${orderId}\n\n`);
  };

  // Handle SSE connection close
  const handleClose = () => {
    // Decrement the connection count
    connectionCount--;

    // End the pool only when all SSE connections are closed
    if (connectionCount === 0) {
      pool.end(); // Release the database connection when all SSE connections are closed
    }
  };

  // Set up SSE event listeners
  eventSource.on("newOrder", sendNewOrderEvent);
  eventSource.addEventListener("error", handleClose);
  req.on("close", handleClose);

  // Fetch initial orders data from the database
  try {
    const client = await pool.connect();

    // Execute the database query
    const result = await client.query("SELECT * FROM orders");
    const orders = result.rows;

    client.release();

    // Send the initial orders data to the client
    res.write(`data: ${JSON.stringify(orders)}\n\n`);
  } catch (error) {
    console.error("Error fetching initial orders data:", error);
    res.status(500).end();
  }
}
