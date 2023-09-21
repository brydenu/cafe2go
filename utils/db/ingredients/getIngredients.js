import { pool, supabase } from "db/db";

export default async function getIngredients() {
  // if (process.env.ENVIRONMENT === "dev") {
  //   // Original code
  //   const milks = await pool.query(
  //     "SELECT * FROM ingredients WHERE type = 'milk'"
  //   );
  //   const syrups = await pool.query(
  //     "SELECT * FROM ingredients WHERE type = 'syrup'"
  //   );
  //   const toppings = await pool.query(
  //     "SELECT * FROM ingredients WHERE type = 'topping'"
  //   );
  //   const teas = await pool.query(
  //     "SELECT * FROM ingredients WHERE type = 'tea'"
  //   );
  //   const packetSweeteners = await pool.query(
  //     "SELECT * FROM ingredients WHERE type = 'packet_sweetener'"
  //   );

  //   return {
  //     milks: milks.rows,
  //     syrups: syrups.rows,
  //     toppings: toppings.rows,
  //     teas: teas.rows,
  //     packetSweeteners: packetSweeteners.rows,
  //   };
  // } else {
  // Supabase code
  const { data: milks, error: milksError } = await supabase
    .from("ingredients")
    .select("*")
    .eq("type", "milk");

  const { data: syrups, error: syrupsError } = await supabase
    .from("ingredients")
    .select("*")
    .eq("type", "syrup");

  const { data: toppings, error: toppingsError } = await supabase
    .from("ingredients")
    .select("*")
    .eq("type", "topping");

  const { data: teas, error: teasError } = await supabase
    .from("ingredients")
    .select("*")
    .eq("type", "tea");

  const { data: packetSweeteners, error: packetSweetenersError } =
    await supabase
      .from("ingredients")
      .select("*")
      .eq("type", "packet_sweetener");

  if (
    milksError ||
    syrupsError ||
    toppingsError ||
    teasError ||
    packetSweetenersError
  ) {
    // Handle the errors
  }

  return {
    milks,
    syrups,
    toppings,
    teas,
    packetSweeteners,
  };
}
