import { useState, useEffect } from "react";

export default function FormCheckbox({
    customization,
    updateDrink,
    selectedDrink,
    fontSize = "xl",
}) {
    const [isChecked, setIsChecked] = useState(false);

    const { customization_label, customization_name } = customization;

    const handleClick = () => {
        setIsChecked((currentState) => !currentState);
    };

    useEffect(() => {
        updateDrink(customization_name, isChecked);
    }, [isChecked, selectedDrink]);

    return (
        <div className="w-full flex flex-nowrap justify-between items-center my-2">
            <label className={`text-${fontSize}`}>{customization_label}</label>
            <div
                className={`w-6 h-6 rounded border hover:cursor-pointer flex justify-center items-middle duration-200 ${
                    isChecked ? "bg-secondary" : "bg-white"
                }`}
                onClick={handleClick}
            >
                {isChecked && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                        />
                    </svg>
                )}
            </div>
        </div>
    );
}
