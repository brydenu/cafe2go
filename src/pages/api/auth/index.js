import { createToken, decodeToken } from "utils/auth/auth";
import LoginUser from "utils/users/LoginUser";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'Unauthorized' })
        }

        try {
            const decoded = await decodeToken(token);
            res.status(200).json({ message: "valid_token"})
        } catch (e) {
            res.status(401).json({message: "invalid_token"})
        }

    } else if (req.method === "POST") {
        const data = req.body;
        try {
            const userId = await LoginUser(data);
            if (userId) {
                const token = createToken(userId);
                res.status(200).json({ token });
            } else if (user.error) {
                res.status(401).json({ "error": "Invalid username or password" });
            }
        } catch (e) {
            if (e.code === "23505") {
                res.status(400).json({"error": {"code": e.code, "type": "duplicate_email"}})
            } else {
                res.status(400).json({"error": e});
            }
        }
    }
}
