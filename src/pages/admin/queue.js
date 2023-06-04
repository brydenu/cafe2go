import { useState, useEffect } from "react";
import Header from "components/Header";

export default function Queue() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource('/api/order/update');
    
        eventSource.onmessage = (event) => {
          const order = event.data;
          console.log(`New order received: ${order}`);
          fetchOrders();
        };
    
        return () => {
          eventSource.close();
        };
      }, []);

      const fetchOrders = async () => {
        // Fetch orders data from the database
        const response = await fetch('/api/order/inProgressOrders');
        const data = await response.json();
        setOrders(data);
      };
    
      useEffect(() => {
        fetchOrders();
        console.log(orders);
      }, []);

      useEffect(console.log("orders:", orders), [orders]);
    
      console.log(orders);

    return (
        <>
            <Header />
            <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200">
            </main>
        </>
    )
};