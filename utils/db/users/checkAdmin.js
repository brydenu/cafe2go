import { pool, supabase } from "db/db";
import { decodeToken } from "../../auth/auth";

export default async function checkAdmin(token) {
  // if (process.env.ENVIRONMENT === "dev") {
  //   // Original code
  //   const user = decodeToken(token);
  //   const userId = user.sub;
  //   const res = await pool.query(`
  //   SELECT admin
  //   FROM users
  //   WHERE user_id = ${userId}`);

  //   return res.rows[0];
  // } else {
  // Supabase code
  const user = decodeToken(token);
  const userId = user.sub;
  const { data, error } = await supabase
    .from("users")
    .select("admin")
    .eq("user_id", userId);

  if (error) {
    // Handle the error
  }

  return data[0];
  // }
}
