import { useState } from "react";

export default function QueueCard({ order, orderArrayIdx, finishOrder }) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
  };

  const handleFinishOrder = () => {
    setIsClicked(true);
    setTimeout(() => {
      finishOrder(orderArrayIdx, order.id);
      setIsClicked(false);
    }, 500);
  };

  return (
    <div
      key={order.id}
      className={`bg-white border m-2 rounded border-primary w-1/4 flex flex-col justify-start duration-[600ms] ${
        isMouseDown ? " duration-300 translate-y-2" : ""
      } ${isClicked ? "-translate-y-8 opacity-0" : ""}`}
    >
      <section
        className={`${
          order.isGuest ? "bg-secondary" : "bg-primary"
        } w-full p-3`}
      >
        <p className="text-white font-bold text-lg">{order.customerName}</p>
        <p className="text-white font-bold text-sm">{order?.info?.orderTime}</p>
        <p className="text-white text-xs">{order?.info?.orderDuration} ago</p>
      </section>
      <ul className="p-3 grow">
        <li className="font-bold">{order.drinkName}</li>
        {order.customizations.map((customization) => (
          <li
            key={`${order.id}-${customization}`}
            className="text-md leading-5 my-2"
          >
            {customization}
            <hr />
          </li>
        ))}
      </ul>
      <button
        className="bg-secondary px-4 py-1 m-3 text-white rounded hover:cursor-pointer hover:bg-secondary/75 duration-300"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        onClick={handleFinishOrder}
      >
        Finish
      </button>
    </div>
  );
}
