import { pool } from "db/db";
import { supabase } from "db/db";
import bcrypt from "bcrypt";

export default async function LoginUser({ email, password }) {
  const lower = email.toLowerCase();
  try {
    const { data, error } = await supabase
      .from("users")
      .select("user_id, email, password")
      .eq("email", lower)
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
