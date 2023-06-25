import { pool } from "db/db"

export default async function getIngredientById(ingredient_id) {
    let ingredient = await pool.query(`SELECT ingredient_name, type FROM ingredients WHERE ingredient_id = ${ingredient_id}`);
    return ingredient.rows[0];
}
