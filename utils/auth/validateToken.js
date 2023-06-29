import axios from "axios";
import { resolve } from "styled-jsx/css";

export default async function validateToken(token) {
    const res = await axios.get("/api/auth", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}