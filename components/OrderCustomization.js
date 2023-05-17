import { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import IngredientOption from "./IngredientOption";
import DrinkOption from "./DrinkOption";

export default function OrderCustomization({ label, options, ingredient=true }) {
    const formattedOptions = ingredient ? options.map((option) => ({
        id: option.ingredient_id,
        disabled: !option.in_stock,
        name: option.ingredient_name,
    })) : options.map((option) => ({
        id: option.drink_id,
        disabled: !option.in_stock,
        name: option.drink_name
    }));
    
    const [selectedOption, setSelectedOption] = useState(formattedOptions[0]);


    return (
        <div className="w-full flex flex-nowrap justify-between my-2">
            <label className="text-xl">{label}</label>
            <div className="">
                <Listbox value={selectedOption} onChange={setSelectedOption}>
                    <Listbox.Button className="border text-xl pr-1 pl-3 py-1 rounded flex flex-nowrap justify-between items-center gap-3">
                        {selectedOption.name}
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
                            {formattedOptions.map((option) => (
                                <Listbox.Option
                                    key={option.id}
                                    value={option}
                                    disabled={option.disabled}
                                    className="hover:cursor-pointer px-10 py-1 rounded hover:bg-blfs-teal hover:text-white text-center text-xl"
                                >
                                    {({active}) => (
                                        <div
                                            className={`${active && "bg-blfs-teal text-white"}`}
                                        >
                                            {option.name}
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