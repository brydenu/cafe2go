import { pool } from "db/db";
import { supabase } from "db/db";
import checkForQuantities from "utils/checkForQuantities";

export default async function CreateNewOrder(data) {
  if (process.env.ENVIRONMENT === "dev") {
    // Original code
    console.log("data:", data);
    const drink = data.drink;
    const userId = data.user_id;

    let allColumns = Object.keys(drink);
    let columns = ["user_id"];
    for (let columnName of allColumns) {
      if (drink[columnName]?.ingredient_id !== 0) {
        columns.push(columnName);
      }
    }
    columns = checkForQuantities(columns);

    const valuesObjects = Object.values(drink);
    let values = [userId];
    for (let value of valuesObjects) {
      if (value.shots_option) {
        values.push(value.ingredient_name);
      } else if (typeof value === "boolean") {
        values.push(value);
      } else if (!!value.quantity) {
        values.push(value.ingredient_id);
        values.push(value.quantity);
      } else if (!!value.ingredient_id) {
        values.push(value.ingredient_id);
      } else if (!!value.menu_id) {
        values.push(value.menu_id);
      } else if (!!value.ingredient_name && value.ingredient_name !== "None") {
        values.push(value.ingredient_name);
      }
    }

    let columnsString = columns.shift();
    while (columns.length > 0) {
      columnsString = columnsString + ", " + columns.shift();
    }

    const query = {
      text: `INSERT INTO orders (${columnsString}) VALUES (${generatePlaceholders(values)}) RETURNING order_id`,
      values: values
    };

    const response = await pool.query(query);
    console.log("response.rows[0]:", response.rows[0]);
    return response.rows[0];
  } else {
    // Supabase code
    const { data, error } = await supabase.from("orders").insert(data);

    if (error) {
      // Handle the error
    }

    return data[0];
  }
}

function generatePlaceholders(values) {
  return values.map((_, i) => `$${i + 1}`).join(",");
}
