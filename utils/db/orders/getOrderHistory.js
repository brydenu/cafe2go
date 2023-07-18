import { pool } from "db/db";
import { supabase } from "db/db";

export default async function getOrderHistory(user_id) {
  if (process.env.ENVIRONMENT === "dev") {
    // Original code
    const res = await pool.query(`
      SELECT * FROM orders
      WHERE user_id = ${user_id};
    `);

    return res.rows;
  } else {
    // Supabase code
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      // Handle the error
    }

    return data;
  }
}
