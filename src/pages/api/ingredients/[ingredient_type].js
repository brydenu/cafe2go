import getIngredientsByType from "utils/db/ingredients/getIngredientsByType";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { ingredient_type } = req.query;
      const ingredientOptions = await getIngredientsByType(ingredient_type);
      res.status(200).json({ ingredientOptions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
