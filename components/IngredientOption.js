import { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import QuantityChanger from "./QuantityChanger";

export default function IngredientOption({ customization, updateDrink, selectedDrink }) {
    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState({});
    const [quantity, setQuantity] = useState("");

    
    const { customization_name, customization_label, customization_ingredient } = customization;
    
    // console.log("selectedOption:", selectedOption);
    // console.log("customizations:", customization);

    // console.log("selectedDrink", selectedDrink)

    useEffect(() => {
        const getOptions = async () => {
                if (customization_ingredient !== "shots") {
                    const res = await fetch(`api/ingredients/${customization_ingredient}`);
                    let {ingredientOptions} = await res.json();
                    ingredientOptions.unshift({"ingredient_id": 0, "ingredient_name": "None", "in_stock": true })
                    setOptions(ingredientOptions);
                    setSelectedOption(ingredientOptions[0]);
                    // console.log("selectionOption:", selectedOption);
                } else {
                    setOptions(customization.shot_options);
                    setSelectedOption(customization.shot_options[2]);
                }
            }
            getOptions();
        
        if (customization_ingredient === "syrup") {
            setQuantity(4);
        } else if (customization_ingredient === "topping") {
            setQuantity("normal");
        } else {
            setQuantity(null);
        }
    },[selectedDrink]);

    // console.log("selectdOption", selectedOption);
    
    useEffect(() => {
        updateDrink(customization_name, selectedOption);
        }, [selectedOption, selectedDrink]);

    const handleChange = (e) => {
        setSelectedOption(e);
    }

    return (
        <div className="w-full flex flex-nowrap justify-between items-center my-2">
            <label className="text-xl">{customization_label}</label>
            <div className="flex flex-nowrap flex-row items-center">
                {customization_ingredient === "syrup" && selectedOption.ingredient_name !== "None" && (
                    <>
                        <QuantityChanger quantity={quantity} setQuantity={setQuantity} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                        <div className="mx-2 text-xl">pumps of</div>
                    </>
                )}
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
                        <Listbox.Options className="z-10 shadow absolute bg-white rounded max-h-64 overflow-auto">
                            {options.length > 1 && options.map((option) => (
                                <Listbox.Option
                                    key={option.ingredient_id}
                                    value={option}
                                    disabled={!option.in_stock}
                                    className="hover:cursor-pointer px-5 py-1 rounded hover:bg-blfs-teal hover:text-white text-center text-xl"
                                >
                                    {({active}) => (
                                        <div
                                            className={`${active && "bg-blfs-teal text-white"}`}
                                        >
                                            {option.ingredient_name}
                                        </div>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </Listbox>
            </div>
        </div>
    )
}