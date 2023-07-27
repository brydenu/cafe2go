import { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function CustomTempOption({ updateDrink, isIced }) {
  const hotOptions = [
    { ingredient_name: "Warm" },
    { ingredient_name: "Normal" },
    { ingredient_name: "Extra Hot" },
  ];
  const icedOptions = [
    { ingredient_name: "No ice" },
    { ingredient_name: "Light ice" },
    { ingredient_name: "Normal" },
    { ingredient_name: "Extra ice" },
  ];
  const [options, setOptions] = useState(hotOptions);
  const [selectedOption, setSelectedOption] = useState({
    ingredient_name: "Normal",
  });
  const [temperatureLabel, setTemperatureLabel] = useState("Temperature");

  const customization_name = "custom_temp";

  useEffect(() => {
    if (
      !selectedOption.ingredientName ||
      selectedOption.ingredient_name === "Normal"
    ) {
      updateDrink(customization_name);
    } else {
      updateDrink(customization_name, selectedOption);
    }
  }, [selectedOption]);

  useEffect(() => {
    if (isIced) {
      setTemperatureLabel("Ice amount");
      setOptions(icedOptions);
      setSelectedOption(icedOptions[2]);
    } else {
      setTemperatureLabel("Temperature");
      setOptions(hotOptions);
      setSelectedOption(hotOptions[1]);
    }
  }, [isIced]);

  const handleChange = (e) => {
    setSelectedOption(e);
  };

  return (
    <div
      className="w-full flex flex-nowrap justify-between items-center my-2"
      style={{ zIndex: 108 }}
    >
      <label className="text-xl">{temperatureLabel}</label>
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
              {options.length > 1 &&
                options.map((option) => (
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
