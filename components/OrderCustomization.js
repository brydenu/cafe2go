import IngredientOption from "./IngredientOption";
import SyrupCustomization from "./SyrupCustomization";

export default function OrderCustomization({ customizations, updateDrink, selectedDrink, bevType, addShots }) {

    const shotsCustomization = {
        "customization_name": "num_shots",
        "customization_label": "Number of shots",
        "customization_ingredient": "shots",
        "shot_options": [
            {"ingredient_name": 0, "in_stock": true, "shots_option": true},
            {"ingredient_name": 1, "in_stock": true, "shots_option": true},
            {"ingredient_name": 2, "in_stock": true, "shots_option": true},
            {"ingredient_name": 3, "in_stock": true, "shots_option": true},
            {"ingredient_name": 4, "in_stock": true, "shots_option": true},
            {"ingredient_name": 5, "in_stock": true, "shots_option": true},
            {"ingredient_name": 6, "in_stock": true, "shots_option": true},
            {"ingredient_name": 7, "in_stock": true, "shots_option": true},
            {"ingredient_name": 8, "in_stock": true, "shots_option": true},
        ]
    }

    return (
        <div className="w-full flex flex-col w-full bg-white justify-center items-center mb-2">
            { !(customizations.length > 0) ? 
            (<>
                <div className="m-10 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blfs-teal border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </>)
            : (<>{(bevType === "coffee" || addShots === true) && (
                <IngredientOption customization={shotsCustomization} updateDrink={updateDrink} selectedDrink={selectedDrink} zIndex={100} />
                ) 
                }
                {customizations.map((customization, index) => {
                    const zIndex = 90 - (index * 3);
                    if (customization.customization_ingredient !== "syrup") {

                        return (<>
                        <IngredientOption 
                            customization={customization} 
                            key={customization.customization_id} 
                            updateDrink={updateDrink} 
                            selectedDrink={selectedDrink} 
                            zIndex={zIndex}
                        />
                        <hr />
                    </>)
                    } else {
                        return (
                            <SyrupCustomization 
                                customization={customization}
                                key={customization.customization_customization_id} 
                                updateDrink={updateDrink} 
                                selectedDrink={selectedDrink} 
                                zIndex={zIndex}
                            />
                        )
                    }
                })}
                </>)
            }
        </div>
    )
}