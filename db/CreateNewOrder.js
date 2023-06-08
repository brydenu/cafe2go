import { pool } from "db/db";
import checkForQuantities from "helpers/checkForQuantities";

export default async function CreateNewOrder(data) {
    const drink = data.drink;
    // console.log("drink:", drink);
    let allColumns = Object.keys(drink);
    let columns = [];
    for (let columnName of allColumns) {
        if (drink[columnName]?.ingredient_id !== 0) {
            columns.push(columnName);
        }
    }
    columns = checkForQuantities(columns);

    const valuesObjects = Object.values(drink);
    let values = [];
    for (let value of valuesObjects) {
        if (!!value.quantity) {
            values.push(value.ingredient_id);
            values.push(value.quantity);
        } else if (!!value.ingredient_id) {
            values.push(value.ingredient_id);
        } else if (!!value.menu_id) {
            values.push(value.menu_id);
        }
    }

    let columnsString = columns.shift();
    while (columns.length > 0) {
        columnsString = columnsString + ", " + columns.shift();
    }

    const query = {
        text: `INSERT INTO orders (${columnsString}) VALUES (${generatePlaceholders(values)})`,
        values: values
      };

    let response = await pool.query(query);
    console.log("response:", response);
    return response;
}

function generatePlaceholders(values) {
    return values.map((_, i) => `$${i + 1}`).join(',');
  }
