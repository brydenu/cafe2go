import getMenu from "utils/db/menu/getMenu";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            let menu = await getMenu();
            res.status(200).json({menu});
          } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
          }
    } else {
      res.status(405).json({message: "Method not allowed"})
    }
}
