import { pool } from "db/db";
import { supabase } from "db/db";

export default async function getCustomerName(customer_id) {
  if (process.env.ENVIRONMENT === "dev") {
    // Original code
    const response = await pool.query(`SELECT first_name, last_name FROM users WHERE user_id = ${customer_id}`);
    const customerName = response.rows[0];
    return customerName;
  } else {
    // Supabase code
    const { data, error } = await supabase
      .from("users")
      .select("first_name, last_name")
      .eq("user_id", customer_id)
      .single();

    if (error) {
      // Handle the error
    }

    return data;
  }
}
