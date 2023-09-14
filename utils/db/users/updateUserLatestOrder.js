import { supabase } from "db/db";

export default async function updateUserLatestOrder(userId, latestOrderId) {
  try {
    // Get the current date and time
    const now = new Date();

    // Define the updates object
    const updates = {
      latest_order_id: latestOrderId,
      latest_order_date: now.toISOString(), // Convert to ISO format
    };

    // Update the "users" table for the specified user ID
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      // Successfully updated the user's information
      console.log(`User with ID ${userId} updated.`);
    } else {
      // User with the specified ID not found
      console.log(`User with ID ${userId} not found.`);
    }
  } catch (error) {
    console.error("Error updating user:", error.message);
  }
}
