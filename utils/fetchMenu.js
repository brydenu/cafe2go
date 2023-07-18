import axios from "axios";

export default async function fetchMenu() {
    console.log("menu fetching")
    const res = await axios.get("api/menu");
    console.log("menu res", res);
    return res;
}