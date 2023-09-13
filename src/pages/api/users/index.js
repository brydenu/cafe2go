import getUserById from "utils/db/users/getUserById";
import checkLatestOrder from "utils/db/orders/checkLatestOrder";
import { decodeToken } from "utils/auth/auth";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Get the JWT from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized", no_token_token: token });
    }

    let decoded;
    let userId;
    let user;
    try {
      // Verify and decode the JWT
      decoded = decodeToken(token);
    } catch (e) {
      return res.status(401).json({ message: "error decoding token" });
    }

    try {
      userId = decoded.sub;
      // Retrieve user data based on the user identifier
      user = await getUserById(userId);
    } catch (e) {
      res.status(401).json({ message: `cant find user with id ${userId}` });
    }
    try {
      if (user.user_id === 1) {
        return res.status(200).json(user);
      }

      // if (!user) {
      //   return res.status(404).json({ message: "User not found" });
      // }
    } catch (error) {
      return res.status(401).json({
        message: "An error occurred retrieving user info",
        token,
        decoded,
        user,
        error: error,
      });
    }
    try {
      if (!!user.latest_order_id) {
        const latestOrder = await checkLatestOrder(
          user.latest_order_id,
          user.latest_order_date
        );
        user["latestOrder"] = latestOrder;
      }
      // Return the user data in the API response
      return res.status(200).json(user);
    } catch (error) {
      // JWT verification failed
      return res.status(401).json({
        message: "An error occurred retrieving latest drink information",
        error: error,
      });
    }
  }
}
