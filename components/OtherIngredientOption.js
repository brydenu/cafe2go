import { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function OtherIngredientOption({ customization }) {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");

    const { customization_name, customization_label, customization_ingredient } = customization;
    // console.log("customizations in otheringredientOption", customization);

    if (customization_ingredient === "packet_amount") {
        // setOptions([".5 pack", "1 pack", "1.5 packs", "2 packs", "2.5 packs", "3 packs"]);
        // setSelectedOption(".5 pack");
    }

    return (
        <div className="w-full flex flex-nowrap justify-between items-center my-2">
            <label className="text-xl">{customization_label}</label>
            <div className="">
                <Listbox value={selectedOption} onChange={setSelectedOption}>
                    <Listbox.Button className="border text-xl pr-1 pl-3 py-1 rounded flex flex-nowrap justify-between items-center gap-3">
                        {selectedOption}
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
                                    key={option}
                                    value={option}
                                    className="hover:cursor-pointer px-10 py-1 rounded hover:bg-secondary hover:text-white text-center text-xl"
                                >
                                    {({active}) => (
                                        <div
                                            className={`${active && "bg-secondary text-white"}`}
                                        >
                                            {option}
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