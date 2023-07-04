import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import Navbar from "./Navbar";
import getLoggedInUser from "utils/users/getLoggedInUser";
import validateAdmin from "utils/auth/validateAdmin";

export default function AdminWrapper({ children }) {
    const [user, setUser] = useState({});
    const [adminVerified, setAdminVerified] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
        const getAndAuthorizeUser = async () => {
            const loggedInUser = await getLoggedInUser(token);
            const isAdmin = await validateAdmin(token);
            setUser(loggedInUser);
            if (!isAdmin) {
                router.push("/dashboard");
            } else {
                setAdminVerified(true);
            }
        }

        getAndAuthorizeUser();
    })

    return (
        <>
        <Header />
        <Navbar user={user} />
        { adminVerified && children }
        </>
    )

    
}