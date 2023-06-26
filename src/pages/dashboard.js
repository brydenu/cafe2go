import Header from "components/Header";
import DashboardOption from "components/DashboardOption";

export default function Dashboard(){
    return (
        <>
            <Header />
            <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200">
                <div className="flex flex-col sm:flex-row w-full sm:w-fit mx-2 sm:mx-0">
                    <DashboardOption title="Order a Drink" destination="/order" bgColor="primary" bgHover="secondary" />
                    <DashboardOption title="Quick Order" destination="/login" bgColor="primary" bgHover="secondary" />
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:w-fit mx-2 sm:mx-0">
                    <DashboardOption title="Edit Favorites" destination="/login" bgColor="primary" bgHover="secondary" />
                    <DashboardOption title="Order History" destination="/login" bgColor="primary" bgHover="secondary" />
                </div>
            </main>
        </>
    )
}