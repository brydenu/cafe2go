import CreateNewOrder from "utils/db/orders/CreateNewOrder";
import { decodeToken } from "utils/auth/auth";
import updateUserLatestOrder from "utils/db/users/updateUserLatestOrder";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const data = req.body;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (!data) {
        return res.status(400).json({ message: "No order data received." });
    }

    try {
        const decoded = await decodeToken(token);
        const tokenId = decoded.sub;
        console.log("tokenId", tokenId);
        if (tokenId !== data.user_id) {
            return res.status(405).json({
                message:
                    "Unauthorized (user_id of favorite drink does not match user_id of token sent in request).",
            });
        }
        const order = await CreateNewOrder(data, true);
        console.log("order created,", order);
        const { order_id, user_id } = order;
        const updated = await updateUserLatestOrder(user_id, order_id);

        return res.status(200).json(order);
    } catch (e) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: e });
    }
}
