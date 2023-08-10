import { useState, useEffect } from "react";
import axios from "axios";
import AdminWrapper from "components/AdminWrapper";
import Header from "components/Header";
import QueueCard from "components/QueueCard";
import fetchInProgressOrders from "utils/fetchInProgressOrders";

export default function Queue() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      // Fetch orders data from the server
      const orders = await fetchInProgressOrders();
      setOrders(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    // Fetch orders initially
    fetchOrders();

    // Set up interval to fetch orders every few seconds (e.g., every 5 seconds)
    const interval = setInterval(fetchOrders, 5000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const finishOrder = async (orderArrayIdx, orderId) => {
    const res = await axios.patch("/api/orders/finish", { id: orderId });

    const newOrders = [...orders];
    newOrders.splice(orderArrayIdx, 1);
    // console.log("newORders", newOrders);
    setOrders([...newOrders]);
  };

  return (
    <AdminWrapper>
      <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200">
        <h1 className="text-5xl font-bold mb-8 mt-20">Queue</h1>
        <div className="w-full flex flex-wrap">
          {orders.length < 1 && (
            <p className="w-full text-center text-md">No orders in queue.</p>
          )}
          {orders.map((order, idx) => (
            <QueueCard
              key={order.id}
              orderArrayIdx={idx}
              order={order}
              finishOrder={finishOrder}
            />
          ))}
        </div>
      </main>
    </AdminWrapper>
  );
}
