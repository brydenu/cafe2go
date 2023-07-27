import getOrderHistory from "utils/db/orders/getOrderHistory";
import createDrinkLabel from "utils/createDrinkLabel";
import { decodeToken } from "utils/auth/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify and decode the JWT
    const decoded = await decodeToken(token);
    const user_id = decoded.sub;
    const orderHistory = await getOrderHistory(user_id);
    const formatted = [];
    for (let order of orderHistory) {
      const formattedOrder = await createDrinkLabel(order);
      formatted.push(formattedOrder);
    }
    // Return the user data in the API response
    return res.status(200).json(formatted);
  } catch (error) {
    // JWT verification failed
    return res.status(401).json({ message: "Invalid token", error: error });
  }
}
