import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function DrinkOption({ drinks, setSelectedOption }) {
    console.log("DrinkOption drinks:", drinks);
    return (
        <Listbox.Options className="z-10 shadow absolute bg-white rounded max-h-64 overflow-auto">
        {drinks.map((option) => (
            <Listbox.Option
                key={option.drink_id}
                value={option}
                disabled={!option.in_stock}
                className="px-10 py-1 rounded text-center text-xl"
            >
                {({active}) => (
                    <span
                        className={`${active && "cursor-pointer bg-blfs-teal text-white"}`}
                    >
                        {option.drink_name}
                    </span>
                )}
            </Listbox.Option>
        ))}
    </Listbox.Options>
    )
}