import getCurrentDrinkCustomizations from "utils/db/customizations/getCurrentDrinkCustomizations";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { menu_id } = req.query;
            const customizations = await getCurrentDrinkCustomizations(menu_id);
            res.status(200).json({ customizations });
          } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Internal server error' })
          }
    }
}
