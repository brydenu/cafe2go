import { pool, supabase } from "db/db";

export default async function getIngredientById(ingredient_id) {
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
