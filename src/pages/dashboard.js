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
  const [userCurrentDrink, setUserCurrentDrink] = useState(null);
  const router = useRouter();

  console.log("storageToken", storageToken);
  const { currentDrink, isLoading, isError } =
    useFetchCurrentDrink(storageToken);
  console.log("user", user);
  console.log("currentDrink", currentDrink);
  console.log("isLoading ->", isLoading);
  console.log("isError ->", isError);
  if (currentDrink?.currentOrder) {
    setUserCurrentDrink(currentDrink?.currentOrder);
  }

  useEffect(() => {
    console.log("storageTokenuseeffect", storageToken);
    console.log("currentDrink", userCurrentDrink);
  }, [storageToken]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);
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
      if (loggedInUser.user_id === 1) {
        localStorage.clear();
        router.push("/");
      }
      setUser(loggedInUser);
    };
    validate();
    getUser();
  }, []);

  return (
    <AuthWrapper>
      <main
        className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200"
        style={{ margin: 0, padding: 0 }}
      >
        <div className="flex flex-col sm:flex-row w-full sm:w-fit mx-2 sm:mx-0">
          <DashboardOption
            title="Order a Drink"
            destination="/order"
            bgColor="primary"
            bgHover="secondary"
          />
          <DashboardOption
            title="Quick Order"
            destination="/quickorder"
            bgColor="primary"
            bgHover="secondary"
            isDisabled={false}
          />
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:w-fit mx-2 sm:mx-0">
          <DashboardOption
            title="Edit Favorites"
            destination="/favorites"
            bgColor="primary"
            bgHover="secondary"
            isDisabled={false}
          />
          <DashboardOption
            title="Order History"
            destination="/history"
            bgColor="primary"
            bgHover="secondary"
          />
        </div>
        <DashboardDrinkTracker drink={userCurrentDrink} />
      </main>
    </AuthWrapper>
  );
}
