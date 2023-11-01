import axios from "axios";

export default async function deleteFavorite(token, favoriteId) {
    const res = await axios.delete(
        `/api/users/favorites?favorite_id=${favoriteId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;
}
