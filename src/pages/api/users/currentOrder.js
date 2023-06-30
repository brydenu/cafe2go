export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405).json({ method: "Method not allowed" });
    }

    const query = req;
    console.log("query", query)

    if (!token) {
        res.status(401).json({  message: 'Unauthorized' });
    }

    try {
        const decoded = await decodeToken(token);
        console.log("decoded:", decoded);

    } catch (e) {

    }
}