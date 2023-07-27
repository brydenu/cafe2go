import { useState, useEffect } from "react";
import SyrupOption from "./SyrupOption";

export default function SyrupCustomization({
  updateDrink,
  selectedDrink,
  zIndex,
}) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [numOfAdditionalSyrups, setNumOfAdditionalSyrups] = useState(0);

  useEffect(() => {
    const getOptions = async () => {
      const res = await fetch("api/ingredients/syrup");
      let { ingredientOptions } = await res.json();
      ingredientOptions.unshift({
        ingredient_id: 0,
        ingredient_name: "None",
        in_stock: true,
      });
      setOptions(ingredientOptions);
      setSelectedOption(ingredientOptions[0]);
      // console.log("selectionOption:", selectedOption);
    };
    getOptions();
  }, [selectedDrink]);

  // console.log("selectdOption", selectedOption);

  useEffect(() => {
    setNumOfAdditionalSyrups(0);
  }, [selectedDrink]);

  const addAdditionalSyrup = () => {
    if (numOfAdditionalSyrups < 2) {
      setNumOfAdditionalSyrups(numOfAdditionalSyrups + 1);
      console.log("added syrup");
    }
  };

  const subtractAdditionalSyrup = () => {
    if (numOfAdditionalSyrups > 0) {
      setNumOfAdditionalSyrups(numOfAdditionalSyrups - 1);
    }
  };

  return (
    <div className="w-full flex flex-col flex-nowrap justify-between items-center my-2">
      <SyrupOption
        options={options}
        updateDrink={updateDrink}
        numOfAdditionalSyrups={numOfAdditionalSyrups}
        selectedDrink={selectedDrink}
        addAdditionalSyrup={addAdditionalSyrup}
        subtractAdditionalSyrup={subtractAdditionalSyrup}
        zIndex={zIndex}
      />
      {numOfAdditionalSyrups > 0 && (
        <>
          <SyrupOption
            options={options}
            additionalSyrup={1}
            numOfAdditionalSyrups={numOfAdditionalSyrups}
            selectedDrink={selectedDrink}
            updateDrink={updateDrink}
            addAdditionalSyrup={addAdditionalSyrup}
            subtractAdditionalSyrup={subtractAdditionalSyrup}
            zIndex={zIndex - 1}
          />
          {numOfAdditionalSyrups > 1 && (
            <SyrupOption
              options={options}
              additionalSyrup={2}
              selectedDrink={selectedDrink}
              updateDrink={updateDrink}
              subtractAdditionalSyrup={subtractAdditionalSyrup}
              zIndex={zIndex - 2}
            />
          )}
        </>
      )}
    </div>
  );
}
