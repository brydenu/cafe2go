import { pool } from "db/db";
import { supabase } from "db/db";
import bcrypt from "bcrypt";

export default async function CreateUser(user) {
  // Supabase code
  const lower = user.email.toLowerCase();
  user.email = lower;
  const { password } = user;
  const hashedPassword = await bcrypt.hash(password, 10);
  user["password"] = hashedPassword;
  const { data, error } = await supabase
    .from("users")
    .insert(user)
    .select("user_id");

  if (error) {
    // Handle the error
  }

  return data[0];
}

function generatePlaceholders(values) {
  return values.map((_, i) => `$${i + 1}`).join(",");
}
