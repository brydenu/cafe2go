import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Navbar({ user }){
    const router = useRouter();

    console.log("user from Navbar", user)
    

    const handleClickHome = () => {
        router.push("/dashboard")
    }

    const handleLogout = () => {
        localStorage.clear();
        router.push("/login")
    }

    return (
        <nav className="bg-primary w-full h-16 flex flex-row justify-between">
            <div 
                className="flex flex-row justify-between items-center gap-2 bg-white px-4"
                onClick={handleClickHome}
            >
                <Image 
                    priority
                    src="/images/BS-Symbol-BS-Master-TM.svg"
                    height={40}
                    width={40}
                    alt="Biolife Solutions logo"
                    className="hover:cursor-pointer"
                />
                <p className="font-bold text-primary text-3xl hover:cursor-pointer">Biolife Cafe</p>
            </div>
            <div className="flex flex-row justify-between items-center gap-2 mr-4">
                <p className="text-white">Welcome, {user?.first_name}</p>
                <p 
                    className="hover:cursor-pointer text-secondary underline"
                    onClick={handleLogout}
                >
                Logout
                </p>
            </div>
        </nav>
    )

}