import { supabase } from "db/db";
import buildOrderObject from "../orders/buildOrderObject";

export default async function addNewFavorite(favoriteData) {
    // Supabase code
    const favoriteObject = buildOrderObject(favoriteData);
    // console.log("drinkData.drink:", drinkData.drink);
    const { data, error } = await supabase
        .from("favorites")
        .insert(favoriteObject);
    if (error) {
        // Handle the error
        console.error(error);
    }
    return data[0];
}
