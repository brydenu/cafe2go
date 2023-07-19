import { pool, supabase } from "db/db";
import createDrinkLabel from "utils/createDrinkLabel";

export default async function getInProgressOrders() {
  if (process.env.ENVIRONMENT === "dev") {
    // Original code
    let response = await pool.query(`
        SELECT * FROM orders
        WHERE in_progress = true
    `);
    const ordersRes = response.rows;
    let orders = [];
    for (let order of ordersRes) {
      const label = await createDrinkLabel(order);
      orders.push(label);
    }
    return orders;
  } else {
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
