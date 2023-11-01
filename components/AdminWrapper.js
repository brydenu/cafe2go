import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import Navbar from "./Navbar";
import getLoggedInUser from "utils/client/getLoggedInUser";
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
            setUser(loggedInUser.user.data);
            if (!isAdmin) {
                router.push("/dashboard");
            } else {
                setAdminVerified(true);
            }
        };

        getAndAuthorizeUser();
    }, []);

    return (
        <div className="mt-16 min-h-screen bg-background">
            <Header title="Order Queue" />
            <Navbar user={user} admin={adminVerified} />
            {adminVerified && children}
        </div>
    );
}
