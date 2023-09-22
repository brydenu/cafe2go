import { pool } from "db/db";
import { supabase } from "db/db";

export default async function getOrderById(order_id) {
  // if (process.env.ENVIRONMENT === "dev") {
  //   // Original code
  //   let order = await pool.query(
  //     `SELECT * FROM orders WHERE order_id = ${order_id}`
  //   );
  //   return order.rows[0];
  // } else {
  // Supabase code
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("order_id", order_id)
    .single();

  if (error) {
    // Handle the error
  }

  return data;
  // }
}
