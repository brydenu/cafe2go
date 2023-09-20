import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { useQueryClient } from "react-query";

export default function DashboardDrinkTracker({ drink }) {
  const [isOpen, setIsOpen] = useState(false);
  // console.log("drink in ddt", drink);

  const openDrinkModal = () => {
    setIsOpen(true);
  };

  const closeDrinkModal = () => {
    setIsOpen(false);
  };

  if (!drink) {
    return <></>;
  }

  return (
    <>
      <div
        onClick={openDrinkModal}
        className={`w-full sm:w-4/5 sm:h-16 fixed bottom-0 sm:bottom-5 sm:rounded-lg flex flex-row justify-evenly items-center text-white hover:cursor-pointer px-3 py-2 bg-${
          drink?.inProgress ? "secondary" : "primary"
        }`}
      >
        <div className="text-center flex flex-col sm:flex-row items-center">
          <div className="text-center flex flex-col sm:flex-row">
            Latest order:
          </div>
          <div className="flex flex-col">
            <div className="font-bold sm:ml-1">{drink?.drinkName}</div>
            {/* <div className="text-xs sm:ml-1">({drink.duration} ago)</div> */}
          </div>
        </div>
        <div className="text-center flex flex-col sm:flex-row items-center">
          <div>Order status: </div>
          <div className="font-bold sm:ml-1">
            {drink?.inProgress ? "In progress" : "Completed"}
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as="div">
        <Dialog as="div" className="relative z-10" onClose={closeDrinkModal}>
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
                <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl pt-6 pb-3 text-left align-middle shadow-xl transition-all bg-secondary">
                  <Dialog.Title className="leading-6 text-white px-10 pb-4 text-center">
                    <p className="text-2xl">
                      Order status:{" "}
                      <span className="font-bold">
                        {drink?.inProgress ? "In progress" : "Completed"}
                      </span>
                    </p>
                    <p className="text-sm text-white">
                      Order received at {drink?.info?.orderTime} (
                      {drink?.info?.orderDuration} ago)
                    </p>
                  </Dialog.Title>
                  <div className="bg-white px-10 py-4 text-center">
                    <h3 className="font-bold text-xl">{drink?.drinkName}</h3>
                    {!!drink.customizations ? (
                      <ul>
                        {drink.customizations.map((customization) => (
                          <li
                            key={`${drink.id}-${customization}`}
                            className="text-md"
                          >
                            {customization}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="w-full flex justify-center mb-5">
                        <BeatLoader
                          color="#32A5DC"
                          loading={true}
                          aria-label="Loading Spinner"
                          size={16}
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-4 w-full flex justify-center bg-secondary">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeDrinkModal}
                    >
                      Close
                    </button>
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
