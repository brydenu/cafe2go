import { subHours, isWithinInterval, parseISO } from "date-fns";
import { supabase } from "db/db";
import createDrinkLabel from "utils/createDrinkLabel";

export default async function checkLatestOrder(orderId, orderTime) {
  //   console.log("orderId", orderId);
  //   console.log("orderTime", orderTime);
  const orderTimeDate = new Date(orderTime);
  const orderTimeAdjusted = subHours(orderTimeDate, 7);
  const latestOrder = { orderId, orderTime, orderTimeAdjusted, order: null };
  const now = new Date();
  const nowAdjusted = subHours(now, 7);
  const recentTimeDuration = subHours(nowAdjusted, 1);
  const orderIsRecent = isWithinInterval(orderTimeAdjusted, {
    start: recentTimeDuration,
    end: nowAdjusted,
  });
  //   const timeInfo = { recentTimeDuration, orderTimeAdjusted, orderIsRecent };
  //   latestOrder["timeInfo"] = timeInfo;

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
  const orderInfo = { info: latestOrder, isRecent: orderIsRecent };
  return orderInfo;
}
