import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "components/Header"
import LoadingSpinner from "components/LoadingSpinner";

export default function Success() {
    const [order, setOrder] = useState({});
    
    const router = useRouter()
    const { order_id } = router.query;

    useEffect(() => {
        const getOrder = async () => {
            if (order_id) {
                const res = await axios.get(`/api/orders?order_id=${order_id}`);
                setOrder(res.data.order);
            }
        }
        getOrder();
    }, [order_id])

    const handleGoToDashboard = () => (
        router.push("/dashboard")
    )
    

    return (<>
        <Header />
        <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 flex flex-col justify-center items-center bg-primary pt-10 pb-1 rounded">
                <div className="w-full text-white text-center pb-5">
                    <div className="font-bold text-4xl">Order received!</div>
                </div>
                <div className="min-h-[100px] w-full bg-white pt-4 px-4 flex flex-col justify-center align-middle text-center">
                    {!!order.customizations ? (
                        <>
                            <ul>
                                <li className="text-2xl font-bold">{order.drinkName}</li>
                                {order.customizations.map((customization) => (
                                    <li key={`${order.id}-${customization}`} className="text-lg">{customization}</li>
                                    ))}
                            </ul>
                            <p className="text-sm text-center mt-4 mb-2">Order submitted at {order.order_time} ({order.duration} ago)</p>
                        </>                        
                    )
                    :
                    (
                    <div className="w-full flex justify-center mb-5">
                        <LoadingSpinner size="16" color="secondary" otherClasses="my-6" />
                    </div>)
                    }
                </div>
                <button onClick={handleGoToDashboard} className="w-1/2 rounded px-6 my-5 py-3 mx-2 bg-secondary text-white hover:bg-secondary/75 duration-200">Back to Dashboard</button>
            </div>
        </main>
    </>
    )
}