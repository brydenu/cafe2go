import { useState } from "react";

export default function QueueCard({ order, orderArrayIdx, finishOrder}) {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleMouseDown = () => {
        setIsMouseDown(true);
    }

    const handleMouseUpOrLeave = () => {
        setIsMouseDown(false);
    }

    const handleFinishOrder = () => {
        setIsClicked(true);
        setTimeout(() => {
            finishOrder(orderArrayIdx, order.id);
            setIsClicked(false);
        }, 500);
    }

    console.log("qc order", order)

    return (
        <div key={order.id} className={`bg-white border m-2 rounded border-blfs-blue w-1/4 flex flex-col justify-start duration-500 ${isMouseDown ? " duration-300 translate-y-2" : ""} ${isClicked ? "-translate-y-8 opacity-0": ""}`}>
            <section className="bg-blfs-blue w-full p-3">
                <p className="text-white font-bold text-lg">{order.customerName}</p>
                <p className="text-white font-bold text-sm">{order.order_time}</p>
                <p className="text-white text-xs">{order.duration} ago</p>
            </section>
            <ul className="p-3 grow">
                <li className="font-bold">{order.drinkName}</li>
            {order.customizations.map((customization) => (
                <li key={`${order.id}-${customization}`}>{customization}</li>
            ))}
            </ul>
            <button className="bg-blfs-teal px-4 py-1 m-3 text-white rounded hover:cursor-pointer hover:bg-blfs-teal/75 duration-300" onMouseDown={handleMouseDown} onMouseLeave={handleMouseUpOrLeave} onMouseUp={handleMouseUpOrLeave} onClick={handleFinishOrder}>Finish</button>
        </div>
    )
}