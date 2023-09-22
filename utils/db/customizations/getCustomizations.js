import { pool } from "db/db";
import { supabase } from "db/db";

export default async function getCustomizations() {
  // Supabase code
  const { data, error } = await supabase.from("customizations").select("*");

  if (error) {
    // Handle the error
  }

  return data;
}
