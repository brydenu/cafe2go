import { supabase } from "db/db";

export default async function deleteFavorite(user_id, favorite_id) {
    // Supabase code
    const { data, error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user_id)
        .eq("favorite_id", favorite_id);

    if (error) {
        // Handle the error
        console.log("error deleting favorite", error);
    }

    return data;
}
