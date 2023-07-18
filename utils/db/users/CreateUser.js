import { pool } from "db/db";
import { supabase } from "db/db";
import bcrypt from 'bcrypt';

export default async function CreateUser(user) {
  if (process.env.ENVIRONMENT === "dev") {
    // Original code
    const { password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    user["password"] = hashedPassword;
    const values = Object.values(user);

    const columns = Object.keys(user);
    let columnsString = columns.shift();
    while (columns.length > 0) {
      columnsString = columnsString + ", " + columns.shift();
    }

    const query = {
      text: `INSERT INTO users (${columnsString}) VALUES (${generatePlaceholders(values)}) RETURNING user_id;`,
      values: values
    };

    const response = await pool.query(query);

    console.log("response:", response);
    return response.rows[0];
  } else {
    // Supabase code
    const { data, error } = await supabase.from("users").insert(user, { returning: "minimal" });

    if (error) {
      // Handle the error
    }

    console.log("data:", data);

    return data[0];
  }
}

function generatePlaceholders(values) {
  return values.map((_, i) => `$${i + 1}`).join(",");
}
