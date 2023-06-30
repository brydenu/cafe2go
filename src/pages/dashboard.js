import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "components/Header";
import Navbar from "components/Navbar";
import DashboardOption from "components/DashboardOption";
import getLoggedInUser from "utils/users/getLoggedInUser";
import validateToken from "utils/auth/validateToken";
import DashboardDrinkTracker from "components/DashboardDrinkTracker";

export default function Dashboard(){
    const [user, setUser] = useState({});
    const router = useRouter();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        

        if (!token) {
            router.push("/login");
        }
        const validate = async () => {
            try {
                await validateToken(token);
            } catch (e) {
                localStorage.clear();
                router.push("/login");
            }
        }
        const getUser = async () => {
            const res = await getLoggedInUser(token);
            const loggedInUser = res.user.data;
            console.log("loggedInUSer", loggedInUser);
            setUser(loggedInUser);
        }
        validate();
        getUser();
    },[])

    return (
        <>
            <Header />
            <Navbar user={user} />
            <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200">
                <div className="flex flex-col sm:flex-row w-full sm:w-fit mx-2 sm:mx-0">
                    <DashboardOption title="Order a Drink" destination="/order" bgColor="primary" bgHover="secondary" />
                    <DashboardOption title="Quick Order" destination="/login" bgColor="primary" bgHover="secondary" />
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:w-fit mx-2 sm:mx-0">
                    <DashboardOption title="Edit Favorites" destination="/login" bgColor="primary" bgHover="secondary" />
                    <DashboardOption title="Order History" destination="/login" bgColor="primary" bgHover="secondary" />
                </div>
                {user.currentOrder && (
                    <DashboardDrinkTracker drink={user?.currentOrder} />
                    )
                }
            </main>
        </>
    )
}