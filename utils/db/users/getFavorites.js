import { supabase } from "db/db";

export default async function getFavorites(user_id) {
    // Supabase code
    const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user_id)
        .order("favorite_id", { ascending: false });

    if (error) {
        // Handle the error
        console.log("error", error);
    }

    return data;
}
