import checkAdmin from "utils/db/users/checkAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const isAdmin = await checkAdmin(token);

    return res.status(200).json({ isAdmin: isAdmin.admin });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
}
