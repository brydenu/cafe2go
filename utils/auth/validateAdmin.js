import axios from "axios";

export default async function validateAdmin(token) {
  const res = await axios.get("/api/auth/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.isAdmin;
}
