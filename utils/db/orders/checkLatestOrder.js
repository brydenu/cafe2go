import { subHours, isWithinInterval, parseISO } from "date-fns";
import { supabase } from "db/db";
import createDrinkLabel from "utils/createDrinkLabel";

export default async function checkLatestOrder(orderId, orderTime) {
  console.log("orderId", orderId);
  //   console.log("orderTime", orderTime);
  const orderTimeISO = parseISO(orderTime);
  const orderTimeAdjusted = subHours(orderTimeISO, 7);
  const latestOrder = { orderId, orderTime, order: null };
  const now = new Date();
  const recentTimeDuration = subHours(now, 1);
  console.log("recentTimeDuration", recentTimeDuration);
  console.log("orderTimeISO", orderTimeISO);
  console.log("now", now);
  const orderIsRecent = isWithinInterval(orderTimeAdjusted, {
    start: recentTimeDuration,
    end: now,
  });
  console.log("orderIsRecent", orderIsRecent);
  if (orderIsRecent) {
    latestOrder["isRecent"] = true;
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("order_id", orderId)
      .single();

    if (error) {
      // Handle the error
    }

    const order = await createDrinkLabel(data);

    latestOrder.order = order;
  }
  return latestOrder;
}
