import { Dialog, Transition, Fragment } from "@headlessui/react"
import { useState } from "react"
import LoadingSpinner from "./LoadingSpinner";

export default function HistoryDrink({ drink }) {
    const [isOpen, setIsOpen] = useState(false);
    
    const {  customerName, customizations, inProgress, drinkName, info } = drink;
    const { orderedToday, orderTime, orderDate, orderDuration, completedTime, completedDate, completedDuration } = info;

    const openDrinkModal = () => {
        setIsOpen(true);
    }
    
    const closeDrinkModal = () => {
        setIsOpen(false);
    }

    return (
        <>
        <div onClick={openDrinkModal} className="w-full h-20 border border-primary flex flex-row justify-between items-center bg-white hover:cursor-pointer px-3 py-2">
            <div className="font-bold text-xl">{drink.drinkName}</div>
            <div className="text-md text-primary">
                {inProgress ? 
                (<div className="flex flex-col sm:flex-row gap-1 items-center justify-end">
                  <div>Ordered:</div>
                  <div className="flex flex-row gap-1 items-center justify-end">
                    <span className="font-bold">{orderedToday ? orderTime : orderDate}</span>
                    <span className="text-sm">({orderDuration} ago)</span>
                  </div>
                </div>)
                :
                (<div className="flex flex-col sm:flex-row gap-1 items-center justify-end">
                  <div>Completed:</div>
                  <div className="flex flex-row gap-1 items-center justify-end">
                    <span className="font-bold">{orderedToday ? completedTime : completedDate}</span>
                  </div>
                </div>)
                }
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
                    <span className="font-bold">{inProgress ? "In progress" : "Completed"}</span>
                    </p>
                    
                  </Dialog.Title>
                  <div className="bg-white px-10 py-4 text-center">
                    <div className="mb-3">
                      <p className="text-xs italic">Ordered {orderDate} at {orderTime}</p>
                      {!inProgress && (
                        <p className="text-xs italic">Completed {completedDate} at {completedTime}</p>
                        )}
                    </div>
                      <h3 className="font-bold text-xl">{drinkName}</h3>
                    {!!customizations ? (
                        <ul>
                            {customizations.map((customization) => (
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