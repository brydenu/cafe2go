import { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import QuantityChanger from "./QuantityChanger";

export default function HotIcedOption({ updateDrink, selectedDrink, zIndex }) {
    const [options, setOptions] = useState([{"ingredient_name": "hot", "ingredient_label": "Hot"}, {"ingredient_name": "iced", "ingredient_label": "Iced"}]);
    const [selectedOption, setSelectedOption] = useState({"ingredient_name": "hot", "ingredient_label": "Hot"});
    
    const customization_name = "hot_iced";
    const customization_label = "Hot/Iced";

    console.log("selectdOption", selectedOption);
    
    useEffect(() => {
        updateDrink(customization_name, selectedOption);
        }, [selectedOption, selectedDrink]);

    const handleChange = (e) => {
        setSelectedOption(e);
    }

    return (
        <div className="w-full flex flex-nowrap justify-between items-center my-2" style={{ zIndex: 109}}>
            <label className="text-xl">{customization_label}</label>
            <div className="flex flex-nowrap flex-row items-center">
                <div className="relative">
                    <Listbox value={selectedOption} onChange={handleChange}>
                        <Listbox.Button className="border text-xl pr-1 pl-3 py-1 rounded flex flex-nowrap justify-between items-center gap-3">
                            {selectedOption.ingredient_label}
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
                                        key={option.ingredient_name}
                                        value={option}
                                        className={({ active })=> `hover:cursor-pointer px-5 py-1 rounded text-center text-xl z-50 ${active ? "bg-blfs-teal text-white" : ""}`}
                                    >
                                        {option.ingredient_label}
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