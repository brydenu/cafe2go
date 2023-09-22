import { pool } from "db/db";
import { supabase } from "db/db";
import buildOrderObject from "./buildOrderObject";
import buildOrderQuery from "./buildOrderQuery";

export default async function CreateNewOrder(drinkData) {
  // if (process.env.ENVIRONMENT === "dev") {
  //   const { columnsString, values } = buildOrderQuery(drinkData);

  //   const query = {
  //     text: `INSERT INTO orders (${columnsString}) VALUES (${generatePlaceholders(
  //       values
  //     )}) RETURNING order_id`,
  //     values: values,
  //   };
  //   // Hi Bryden
  //   const response = await pool.query(query);
  //   return response.rows[0];
  // } else {
  // Supabase code
  const orderObject = buildOrderObject(drinkData);
  // console.log("drinkData.drink:", drinkData.drink);
  const { data, error } = await supabase.from("orders").insert(orderObject);
  if (error) {
    // Handle the error
  }
  // I hope you are having a good day
  return data[0];
  // }
}

function generatePlaceholders(values) {
  return values.map((_, i) => `$${i + 1}`).join(",");
}
