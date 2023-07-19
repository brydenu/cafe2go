import { createToken } from "utils/auth/auth";
import CreateUser from "utils/db/users/CreateUser";

export default async function handler(req, res) {
//   console.log("req.body:", req.body);
  const data = req.body;
  try {
    const user = await CreateUser(data);
    const token = createToken(user.user_id);
    res.status(200).json({ token });
  } catch (e) {
    if (e.code === "23505") {
        res.status(409).json({"error": {"code": e.code, "type": "duplicate_email"}})
    } else {
        res.status(400).json({"error": e});
    }
  }
}
