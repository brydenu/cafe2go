import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Navbar({ user, admin, guest }) {
    const router = useRouter();

    const handleClickHome = () => {
        if (guest) {
            localStorage.clear();
            router.push("/");
        } else if (user) {
            router.push("/dashboard");
        } else {
            router.push("/");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        router.push("/login");
    };

    const handleGuestRegister = () => {
        localStorage.clear();
        router.push("/register");
    };

    const handleGoToQueue = () => {
        router.push("/admin/queue");
    };

    return (
        <nav className="bg-secondary w-full h-16 flex flex-row justify-between items-center fixed top-0">
            <div
                className="h-full flex flex-row justify-between items-center gap-2 bg-secondary px-4"
                onClick={handleClickHome}
            >
                <Image
                    priority
                    src="/images/logo.png"
                    height={75}
                    width={75}
                    alt="Cafe2Go logo"
                    className="hover:cursor-pointer"
                />
                <p className="font-bold font-['Courier_New'] text-white text-xl text-center sm:text-3xl hover:cursor-pointer">
                    Cafe2Go{admin && " Admin"}
                </p>
            </div>
            {admin && (
                <p
                    className="hover:cursor-pointer text-white text-md sm:text-xl font-bold ml-2"
                    onClick={handleGoToQueue}
                >
                    Queue
                </p>
            )}
            <div className="flex flex-col justify-center items-end mr-6 text-sm text-center text-xs sm:text-md grow sm:grow-0">
                {!!user && !guest ? (
                    <>
                        <p className="text-white text-center">
                            {user?.first_name} {user?.last_name}
                        </p>
                        <p
                            className="hover:cursor-pointer text-accent underline text-xs text-center"
                            onClick={handleLogout}
                        >
                            Logout
                        </p>
                    </>
                ) : (
                    <>
                        <p className="text-white">
                            {guest && <p className="mb-1">Ordering as guest</p>}
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="underline"
                            >
                                Login
                            </button>{" "}
                            or{" "}
                            <button
                                type="button"
                                onClick={handleGuestRegister}
                                className="underline"
                            >
                                Register
                            </button>
                        </p>
                    </>
                )}
            </div>
        </nav>
    );
}
