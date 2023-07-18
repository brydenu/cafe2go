import getMenu from "utils/db/menu/getMenu";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { menu_id } = req.query;
            const menu = getMenu(menu_id);
            res.status(200).json({menu});
          } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Internal server error' })
          }
    } else {
      res.status(405).json({message: "Method not allowed"})
    }
}
