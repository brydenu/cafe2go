import axios from "axios";

export default async function checkIfGuest(token) {
  const res = await axios.get("/api/users/guest", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data?.isGuest;
}
