import AuthWrapper from "components/AuthWrapper";
import getUserFavorites from "utils/client/getUserFavorites";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import FavoriteDrink from "components/FavoriteDrink";
import submitQuickOrder from "utils/client/submitQuickOrder";

export default function QuickOrder() {
    const [favorites, setFavorites] = useState([]);
    const [token, setToken] = useState("");
    const [mostRecentOrder, setMostRecentOrder] = useState({});
    const [hasFavorites, setHasFavorites] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const localStorageToken = localStorage.getItem("token");
        setToken(localStorageToken);
        const getFavorites = async () => {
            const res = await getUserFavorites(localStorageToken);
            if (res?.favorites.length < 1) {
                setHasFavorites(false);
            } else {
                setFavorites(res?.favorites);
            }
            if (res?.latestOrder?.info) {
                setMostRecentOrder(res?.latestOrder?.info);
            } else {
                setMostRecentOrder(null);
            }
        };
        getFavorites();
    }, []);

    const handleGoBack = () => {
        router.push("/dashboard");
    };

    const handleSubmit = async (drinkData) => {
        const res = await submitQuickOrder(token, drinkData);
        return res;
    };

    return (
        <AuthWrapper>
            <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200 mt-16">
                <div className="py-4 flex flex-col justify-center text-center">
                    <h1 className="font-bold text-4xl">Quick Order</h1>
                    <p
                        className="hover:cursor-pointer underline text-secondary text-sm"
                        onClick={handleGoBack}
                    >
                        Back to dashboard
                    </p>
                </div>
                <div className="w-full flex flex-col items-center">
                    <div className="w-full font-bold text-xl text-primary mb-4 ml-4 sm:ml-10">
                        Most recent order
                    </div>
                    <div className="w-full sm:w-11/12 flex flex-col justify-center items-center align-middle mb-8">
                        {/* TODO: INSERT MOST RECENT ORDER DATA HERE */}
                        {mostRecentOrder?.order ? (
                            <FavoriteDrink
                                key={mostRecentOrder?.orderId}
                                drink={{ label: mostRecentOrder?.order }}
                                handleSubmit={handleSubmit}
                                recentOrder={true}
                            />
                        ) : (
                            <BeatLoader
                                color="#32A5DC"
                                loading={true}
                                aria-label="Loading Spinner"
                                size={16}
                            />
                        )}
                    </div>
                </div>
                <div className="w-full flex flex-col items-center">
                    <div className="w-full font-bold text-xl text-primary mb-4 ml-4 sm:ml-10">
                        Favorites
                    </div>
                    <div className="w-full sm:w-11/12 flex flex-col justify-center items-center align-middle">
                        {hasFavorites === true ? (
                            favorites.length > 0 && !!token ? (
                                favorites?.map((drink) => (
                                    <FavoriteDrink
                                        key={drink?.order?.favorite_id}
                                        drink={drink}
                                        handleSubmit={handleSubmit}
                                        token={token}
                                    />
                                ))
                            ) : (
                                <BeatLoader
                                    color="#32A5DC"
                                    loading={true}
                                    aria-label="Loading Spinner"
                                    size={16}
                                />
                            )
                        ) : (
                            <p className="my-5">
                                You haven't set any favorites yet. Go to "Edit
                                Favorites" in the dashboard to set some!
                            </p>
                        )}
                    </div>
                </div>
            </main>
        </AuthWrapper>
    );
}
