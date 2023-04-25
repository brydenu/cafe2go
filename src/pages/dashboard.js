import Header from "components/Header";
import DashboardOption from "components/DashboardOption";

export default function Dashboard(){
    return (
        <>
            <Header />
            <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-200">
                <div className="flex flex-row">
                    <DashboardOption title="Order a Drink" destination="/order" bgColor="blfs-blue" bgHover="blfs-teal" />
                    <DashboardOption title="Quick Order" destination="/login" bgColor="blfs-blue" bgHover="blfs-teal" />
                </div>
                <div className="flex flex-row">
                    <DashboardOption title="Edit Favorites" destination="/login" bgColor="blfs-blue" bgHover="blfs-teal" />
                    <DashboardOption title="Order History" destination="/login" bgColor="blfs-blue" bgHover="blfs-teal" />
                </div>
            </main>
        </>
    )
}