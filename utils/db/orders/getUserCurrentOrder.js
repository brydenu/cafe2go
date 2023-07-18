import { pool } from "db/db";
import { supabase } from "db/db";
import { isWithinInterval, subHours } from "date-fns";

export default async function getUserCurrentOrder(id) {
  if (process.env.ENVIRONMENT === "dev") {
    // Original code
    const res = await pool.query(`
        SELECT * from orders
        WHERE user_id = ${id}
        ORDER BY order_id DESC
        LIMIT 1;
    `);
    const order = res.rows[0];
    const currentDate = new Date();
    const twoHoursAgo = subHours(currentDate, 1);
    const isWithinLastTwoHours = isWithinInterval(order?.ordered_date, { start: twoHoursAgo, end: currentDate });
    if (order?.inProgress || isWithinLastTwoHours) {
        return order;
    } else {
        return null;
    }
  } else {
    // Supabase code
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", id)
      .order("order_id", { ascending: false })
      .limit(1);

    if (error) {
      // Handle the error
    }

    const order = data[0];
    const currentDate = new Date();
    const twoHoursAgo = subHours(currentDate, 1);
    const isWithinLastTwoHours = isWithinInterval(order?.ordered_date, { start: twoHoursAgo, end: currentDate });
    if (order?.inProgress || isWithinLastTwoHours) {
        return order;
    } else {
        return null;
    }
  }
}
