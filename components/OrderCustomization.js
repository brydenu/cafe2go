import { useState } from "react";
import { Listbox } from "@headlessui/react";

export default function OrderCustomization({ label, options, isDropdown }) {
    const [selectedOption, setSelectedOption] = useState(options[0])
    // return (
    //     <div className="w-full flex flex-nowrap"><label className="text-xl my-2" for={label.for}>{label.label}</label></div>
    // )
    return (
        <div className="w-full flex flex-nowrap">
            <label className="text-xl my-2">{label}</label>
            <Listbox value={selectedOption} onChange={setSelectedOption}>
                <Listbox.Button>{selectedOption.label}</Listbox.Button>
                <Listbox.Options>
                    {options.map((option) => (
                        <Listbox.Option
                            key={option.id}
                            value={option}
                            disabled={option.unavailable}
                            >
                            {option.label}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    )
}