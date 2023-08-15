// HotTempOption.js
import { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function HotTempOption({ updateDrink }) {
  const hotOptions = [
    { ingredient_name: "Warm" },
    { ingredient_name: "Normal" },
    { ingredient_name: "Extra Hot" },
  ];
  const [selectedOption, setSelectedOption] = useState(hotOptions[1]);

  const customization_name = "custom_temp"; // You might want to change this

  useEffect(() => {
    updateDrink(customization_name, selectedOption);
  }, [selectedOption]);

  const handleChange = (e) => {
    setSelectedOption(e);
  };

  return (
    <div
      className="w-full flex flex-nowrap justify-between items-center my-2"
      style={{ zIndex: 108 }}
    >
      <label className="text-xl">Temperature</label>
      <div className="">
        <Listbox value={selectedOption} onChange={handleChange}>
          <Listbox.Button className="border text-xl pr-1 pl-3 py-1 rounded flex flex-nowrap justify-between items-center gap-3">
            {selectedOption.ingredient_name}
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
              {hotOptions.length > 0 &&
                hotOptions.map((option) => (
                  <Listbox.Option
                    key={option.ingredient_name}
                    value={option}
                    className={({ active }) =>
                      `hover:cursor-pointer px-5 py-1 rounded text-center text-xl z-50 ${
                        active ? "bg-secondary text-white" : ""
                      }`
                    }
                  >
                    {option.ingredient_name}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
    </div>
  );
}
