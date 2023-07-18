import { pool } from "db/db";
import { supabase } from "db/db";

export default async function patchInProgressOrder(orderId, undo = false) {
  if (process.env.ENVIRONMENT === "dev") {
    // Original code
    const response = await pool.query(`
      UPDATE orders
      SET in_progress = ${undo}, completed_date = NOW() 
      WHERE order_id=${orderId}
    `);

    return response.rows[0];
  } else {
    // Supabase code
    const { data, error } = await supabase
      .from("orders")
      .update({ in_progress: undo, completed_date: new Date() })
      .eq("order_id", orderId)
      .single();

    if (error) {
      // Handle the error
    }

    return data;
  }
}
