import { supabase } from "db/db";

export default async function getOrderHistory(user_id) {
  // Supabase code
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user_id)
    .order("order_id", { ascending: false });

  if (error) {
    // Handle the error
  }

  return data;
}
