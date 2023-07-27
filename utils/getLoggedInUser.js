import axios from "axios";

export default async function getLoggedInUser(token) {
  const res = await axios.get("/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { user: res };
}
