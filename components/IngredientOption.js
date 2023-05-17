import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function IngredientOption({ options }) {

    return (
        <Listbox.Options className="z-10 shadow absolute bg-white rounded max-h-64 overflow-auto">
            {options.map((option) => (
                <Listbox.Option
                    key={option.ingredient_id}
                    value={option}
                    disabled={!option.in_stock}
                    className="hover:cursor-pointer px-10 py-1 rounded hover:bg-blfs-teal hover:text-white text-center text-xl"
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
    )
}