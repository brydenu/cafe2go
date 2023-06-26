import { pool } from "db/db";
import bcrypt from 'bcrypt';

export default async function CreateUser(user) {
    console.log("data in CreateUser:", user);
    const { password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    user["password"] = hashedPassword;
    console.log("user updated:", user);
    const values = Object.values(user);
    
    const columns = Object.keys(user);
    let columnsString = columns.shift();
    while (columns.length > 0) {
        columnsString = columnsString + ", " + columns.shift();
    }


    const query = {
        text: `INSERT INTO users (${columnsString}) VALUES (${generatePlaceholders(values)}) RETURNING user_id;`,
        values: values
    }

    const response = await pool.query(query);
    console.log("response.rows[0]:", response.rows[0]);
    return response.rows[0];
}

function generatePlaceholders(values) {
    return values.map((_, i) => `$${i + 1}`).join(',');
  }