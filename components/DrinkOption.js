import { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function DrinkOption({ bevType, selectedDrink, setSelectedDrink, menu }) {

    let bevTypeMenu = menu.filter(bev => bev.drink_type === bevType);

    useEffect(() => {
        setSelectedDrink(bevTypeMenu[0]);
    }, [bevType]);

    return (
        <div className="w-full flex flex-nowrap justify-between items-center mb-2 mt-4 px-8">
            <label className="text-xl font-bold">Drink</label>
            <div className="">
                <Listbox value={selectedDrink} onChange={setSelectedDrink}>
                    <Listbox.Button className="border text-xl pr-1 pl-3 py-1 rounded flex flex-nowrap justify-between items-center gap-3">
                        {selectedDrink.drink_name}
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
                            {bevTypeMenu.map((drink) => (
                                <Listbox.Option
                                    key={drink.id}
                                    value={drink}
                                    disabled={!drink.in_stock}
                                    className="hover:cursor-pointer px-10 py-1 rounded hover:bg-blfs-teal hover:text-white text-center text-xl"
                                >
                                    {({active}) => (
                                        <div
                                            className={`${active && "bg-blfs-teal text-white"}`}
                                        >
                                            {drink.drink_name}
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