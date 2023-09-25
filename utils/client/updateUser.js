import axios from "axios";

export default async function updateUser(token, data) {
  const res = await axios.patch("/api/users", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}
