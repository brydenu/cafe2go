import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "components/Header";
import Navbar from "components/Navbar";
import DashboardOption from "components/DashboardOption";
import getLoggedInUser from "utils/client/getLoggedInUser";
import { useFetchCurrentDrink } from "utils/client/useFetchCurrentDrink";
import validateToken from "utils/auth/validateToken";
import DashboardDrinkTracker from "components/DashboardDrinkTracker";
import AuthWrapper from "components/AuthWrapper";

export default function Dashboard() {
    const [user, setUser] = useState({});
    const [storageToken, setStorageToken] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setStorageToken(token);
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
        };
        const getUser = async () => {
            const res = await getLoggedInUser(token);
            const loggedInUser = res.user.data;
            // console.log("loggedInUser", loggedInUser);
            if (loggedInUser.user_id === 1) {
                localStorage.clear();
                router.push("/");
            }
            setUser(loggedInUser);
        };
        validate();
        getUser();
    }, []);

    // console.log("user", user);

    return (
        <AuthWrapper>
            <main
                className="w-full min-h-screen flex flex-col items-center justify-center bg-background"
                style={{ margin: 0, padding: 0 }}
            >
                <div className="flex flex-col sm:flex-row w-full mx-2 sm:mx-0">
                    <DashboardOption
                        title="Order a Drink"
                        destination="/order"
                        primaryOption={true}
                        mainOption={true}
                    />
                </div>
                <div className="flex flex-col sm:flex-row w-full mx-2 sm:mx-0">
                    <DashboardOption
                        title="Quick Order"
                        destination="/quick-order"
                        isDisabled={false}
                        primaryOption={true}
                    />
                </div>
                <div className="flex flex-col sm:flex-row w-full mx-2 sm:mx-0">
                    <DashboardOption
                        title="Edit Favorites"
                        destination="/favorites"
                        isDisabled={false}
                    />
                    <DashboardOption
                        title="Order History"
                        destination="/history"
                    />
                    <DashboardOption title="Settings" destination="/settings" />
                </div>
                <DashboardDrinkTracker
                    drink={user?.latestOrder?.info?.order}
                    isRecent={user?.latestOrder?.isRecent}
                />
            </main>
        </AuthWrapper>
    );
}
