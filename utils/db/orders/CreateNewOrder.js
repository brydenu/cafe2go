import { pool } from "db/db";
import { supabase } from "db/db";
import buildOrderObject from "./buildOrderObject";
import buildOrderQuery from "./buildOrderQuery";

export default async function CreateNewOrder(drinkData, isQuickOrder = false) {
    //   // Hi Bryden

    // Supabase code
    const orderObject = buildOrderObject(drinkData, isQuickOrder);
    // console.log("drinkData.drink:", drinkData.drink);
    const { data, error } = await supabase.from("orders").insert(orderObject);
    if (error) {
        // Handle the error
        console.error(error);
    }
    // I hope you are having a good day
    return data[0];
    // }
}

function generatePlaceholders(values) {
    return values.map((_, i) => `$${i + 1}`).join(",");
}
