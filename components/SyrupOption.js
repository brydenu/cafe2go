import { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, MinusCircleIcon } from '@heroicons/react/20/solid';
import QuantityChanger from "./QuantityChanger";

export default function SyrupOption({ options, additionalSyrup=0, updateDrink, addAdditionalSyrup, subtractAdditionalSyrup, selectedDrink, numOfAdditionalSyrups, zIndex }) {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [quantity, setQuantity] = useState(4);
    const [minusSyrupHovered, setMinusSyrupHovered] = useState(false);
    const [syrups, setSyrups] = useState(options);
    // console.log("additionalSyrup", additionalSyrup)

    // console.log("options:", options);

    const customization_name = additionalSyrup === 0 ? "syrup1_id" : additionalSyrup === 1 ? "syrup2_id" : "syrup3_id";
    const customization_label = additionalSyrup > 0 ? "Additional Syrup" : "Syrup";
    const customization_ingredient = "syrup";

    // console.log("selectdOption", selectedOption);

    useEffect(() => {
        setSelectedOption(options[0]);
    }, [options]);
    
    useEffect(() => {
        updateDrink(customization_name, selectedOption);
        }, [selectedOption, selectedDrink]);

    const handleChange = (e) => {
        setSelectedOption(e);
    }

    const handleMinusMouseEnter = () => {
        setMinusSyrupHovered(true);
    }

    const handleMinusMouseLeave = () => {
        setMinusSyrupHovered(false);
    }

    return (
        <div className="w-full flex flex-col flex-nowrap my-2 items-center">
        <div className="w-full flex flex-nowrap justify-between items-center relative" style={{ zIndex: zIndex }}>
            <div onMouseEnter={handleMinusMouseEnter} onMouseLeave={handleMinusMouseLeave} className="absolute left-[-30px] hover:cursor-pointer" onClick={subtractAdditionalSyrup}>
            {additionalSyrup > 0 && minusSyrupHovered && (
                <MinusCircleIcon 
                    className="h-5 w-5 text-gray-500"
                />
            )}
            {additionalSyrup > 0 && !minusSyrupHovered && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )}
            </div>
            <label className="text-xl">{customization_label}</label>
            <div className="flex flex-nowrap flex-row items-center">
                {customization_ingredient === "syrup" && selectedOption?.ingredient_name !== "None" && (
                    <>
                        <QuantityChanger quantity={quantity} setQuantity={setQuantity} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                        <div className="mx-2 text-xl">pumps of</div>
                    </>
                )}
                <div className="relative">
                    <Listbox value={selectedOption} onChange={handleChange}>
                        <Listbox.Button className="border text-xl pr-1 pl-3 py-1 rounded flex flex-nowrap justify-between items-center gap-3">
                            {selectedOption && selectedOption?.ingredient_name}
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
                            <Listbox.Options unmount={false} className={`absolute right-0 shadow bg-white rounded max-h-64 overflow-auto`}>
                                {options.length > 1 && options.map((option) => (
                                    <Listbox.Option
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
        {numOfAdditionalSyrups === additionalSyrup && selectedOption?.ingredient_name !== "None" &&(
            <div onClick={addAdditionalSyrup} className="flex flex-nowrap gap-3 mt-4 items-center hover:cursor-pointer hover:bg-secondary/50 duration-200 rounded-xl p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Add another syrup</p>
                </div>
        )}
        </div>
    )
}