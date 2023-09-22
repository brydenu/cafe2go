import { supabase } from "db/db";
import bcrypt from "bcrypt";

export default async function updateUser(user, userId) {
  const lower = user.email.toLowerCase();
  user.email = lower;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("user_id, password")
      .eq("user_id", userId)
      .single();

    const oldUser = data;

    const validated = await bcrypt.compare(user.password, oldUser.password);
    if (validated) {
      const updatedUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
      };
      if (user.new_password) {
        const hashed = await bcrypt.hash(user.new_password, 10);
        updatedUser["password"] = hashed;
      }

      const { data, error } = await supabase
        .from("users")
        .update(updatedUser)
        .eq("user_id", userId);

      const newUser = data;

      if (error) {
        // handle error
      }

      return newUser;
    } else {
      throw new Error("Invalid password");
    }
  } catch (e) {
    console.error(`error fetching user where id=${userId}.`, e);
  }
}
