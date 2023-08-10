import { createToken, decodeToken } from "utils/auth/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    try {
      const token = await createToken(1); // user_id 1 === Guest User
      return res.status(200).json({ token });
    } catch (e) {
      return res.status(500).json("Error fetching guest user info");
    }
  }
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Token not found" });
  }
  try {
    const decoded = await decodeToken(token);
    const isGuest = decoded.sub === 1;
    res.status(200).json({ isGuest });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}
