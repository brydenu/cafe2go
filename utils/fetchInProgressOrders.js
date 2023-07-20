import axios from "axios";

export default async function fetchInProgressOrders() {
    const res = await axios.get('/api/orders/inProgressOrders');
    const { orders } = response.data;
    return orders;
}