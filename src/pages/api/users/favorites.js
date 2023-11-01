import createDrinkLabel from "utils/createDrinkLabel";
import { decodeToken } from "utils/auth/auth";
import getFavorites from "utils/db/users/getFavorites";
import addNewFavorite from "utils/db/users/addNewFavorite";
import getUserById from "utils/db/users/getUserById";
import checkLatestOrder from "utils/db/orders/checkLatestOrder";
import deleteFavorite from "utils/db/users/deleteFavorite";

export default async function handler(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const reqBody = req.body;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded, user_id, user;
    try {
        // Verify and decode the JWT
        decoded = await decodeToken(token);
        user_id = decoded.sub;
        user = await getUserById(user_id);
    } catch (error) {
        // JWT verification failed
        return res.status(401).json({ message: "Invalid token", error: error });
    }
    if (req.method === "GET") {
        const favorites = await getFavorites(user_id);
        const formatted = [];
        const responseObj = {
            favorites: [],
            hasFavorites: true,
            latestOrder: null,
        };
        for (let order of favorites) {
            const label = await createDrinkLabel(order, true);
            formatted.push({ label, order });
        }
        if (!formatted.length) {
            responseObj.hasFavorites = false;
        } else {
            responseObj.favorites = formatted;
        }
        if (!!user.latest_order_id) {
            const latestOrder = await checkLatestOrder(
                user.latest_order_id,
                user.latest_order_date
            );
            responseObj.latestOrder = latestOrder;
        }
        // Return the user data in the API response
        return res.status(200).json(responseObj);
    } else if (req.method === "POST") {
        const newFavorite = await addNewFavorite(reqBody);
        res.status(201).json(newFavorite);
    } else if (req.method === "DELETE") {
        const { favorite_id } = req.query;

        try {
            const deleted = await deleteFavorite(user_id, favorite_id);
            return res.status(200).json({
                message: "Favorite deleted successfully",
                deletion_success: true,
            });
        } catch (e) {
            return res.status(500).json({
                error: "An error occurred while attempting to delete favorite.",
            });
        }
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
