import axios from "axios";

export default async function getUserFavorites(token) {
  const res = await axios.get("/api/users/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
