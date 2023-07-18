import { pool } from "db/db";
import { supabase } from "db/db";
import bcrypt from "bcrypt";

export default async function LoginUser({ email, password }) {
  if (process.env.ENVIRONMENT === "dev") {
    // Original code
    try {
      const res = await pool.query(`
        SELECT user_id, email, password FROM users
        WHERE email = '${email}';
      `);
      const user = res.rows[0];

      const validated = await bcrypt.compare(password, user.password);
      if (validated) {
        return user.user_id;
      } else {
        throw new Error("Invalid password");
      }
    } catch (e) {
      // handle error here
      console.error("error:", e);
    }
  } else {
    // Supabase code
    try {
      const { data, error } = await supabase
        .from("users")
        .select("user_id, email, password")
        .eq("email", email)
        .single();

      if (error) {
        // Handle the error
        throw new Error("An error occurred while fetching the user");
      }

      const user = data;

      const validated = await bcrypt.compare(password, user.password);
      if (validated) {
        return user.user_id;
      } else {
        throw new Error("Invalid password");
      }
    } catch (e) {
      // handle error here
      console.error("error:", e);
    }
  }
}
