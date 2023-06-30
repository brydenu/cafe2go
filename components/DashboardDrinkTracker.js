import { Dialog, Transition, Fragment } from "@headlessui/react"
import { useState } from "react"
import LoadingSpinner from "./LoadingSpinner";

export default function DashboardDrinkTracker({ drink }) {
    const [isOpen, setIsOpen] = useState(false);

    const openDrinkModal = () => {
        setIsOpen(true);
    }
    
    const closeDrinkModal = () => {
        setIsOpen(false);
    }

    return (
        <>
        <div onClick={openDrinkModal} className="w-full sm:w-4/5 sm:h-20 fixed sm:absolute bottom-0 sm:bottom-5 sm:rounded-lg flex sm:flex-col justify-evenly sm:justify-center items-center bg-secondary text-white hover:cursor-pointer px-3 py-2">
            <div className="text-center flex flex-col sm:flex-row">
                <div className="text-center flex flex-col sm:flex-row">
                    Latest ordered drink:
                </div>
                <div className="font-bold sm:ml-1">{drink.drinkName}</div>
            </div>
            <div className="text-center flex flex-col sm:flex-row">
                <div>Order status:{" "}</div>
                <div className="font-bold sm:ml-1">{drink.in_progress ? "In progress" : "Completed"}</div>
            </div>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDrinkModal}>
          <Transition.Child
            as={Fragment}
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
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl pt-6 pb-3 text-left align-middle shadow-xl transition-all bg-primary">
                  <Dialog.Title
                    className="leading-6 text-white px-10 pb-4 text-center"
                  >
                    <p className="text-2xl">
                    Order status: {" "}
                    <span className="font-bold">{drink.in_progress ? "In progress" : "Completed"}</span>
                    </p>
                    <p className="text-sm text-white">Ordered received at {drink.order_time} ({drink.duration} ago)</p>
                  </Dialog.Title>
                  <div className="bg-white px-10 py-4 text-center">
                    <h3 className="font-bold text-xl">{drink.drinkName}</h3>
                    {!!drink.customizations ? (
                        <ul>
                            {drink.customizations.map((customization) => (
                                <li key={`${drink.id}-${customization}`} className="text-md">{customization}</li>
                            ))}
                        </ul>
                    )
                    :
                    (
                        <div className="w-full flex justify-center mb-5">
                        <LoadingSpinner size="16" color="secondary" otherClasses="my-6" />
                    </div>
                    )
                }
                  </div>

                  <div className="mt-4 w-full flex justify-center bg-primary">
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
    )
}