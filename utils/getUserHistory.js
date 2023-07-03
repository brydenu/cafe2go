import axios from "axios";

export default async function getUserHistory(token) {
    const res = await axios.get("/api/users/orders", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}