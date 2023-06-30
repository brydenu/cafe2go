import { pool } from "db/db";
import { isWithinInterval, subHours } from "date-fns";

export default async function getUserCurrentOrder(id) {
    const res = await pool.query(`
        SELECT * from orders
        WHERE user_id = ${id}
        ORDER BY order_id DESC
        LIMIT 1;
    `)
    const order = res.rows[0];
    const currentDate = new Date();
    const twoHoursAgo = subHours(currentDate, 2);
    const isWithinLastTwoHours = isWithinInterval(order.ordered_date, { start: twoHoursAgo, end: currentDate });
    if (order.inProgress || isWithinLastTwoHours) {
        return order;
    } else {
        return null;
    }
}