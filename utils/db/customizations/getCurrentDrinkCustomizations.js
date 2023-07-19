import { pool, supabase } from "db/db";

export default async function getCurrentDrinkCustomizations(menu_id) {
  if (process.env.ENVIRONMENT === "dev") {
    // Original code
    const response = await pool.query(`
        SELECT c.* 
        FROM menu_customizations mc 
        JOIN customizations c 
        ON mc.customization_id = c.customization_id 
        WHERE mc.menu_id = ${menu_id};
    `);
    const customizations = response.rows;
    console.log("customizations from dev:", customizations);
    return customizations;
  } else {
    // Supabase code
    const { data, error } = await supabase
      .from("menu_customizations")
      .select("customizations(*)")
      .eq("menu_id", menu_id);

    if (error) {
      // Handle the error
    }
    const customizations = data.map((item) => item.customizations);
    console.log("customizations from prod", customizations);

    return data.map((item) => item.customizations);
  }
}
