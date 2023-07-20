import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthWrapper from "components/AuthWrapper";
import getUserHistory from "utils/getUserHistory";
import HistoryDrink from "components/HistoryDrink";


export default function History() {
    const [orders, setOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [inProgressOrders, setInProgressOrders] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const getOrders = async () => {
            const res = await getUserHistory(token);
            setOrders(res);
        }
        getOrders();
    }, []);

    useEffect(() => {
        const completed = [];
        const inProgress = [];
        for (let order of orders) {
            if (order?.inProgress) {
                inProgress.push(order);
            } else {
                completed.push(order);
            }
        }
        setCompletedOrders(completed);
        setInProgressOrders(inProgress);
    }, [orders])

    const handleGoBack = () => {
        router.push("/dashboard");
    }

    return (
        <AuthWrapper>
            <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200">
            <div className="py-5 flex flex-col justify-center text-center">
                <h1 className="font-bold text-4xl">Order History</h1>
                <p className="hover:cursor-pointer underline text-secondary text-sm" onClick={handleGoBack}>Back to dashboard</p>
            </div>
            {inProgressOrders.length > 0 &&
            <div className="w-full flex flex-col items-center">
                <div className="w-full font-bold text-xl text-primary mb-4 ml-4 sm:ml-10">In-progress orders</div>
                <div className="w-full sm:w-11/12 flex flex-col justify-center items-center align-middle mb-8">
                    {inProgressOrders?.map((drink) => (<HistoryDrink key={drink.id} drink={drink} />))}
                </div>
            </div>
            }
            <div className="w-full flex flex-col items-center">
                <div className="w-full font-bold text-xl text-primary mb-4 ml-4 sm:ml-10">Completed orders</div>
                <div className="w-full sm:w-11/12 flex flex-col justify-center items-center align-middle">
                    {completedOrders?.map((drink) => (<HistoryDrink key={drink.id} drink={drink} />))}
                </div>
            </div>
            </main>
        </AuthWrapper>
    )
}