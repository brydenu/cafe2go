import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";

export default function QuantityChanger({
  quantity,
  setQuantity,
  selectedOption,
  setSelectedOption,
}) {
  const handleQuantityDown = () => {
    setQuantity((currentQuantity) => currentQuantity - 1);
  };
  const handleQuantityUp = () => {
    setQuantity((currentQuantity) => currentQuantity + 1);
  };

  useEffect(() => {
    const optionWithQuantity = selectedOption ? selectedOption : {};
    optionWithQuantity["quantity"] = quantity;
    setSelectedOption(optionWithQuantity);
  }, [quantity, selectedOption]);

  return (
    <div className="flex flex-nowrap flex-row items-center">
      {quantity > 0 ? (
        <MinusCircleIcon
          className="h-5 w-5 text-gray-400 hover:cursor-pointer"
          aria-hidden="true"
          onClick={handleQuantityDown}
        />
      ) : (
        <MinusCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      )}
      <p className="border text-xl pr-2 pl-2 py-1 mx-1 rounded flex flex-nowrap justify-between items-center gap-3 text-center">
        {quantity}
      </p>
      <PlusCircleIcon
        className="h-5 w-5 text-gray-400 hover:cursor-pointer"
        aria-hidden="true"
        onClick={handleQuantityUp}
      />
    </div>
  );
}
