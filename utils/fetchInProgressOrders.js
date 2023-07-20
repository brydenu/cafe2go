import axios from "axios";

export default async function fetchInProgressOrders() {
    const res = await axios.get('/api/orders/inProgressOrders');
    const { orders } = res.data;
    return orders;
}