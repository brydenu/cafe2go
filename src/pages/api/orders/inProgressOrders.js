import getInProgressOrders from "utils/db/orders/getInProgressOrders";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const orders = await getInProgressOrders();
            res.status(200).json({orders});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error'});
        }
    }
}