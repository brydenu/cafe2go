import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import Navbar from "./Navbar";
import getLoggedInUser from "utils/client/getLoggedInUser";
import validateToken from "utils/auth/validateToken";
import validateAdmin from "utils/auth/validateAdmin";

export default function AuthWrapper({ children }) {
    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState(false);
    const [guest, setGuest] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
        const validate = async () => {
            try {
                await validateToken(token);
            } catch (e) {
                localStorage.clear();
                router.push("/login");
            }
        };
        const getUser = async () => {
            const res = await getLoggedInUser(token);
            const loggedInUser = res.user.data;
            const isGuest = loggedInUser?.user_id === 1;
            const isAdmin = await validateAdmin(token);
            if (isAdmin) {
                setAdmin(true);
            }
            if (isGuest) {
                setGuest(true);
            } else {
                setUser(loggedInUser);
            }
        };
        validate();
        getUser();
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <Navbar user={user} admin={admin} guest={guest} />
            {children}
        </div>
    );
}
