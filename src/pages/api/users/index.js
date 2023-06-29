import getUserById from "utils/users/getUserById";
import { decodeToken } from "utils/auth/auth";

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
        const decoded = await decodeToken(token);
  
        // Retrieve user data based on the user identifier
        const user = await getUserById(decoded.sub.user_id);
    
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