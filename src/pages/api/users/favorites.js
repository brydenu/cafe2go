import createDrinkLabel from "utils/createDrinkLabel";
import { decodeToken } from "utils/auth/auth";
import getFavorites from "utils/db/users/getFavorites";

export default async function handler(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded, user_id;
    try {
        // Verify and decode the JWT
        decoded = await decodeToken(token);
        user_id = decoded.sub;
    } catch (error) {
        // JWT verification failed
        return res.status(401).json({ message: "Invalid token", error: error });
    }
    if (req.method === "GET") {
        const favorites = await getFavorites(user_id);
        console.log("favorites:", favorites);
        const formatted = [];
        const responseObj = { favorites: [], hasFavorites: true };
        for (let order of favorites) {
            const label = await createDrinkLabel(order, true);
            formatted.push({ label, order });
        }
        if (!formatted.length) {
            responseObj.hasFavorites = false;
        } else {
            responseObj.favorites = formatted;
        }
        // Return the user data in the API response
        return res.status(200).json(responseObj);
    } else if (req.method === "POST") {
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
