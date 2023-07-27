import { pool, supabase } from "db/db";

export default async function getMenu(menu_id) {
  if (process.env.ENVIRONMENT === "dev") {
    // Original code
    let response;
    if (menu_id) {
      response = await pool.query(
        `SELECT drink_name FROM menu WHERE menu_id = ${menu_id}`
      );
      return response.rows[0];
    } else {
      response = await pool.query("SELECT * FROM menu");
    }
    return response.rows;
  } else {
    // Supabase code
    if (menu_id) {
      const { data, error } = await supabase
        .from("menu")
        .select("drink_name")
        .eq("menu_id", menu_id)
        .single();

      if (error) {
        // Handle the error
      }

      return data;
    } else {
      const { data, error } = await supabase.from("menu").select("*");

      if (error) {
        // Handle the error
      }

      return data;
    }
  }
}
