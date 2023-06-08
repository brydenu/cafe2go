import { pool } from "db/db"

export default async function getCustomerName(customer_id) {
    const response = await pool.query(`SELECT first_name, last_name FROM users WHERE user_id = ${customer_id}`);
    const customerName = response.rows[0];
    return customerName;
}
