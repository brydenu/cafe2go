import { pool, supabase } from "db/db";

export default async function getGuestUser() {
  const environment = process.env.ENVIRONMENT;
  if (process.env.ENVIRONMENT === "dev") {
    // Original code
    const res = await pool.query(`
      SELECT user_id, first_name, last_name, email, phone_number
      FROM users
      WHERE user_id = 1`); // user_id 1 is guest

    const user = res.rows[0];
    return user;
  } else {
    // Supabase code
    const { data, error } = await supabase
      .from("users")
      .select("user_id, first_name, last_name, email, phone_number")
      .eq("user_id", 1)
      .single();

    if (error) {
      // Handle the error
    }

    return data;
  }
}
