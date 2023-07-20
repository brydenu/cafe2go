import { pool, supabase } from "db/db";

export default async function getUserById(id) {
  const environment = process.env.ENVIRONMENT;
  console.log("environment:", environment);
  if (process.env.ENVIRONMENT === "dev") {

    // Original code
    const res = await pool.query(`
      SELECT user_id, first_name, last_name, email, phone_number
      FROM users
      WHERE user_id = ${id}`);
      
    const user = res.rows[0];
    return user;
  } else {
    // Supabase code
    const { data, error } = await supabase
      .from("users")
      .select("user_id, first_name, last_name, email, phone_number")
      .eq("user_id", id)
      .single();

    if (error) {
      // Handle the error
    }

    return data;
  }
}
