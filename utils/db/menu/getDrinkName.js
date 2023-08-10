import { pool, supabase } from "db/db";

export default async function getDrinkName(menu_id) {
  if (process.env.ENVIRONMENT === "dev") {
    // Original code
    const response = await pool.query(
      `SELECT drink_name FROM menu WHERE menu_id = ${menu_id}`
    );
    const drinkName = response.rows[0].drink_name;
    return drinkName;
  } else {
    // Supabase code
    const { data, error } = await supabase
      .from("menu")
      .select("drink_name")
      .eq("menu_id", menu_id)
      .single();

    if (error) {
      // Handle the error
    }

    const drinkName = data.drink_name;
    return drinkName;
  }
}
