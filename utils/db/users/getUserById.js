import { pool, supabase } from "db/db";

export default async function getUserById(id) {
  const { data, error } = await supabase
    .from("users")
    .select(
      "user_id, first_name, last_name, email, phone_number, latest_order_id, latest_order_date"
    )
    .eq("user_id", id)
    .single();

  if (error) {
    // Handle the error
  }

  return data;
}
