import { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import QuantityChanger from "./QuantityChanger";

export default function IngredientOption({ customization, updateDrink, selectedDrink, zIndex }) {
    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState({});
    
    const { customization_name, customization_label, customization_ingredient } = customization;
    
    // console.log("selectedOption:", selectedOption);
    // console.log("customizations:", customization);

    // console.log("selectedDrink", selectedDrink)

    useEffect(() => {
        const getOptions = async () => {
                if (customization_ingredient !== "shots") {
                    const res = await fetch(`api/ingredients/${customization_ingredient}`);
                    let {ingredientOptions} = await res.json();
                    ingredientOptions.unshift({"ingredient_id": 0, "ingredient_name": "None", "in_stock": true });
                    if (customization_name === "milk_id") {
                        setOptions(ingredientOptions.slice(1));
                        setSelectedOption(ingredientOptions[1]);
                    } else {
                        setOptions(ingredientOptions);
                        setSelectedOption(ingredientOptions[0]);
                    }
                    // console.log("selectionOption:", selectedOption);
                } else {
                    setOptions(customization.shot_options);
                    setSelectedOption(customization.shot_options[2]);
                }
            }
            getOptions();
        
    },[selectedDrink]);

    // console.log("selectdOption", selectedOption);
    
    useEffect(() => {
        updateDrink(customization_name, selectedOption);
        }, [selectedOption, selectedDrink]);

    const handleChange = (e) => {
        setSelectedOption(e);
    }

    return (
        <div className="w-full flex flex-nowrap justify-between items-center my-2" style={{ zIndex: zIndex}}>
            <label className="text-xl">{customization_label}</label>
            <div className="flex flex-nowrap flex-row items-center">
                {customization_ingredient === "syrup" && selectedOption.ingredient_name !== "None" && (
                    <>
                        <QuantityChanger quantity={quantity} setQuantity={setQuantity} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                        <div className="mx-2 text-xl">pumps of</div>
                    </>
                )}
                <div className="relative">
                    <Listbox value={selectedOption} onChange={handleChange}>
                        <Listbox.Button className="border text-xl pr-1 pl-3 py-1 rounded flex flex-nowrap justify-between items-center gap-3">
                            {selectedOption && selectedOption.ingredient_name}
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Listbox.Button>
                        <Transition
                            enter="transition duration-200 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-100 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Listbox.Options as="div" className={`shadow absolute bg-white rounded max-h-64 overflow-auto absolute right-0 z-[${zIndex}]`}>
                                {options.length > 1 && options.map((option) => (
                                    <Listbox.Option
                                        as="div"
                                        key={option.ingredient_id}
                                        value={option}
                                        disabled={!option.in_stock}
                                        className={({ active })=> `hover:cursor-pointer px-5 py-1 rounded text-center text-xl z-50 ${active ? "bg-secondary text-white" : ""}`}
                                    >
                                        {option.ingredient_name}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </Listbox>
                </div>
            </div>
        </div>
    )
}