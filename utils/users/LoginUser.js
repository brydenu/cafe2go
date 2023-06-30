import { pool } from "db/db";
import bcrypt from "bcrypt";

export default async function LoginUser({ email, password }){

    try {
        const res = await pool.query(`
        SELECT user_id, email, password FROM users
        WHERE email = '${email}';
        `);
        const user = res.rows[0];
        
        const validated = await bcrypt.compare(password, user.password);
        if (validated) {
            return user.user_id
        } else {
            throw new Error("Invalid password");
        }

    } catch (e) {
        // handle error here
        console.error("error:", e)
    }
}