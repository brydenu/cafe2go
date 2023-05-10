import { pool } from "db/db"

export default async function getIngredients() {
    let milks = await pool.query("SELECT * FROM ingredients WHERE type = 'milk'");
    let syrups = await pool.query("SELECT * FROM ingredients WHERE type = 'syrup'");
    let toppings = await pool.query("SELECT * FROM ingredients WHERE type = 'topping'");
    let teas = await pool.query("SELECT * FROM ingredients WHERE type = 'tea'");
    let packetSweeteners = await pool.query("SELECT * FROM ingredients WHERE type = 'packet_sweetener'");
    return {
        milks: milks.rows,
        syrups: syrups.rows,
        toppings: toppings.rows,
        teas: teas.rows,
        packetSweeteners: packetSweeteners.rows
    }
}
