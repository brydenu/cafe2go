import axios from "axios";

export default async function getLoggedInUser(token) {
    console.log("token used:", token);
    const res = await axios.get("/api/users", {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return { user: res };
}