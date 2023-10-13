import axios from "axios";

export default async function submitQuickOrder(token, data) {
    const res = await axios.post("/api/orders/quick-order", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
}
