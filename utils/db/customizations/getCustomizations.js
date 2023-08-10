import { pool } from "db/db";
import { supabase } from "db/db";

export default async function getCustomizations() {
  if (process.env.ENVIRONMENT === "dev") {
    // Original code
    let response = await pool.query("SELECT * FROM customizations");
    return response.rows;
  } else {
    // Supabase code
    const { data, error } = await supabase.from("customizations").select("*");

    if (error) {
      // Handle the error
    }

    return data;
  }
}
