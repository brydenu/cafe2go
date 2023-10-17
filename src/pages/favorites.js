import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import AuthWrapper from "components/AuthWrapper";
import DrinkOption from "components/DrinkOption";
import OrderCustomization from "components/OrderCustomization";
import FormCheckbox from "components/FormCheckbox";
import HotIcedOption from "components/HotIcedOption";
import CustomTempOption from "components/CustomTempOption";
import getLoggedInUser from "utils/client/getLoggedInUser";
import fetchMenu from "utils/client/fetchMenu";
import { ClipLoader, SyncLoader } from "react-spinners";
import addFavorite from "utils/client/addFavorite";

export default function Favorites({ searchParams }) {
    const [user, setUser] = useState({});
    const [bevType, setBevType] = useState("coffee");
    const [menu, setMenu] = useState([]);
    const [selectedDrink, setSelectedDrink] = useState({});
    const [currentDrinkCustomizations, setCurrentDrinkCustomizations] =
        useState([]);
    const [selectedCustomizations, setSelectedCustomizations] = useState({
        drink: selectedDrink?.menu_id,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [token, setToken] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [saveConfirmed, setSaveConfirmed] = useState(false);

    // console.log("selectedCustomizations:", selectedCustomizations);
    // console.log("selectedDrink:", selectedDrink);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);

        const getUser = async () => {
            const res = await getLoggedInUser(token);
            const loggedInUser = res.user.data;
            setUser(loggedInUser);
        };

        const getMenu = async () => {
            const res = await fetchMenu();
            const fetchedMenu = res.data.menu;
            setMenu(fetchedMenu);
        };

        getMenu();
        getUser();
    }, []);

    useEffect(() => {
        setSelectedDrink(menu[0]);
        setSelectedCustomizations({ drink: menu[0]?.menu_id });
    }, [menu]);

    const bevTabClasses =
        "w-40 text-white text-xl px-5 py-2 rounded-xl duration-200";
    const selectedOption = "bg-secondary " + bevTabClasses;
    const unselectedOption =
        "bg-primary hover:bg-secondary/50  " + bevTabClasses;

    useEffect(() => {
        const getCurrentDrinkCustomizationOptions = async () => {
            if (selectedDrink?.menu_id) {
                const res = await axios.get(
                    `api/customizations/${selectedDrink?.menu_id}`
                );
                const { customizations } = res.data;
                setCurrentDrinkCustomizations(customizations);
                setSelectedCustomizations({ menu_id: selectedDrink });
                if (
                    bevType === "coffee" &&
                    !!selectedCustomizations?.num_shots
                ) {
                    setSelectedCustomizations((selectedCustomizations) => ({
                        ...selectedCustomizations,
                        num_shots: {
                            ingredient_name: 2,
                            in_stock: true,
                            shots_option: true,
                        },
                    }));
                }
            }
        };

        getCurrentDrinkCustomizationOptions();
    }, [selectedDrink]);

    const handleChangeTab = (e) => {
        e.preventDefault();
        const newBevType = e.target.value;
        setBevType(newBevType);
    };

    const updateDrink = (property, value = null) => {
        setSaveConfirmed(false);
        if (value) {
            setSelectedCustomizations((selectedCustomizations) => ({
                ...selectedCustomizations,
                [property]: value,
            }));
        } else {
            const customizationsWithoutProperty = { ...selectedCustomizations };
            delete customizationsWithoutProperty[property];
            setSelectedCustomizations(customizationsWithoutProperty);
        }
    };

    const handleGoBack = (e) => {
        e.preventDefault();
        router.push("/dashboard");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = { drink: selectedCustomizations, user_id: user.user_id };
        try {
            const res = await addFavorite(token, data);
            if (res.status === 201) {
                const { order_id } = res.data;
                setSuccessMessage("Favorite saved.");
                setIsSubmitting(false);
                setSaveConfirmed(true);
            }
        } catch (e) {
            console.error("error saving favorite drink");
            setErrorMessage("Error saving favorite drink.");
            setIsSubmitting(false);
        }
    };

    return (
        <AuthWrapper>
            <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200 mt-12">
                <h1 className="text-4xl mb-4">Create new favorite drink</h1>
                <small
                    className="text-sm mb-8 text-secondary underline hover:cursor-pointer"
                    onClick={handleGoBack}
                >
                    Back to dashboard
                </small>
                <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 flex flex-col justify-center items-center bg-primary pt-10 pb-1 rounded">
                    <div className="w-full flex justify-evenly mb-2">
                        <button
                            type="button"
                            value="coffee"
                            className={
                                bevType === "coffee"
                                    ? selectedOption
                                    : unselectedOption
                            }
                            onClick={handleChangeTab}
                        >
                            Coffee
                        </button>
                        <button
                            type="button"
                            value="tea"
                            className={
                                bevType === "tea"
                                    ? selectedOption
                                    : unselectedOption
                            }
                            onClick={handleChangeTab}
                        >
                            Tea
                        </button>
                        <button
                            type="button"
                            value="other"
                            className={
                                bevType === "other"
                                    ? selectedOption
                                    : unselectedOption
                            }
                            onClick={handleChangeTab}
                        >
                            Other
                        </button>
                    </div>
                    <form className="w-full flex flex-col w-full bg-white justify-center mb-2 px-8 sm:px-16">
                        {menu.length > 0 ? (
                            <>
                                <DrinkOption
                                    bevType={bevType}
                                    selectedDrink={selectedDrink}
                                    setSelectedDrink={setSelectedDrink}
                                    menu={menu}
                                    updateDrink={updateDrink}
                                />
                                <hr />
                                {selectedDrink?.menu_id !== 10 && (
                                    <>
                                        <HotIcedOption
                                            updateDrink={updateDrink}
                                            selectedDrink={selectedDrink}
                                        />
                                        <CustomTempOption
                                            isIced={
                                                selectedCustomizations?.hot_iced
                                                    ?.ingredient_name === "iced"
                                            }
                                            updateDrink={updateDrink}
                                        />
                                    </>
                                )}
                                {(bevType === "coffee" ||
                                    !!selectedCustomizations.num_shots) && (
                                    <FormCheckbox
                                        customization={{
                                            customization_label: "Decaf",
                                            customization_name: "decaf",
                                        }}
                                        updateDrink={updateDrink}
                                        selectedDrink={selectedDrink}
                                    />
                                )}
                                <OrderCustomization
                                    customizations={currentDrinkCustomizations}
                                    updateDrink={updateDrink}
                                    selectedDrink={selectedDrink}
                                    bevType={bevType}
                                    page={"favorites"}
                                />
                            </>
                        ) : (
                            <div className="self-center py-10">
                                <SyncLoader
                                    color="#32A5DC"
                                    size={12}
                                    loading={true}
                                    aria-label="Loading Spinner"
                                />
                            </div>
                        )}
                    </form>
                    <button
                        className={`w-40 min-h-[44px] text-white rounded-xl duration-200 self-end text-lg mx-10 my-2 px-4 py-2 flex justify-center align-middle ${
                            saveConfirmed
                                ? " bg-gray-400 hover:bg-gray-400 hover:cursor-default"
                                : " bg-green-600 hover:bg-green-500 font-bold"
                        }`}
                        onClick={handleSubmit}
                        disabled={isSubmitting || saveConfirmed}
                    >
                        {isSubmitting ? (
                            <ClipLoader
                                color="#ffffff"
                                size={16}
                                loading={true}
                                aria-label="Loading Spinner"
                            />
                        ) : saveConfirmed ? (
                            "Saved"
                        ) : (
                            "Save Drink"
                        )}
                    </button>
                </div>
            </main>
        </AuthWrapper>
    );
}
