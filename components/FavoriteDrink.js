import { Dialog, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { BeatLoader, ClipLoader } from "react-spinners";
import FormCheckbox from "./FormCheckbox";
import OrderNote from "./OrderNote";
import submitQuickOrder from "utils/client/submitQuickOrder";
import Order from "@/pages/order";
import { useRouter } from "next/router";
import deleteFavorite from "utils/client/deleteFavorite";

export default function FavoriteDrink({
    handleSubmit,
    drink,
    token,
    recentOrder = false,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [customizedOrder, setCustomizedOrder] = useState(drink.order);
    // const [isUsingPersonalCup, setIsUsingPersonalCup] = useState(false);
    // const [note, setNote] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const router = useRouter();

    const { order, label } = drink;

    const { customizations, drinkName } = label;

    const openDrinkModal = () => {
        setIsOpen(true);
    };

    const closeDrinkModal = () => {
        setIsOpen(false);
    };

    const handleQuickOrder = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await handleSubmit(customizedOrder);
        if (res?.status === 200) {
            const { order_id } = res.data;
            router.push(`/order/success?order_id=${order_id}`);
        } else {
            setErrorMessage(
                "There was a problem submitting your quick order. Please try again later."
            );
        }
        setIsLoading(false);
    };

    const updateDrink = (customizationName, customizationValue) => {
        setCustomizedOrder((currentOrder) => ({
            ...currentOrder,
            [customizationName]: customizationValue,
        }));
    };

    const handleConfirmDelete = () => {
        setIsConfirmingDelete((current) => !current);
    };

    const handleDeleteFavorite = async () => {
        setIsLoading(true);
        const res = await deleteFavorite(token, order?.favorite_id);
        if (res.deletion_success) {
            window.location.reload();
        } else {
            setErrorMessage(
                "Problem deleting favorite. Please try again later"
            );
            setIsLoading(false);
        }
    };

    return (
        <>
            <div
                onClick={openDrinkModal}
                className="w-full h-20 border border-primary flex flex-row justify-between items-center bg-white hover:cursor-pointer px-3 py-2"
            >
                <div className="font-bold text-xl">{drinkName}</div>
            </div>
            <Transition appear show={isOpen} as="div">
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={closeDrinkModal}
                >
                    <Transition.Child
                        as="div"
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as="div"
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl pt-6 pb-3 text-left align-middle shadow-xl transition-all bg-white px-3">
                                    <Dialog.Title className="leading-6 text-primary px-10 pb-4 text-center border-primary border-b">
                                        <h3 className="font-bold text-2xl">
                                            {drinkName}
                                        </h3>
                                    </Dialog.Title>
                                    <div className="bg-white px-10 py-4 text-center">
                                        {!!customizations ? (
                                            <ul>
                                                <div className="border-primary border p-4">
                                                    <li className="text-md font-bold">
                                                        Customizations:
                                                    </li>
                                                    {customizations.map(
                                                        (customization) => (
                                                            <li
                                                                key={`${drink.id}-${customization}`}
                                                                className="text-md"
                                                            >
                                                                {customization}
                                                            </li>
                                                        )
                                                    )}
                                                </div>
                                                <FormCheckbox
                                                    customization={{
                                                        customization_label:
                                                            "Personal Cup",
                                                        customization_name:
                                                            "personal_cup",
                                                    }}
                                                    updateDrink={updateDrink}
                                                    fontSize={"md"}
                                                />
                                                <OrderNote
                                                    updateDrink={updateDrink}
                                                    fontSize={"md"}
                                                />
                                            </ul>
                                        ) : (
                                            <div className="py-5">
                                                <BeatLoader
                                                    color="#32A5DC"
                                                    size={12}
                                                    loading={true}
                                                    aria-label="Loading Spinner"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 w-full flex justify-center bg-white gap-3">
                                        {!recentOrder &&
                                            (isConfirmingDelete ? (
                                                <div className="flex flex-col flex-nowrap justify-center align-center align-middle">
                                                    <p className="text-black my-2">
                                                        Are you sure you want to
                                                        delete this favorite?
                                                    </p>
                                                    <div className="flex flex-row flex-nowrap justify-center gap-2">
                                                        <button
                                                            type="button"
                                                            className="max-h-[40px] inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 duration-200"
                                                            onClick={
                                                                handleConfirmDelete
                                                            }
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="max-h-[40px] inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 duration-200"
                                                            disabled={isLoading}
                                                            onClick={
                                                                handleDeleteFavorite
                                                            }
                                                        >
                                                            {isLoading ? (
                                                                <ClipLoader
                                                                    color="#ffffff"
                                                                    size={16}
                                                                    loading={
                                                                        true
                                                                    }
                                                                    aria-label="Loading Spinner"
                                                                />
                                                            ) : (
                                                                "Confirm Delete"
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="max-h-[40px] inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 duration-200"
                                                    onClick={
                                                        handleConfirmDelete
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            ))}
                                        {!isConfirmingDelete && (
                                            <>
                                                {/* <button
                                                    type="button"
                                                    className="max-h-[40px] inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 duration-200"
                                                    onClick={closeDrinkModal}
                                                >
                                                    Close
                                                </button> */}
                                                <button
                                                    type="button"
                                                    className={`max-h-[40px] inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 duration-200`}
                                                    onClick={handleQuickOrder}
                                                >
                                                    {isLoading ? (
                                                        <ClipLoader
                                                            color="#ffffff"
                                                            size={16}
                                                            loading={true}
                                                            aria-label="Loading Spinner"
                                                        />
                                                    ) : (
                                                        "Order"
                                                    )}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
