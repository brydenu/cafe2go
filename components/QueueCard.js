
export default function QueueCard({ order, orderArrayIdx, finishOrder}) {

    const handleFinishOrder = () => {
        finishOrder(orderArrayIdx, order.id);
    }

    console.log("qc order", order)

    return (
        <div key={order.id} className="bg-white border m-2 rounded border-blfs-blue w-1/5 flex flex-col justify-between">
            <section className="bg-blfs-blue w-full p-3">
                <p className="text-white font-bold text-lg">{order.customerName}</p>
                <p className="text-white font-bold">{order.drinkName}</p>
                <p className="text-white text-xs">{order.duration} ago</p>
            </section>
            <ul className="p-3">
                <li className="font-bold">{order.order_time}</li>
            {order.customizations.map((customization) => (
                <li key={`${order.id}-${customization}`}>{customization}</li>
            ))}
            </ul>
            <button className="bg-blfs-teal px-4 py-1 m-3 text-white rounded hover:cursor-pointer" onClick={handleFinishOrder}>Finish</button>
        </div>
    )
}