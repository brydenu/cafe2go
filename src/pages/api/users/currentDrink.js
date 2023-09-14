import { decodeToken } from "utils/auth/auth";
import getUserCurrentOrder from "utils/db/orders/getUserCurrentOrder";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(405).json({ message: "Unauthorized" });
  }

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Token not found" });
  }

  try {
    const decoded = decodeToken(token);
    const userId = decoded.sub;
    console.log("userId", userId);
    const currentOrder = await getUserCurrentOrder(userId);
    return res.status(200).json(currentOrder);
  } catch {
    res.status(500).json({ error: "Problem fetching user current drink" });
  }
}
