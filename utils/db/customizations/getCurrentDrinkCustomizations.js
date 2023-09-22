import { pool, supabase } from "db/db";

export default async function getCurrentDrinkCustomizations(menu_id) {
  // Supabase code
  const { data, error } = await supabase
    .from("menu_customizations")
    .select("customizations(*)")
    .eq("menu_id", menu_id);

  if (error) {
    // Handle the error
  }
  const customizations = data.map((item) => item.customizations);

  return customizations;
}
