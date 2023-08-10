/**
 *
 * @param {Array} customizationsArray
 *
 * Traverses customization array looking for any properties that
 * should be attached to a quantity amount (syrup => pumps, topping => amount)
 * updates the array to account for the additional columns of info
 * that will be added to the SQL table.
 *
 */

export default function checkForQuantities(customizationsArray) {
  for (let i = 0; i < customizationsArray.length; i++) {
    switch (customizationsArray[i]) {
      case "syrup1_id":
        customizationsArray.splice(i + 1, 0, "syrup1_pumps");
        break;
      case "syrup2_id":
        customizationsArray.splice(i + 1, 0, "syrup2_pumps");
        break;
      case "syrup3_id":
        customizationsArray.splice(i + 1, 0, "syrup3_pumps");
        break;
      case "topping1_id":
        customizationsArray.splice(i + 1, 0, "topping1_quantity");
        break;
      case "topping2_id":
        customizationsArray.splice(i + 1, 0, "topping2_quantity");
        break;
      case "topping3_id":
        customizationsArray.splice(i + 1, 0, "topping3_quantity");
        break;
      case "topping4_id":
        customizationsArray.splice(i + 1, 0, "topping4_quantity");
        break;
    }
  }

  return customizationsArray;
}
