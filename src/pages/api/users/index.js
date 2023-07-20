import getUserById from "utils/db/users/getUserById";
import getUserCurrentOrder from "utils/db/orders/getUserCurrentOrder";
import { decodeToken } from "utils/auth/auth";
import createDrinkLabel from "utils/createDrinkLabel";

export default async function handler(req, res) {
    if (req.method === 'GET') {
  
    // Get the JWT from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
        // Verify and decode the JWT
        const decoded = decodeToken(token);
  
        // Retrieve user data based on the user identifier
        const user = await getUserById(decoded.sub);
        const userCurrentOrder = await getUserCurrentOrder(user.user_id);
        if (!!userCurrentOrder) {
            const order = await createDrinkLabel(userCurrentOrder)
            user["currentOrder"] = order;
        }
    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Return the user data in the API response
        return res.status(200).json(user);
    } catch (error) {
      // JWT verification failed
      return res.status(401).json({ message: 'Invalid token', error: error });
    }
  }
}