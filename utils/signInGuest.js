import axios from "axios";

export default async function signInGuest() {
  const res = await axios.get("/api/users/guest");
  return res.data;
}
