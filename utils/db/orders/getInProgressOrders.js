import { pool, supabase } from "db/db";
import createDrinkLabel from "utils/createDrinkLabel";

export default async function getInProgressOrders() {
  if (process.env.ENVIRONMENT === "dev") {
    // Supabase code
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("in_progress", true);

    if (error) {
      // Handle the error
    }

    const orders = [];
    for (let order of data) {
      const label = await createDrinkLabel(order);
      orders.push(label);
    }
    return orders;
  }
}
