import { pool, supabase } from "db/db";

export default async function getIngredientById(ingredient_id) {
  if (process.env.ENVIRONMENT === "dev") {
    // Original code
    let ingredient = await pool.query(
      `SELECT ingredient_name, type FROM ingredients WHERE ingredient_id = ${ingredient_id}`
    );
    return ingredient.rows[0];
  } else {
    // Supabase code
    const { data, error } = await supabase
      .from("ingredients")
      .select("ingredient_name, type")
      .eq("ingredient_id", ingredient_id)
      .single();

    if (error) {
      // Handle the error
    }

    return data;
  }
}
