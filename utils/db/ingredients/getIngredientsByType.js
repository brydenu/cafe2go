import { pool, supabase } from "db/db";

export default async function getIngredientsByType(ingredient_type) {
  if (process.env.ENVIRONMENT === "dev") {
    // Original code
    let response = await pool.query(`
        SELECT * FROM ingredients
        WHERE type = '${ingredient_type}'
    `);
    let ingredientOptions = response.rows;
    return ingredientOptions;
  } else {
    // Supabase code
    const { data, error } = await supabase
      .from("ingredients")
      .select("*")
      .eq("type", ingredient_type);

    if (error) {
      // Handle the error
    }

    return data;
  }
}
