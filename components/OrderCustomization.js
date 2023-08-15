import { useEffect } from "react";
import { BeatLoader } from "react-spinners";
import IngredientOption from "./IngredientOption";
import SyrupCustomization from "./SyrupCustomization";

export default function OrderCustomization({
  customizations,
  updateDrink,
  selectedDrink,
  bevType,
  addShots,
  selectedCustomizations,
}) {
  const shotsCustomization = {
    customization_name: "num_shots",
    customization_label: "Number of shots",
    customization_ingredient: "shots",
    shot_options: [
      { ingredient_name: 0, in_stock: true, shots_option: true },
      { ingredient_name: 1, in_stock: true, shots_option: true },
      { ingredient_name: 2, in_stock: true, shots_option: true },
      { ingredient_name: 3, in_stock: true, shots_option: true },
      { ingredient_name: 4, in_stock: true, shots_option: true },
      { ingredient_name: 5, in_stock: true, shots_option: true },
      { ingredient_name: 6, in_stock: true, shots_option: true },
      { ingredient_name: 7, in_stock: true, shots_option: true },
      { ingredient_name: 8, in_stock: true, shots_option: true },
    ],
  };

  useEffect(() => {
    if (!selectedCustomizations.num_shots) {
      updateDrink(
        shotsCustomization.customization_name,
        shotsCustomization.selectedOption
      );
    }
  }, []);

  return (
    <div className="w-full flex flex-col w-full bg-white justify-center items-center mb-2">
      {!(customizations.length > 0) ? (
        <div className="py-5">
          <BeatLoader
            color="#32A5DC"
            size={12}
            loading={true}
            aria-label="Loading Spinner"
          />
        </div>
      ) : (
        <>
          {(bevType === "coffee" || addShots === true) && (
            <IngredientOption
              customization={shotsCustomization}
              updateDrink={updateDrink}
              selectedDrink={selectedDrink}
              zIndex={100}
            />
          )}
          {customizations.map((customization, index) => {
            const zIndex = 90 - index * 3;
            if (customization.customization_ingredient !== "syrup") {
              return (
                <>
                  <IngredientOption
                    customization={customization}
                    key={customization.customization_id}
                    updateDrink={updateDrink}
                    selectedDrink={selectedDrink}
                    zIndex={zIndex}
                  />
                  <hr />
                </>
              );
            } else {
              return (
                <SyrupCustomization
                  customization={customization}
                  key={customization.customization_customization_id}
                  updateDrink={updateDrink}
                  selectedDrink={selectedDrink}
                  zIndex={zIndex}
                />
              );
            }
          })}
        </>
      )}
    </div>
  );
}
