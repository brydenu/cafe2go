import axios from "axios";

export default async function addFavorite(token, data) {
    const res = await axios.post("/api/users/favorites", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res;
}
