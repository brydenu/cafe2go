import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import getDrinkName from "./menu/getDrinkName";
import getCustomerName from "./getCustomerName";
import getIngredientById from "./ingredients/getIngredientById";

/**
 * 
 * Takes order format given from front end and returns a readable format to be
 * used by barista
 * 
 * takes a data object
 * 
 * should return an object with 3 properties:
 *  -id (int) -> order_id
 *  -customerName (string) -> name of customer
 *  -drinkName (string) -> name of drink
 *  -customizations (array) -> customizations to be listed for the drink 
 * 
*/

export default async function createDrinkLabel(data) {
    console.log("data", data);
    const customer = await getCustomerName(data.user_id);
    const customerName = customer.first_name + " " + customer.last_name.substr(0,1);
    const date = new Date(data.ordered_date);
    const order_time = format(date, "h:mm a");
    const duration = formatDistanceToNow(date);
    let drinkName = await getDrinkName(data.menu_id);
    if (data.hot_iced === "iced") drinkName = "Iced" + " " + drinkName;
    const label = {
        "id": data.order_id,
        order_time,
        customerName,
        duration,
        drinkName,
        in_progress: data.in_progress,
    };
    const nonCustomizations = ["ordered_date", "user_id", "menu_id", "in_progress", "order_id"];
    const quantitityCustomizations = ["syrup1_pumps", "syrup2_pumps", "syrup3_pumps"];
    const customizationKeys = Object.keys(data);
    // console.log("customizationKeys", customizationKeys);
    const customizations = [];
    for (let key of customizationKeys) {
        if (!!data[key]) {
            if (key === "num_shots") {
                customizations.push(`${data[key]} shots`);
            } else if (key === "decaf" && !!data[key]){
                customizations.push("Decaf");
            } else if (key === "hot_iced"){
                if (data[key] === "iced") {
                    customizations.push("Iced");
                }
            } else if (key === "custom_temp" && !!data[key]) {
                customizations.push(data[key]);
            } else if (!nonCustomizations.includes(key) && !quantitityCustomizations.includes(key)) {
                const ingredient_id = data[key];
                const ingredient = await getIngredientById(ingredient_id);
                customizations.push(`${ingredient.ingredient_name} ${ingredient.type}`);
            } else if (quantitityCustomizations.includes(key)) {
                const lastIngredient = customizations[customizations.length-1];
                customizations[customizations.length-1] = `${data[key]} ${lastIngredient}`;
            }
        }
    }
    label["customizations"] = customizations;
    return label;

}