import Header from "components/Header";
import DashboardOption from "components/DashboardOption";

export default function Dashboard(){
    return (
        <>
            <Header />
            <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-200">
                <div className="flex flex-row">
                    <DashboardOption title="Test Option" destination="/login" bgColor="blfs-blue" bgHover="blfs-teal" />
                    <DashboardOption title="Test Option" destination="/login" bgColor="blfs-blue" bgHover="blfs-teal" />
                </div>
                <div className="flex flex-row">
                    <DashboardOption title="Test Option" destination="/login" bgColor="blfs-blue" bgHover="blfs-teal" />
                    <DashboardOption title="Test Option" destination="/login" bgColor="blfs-blue" bgHover="blfs-teal" />
                </div>
            </main>
        </>
    )
}