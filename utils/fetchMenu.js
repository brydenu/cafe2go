import axios from "axios";

export default async function fetchMenu() {
    const res = await axios.get("api/menu");
    return res;
}