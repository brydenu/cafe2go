import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import Navbar from "./Navbar";
import getLoggedInUser from "utils/getLoggedInUser";
import validateToken from "utils/auth/validateToken";


export default function AuthWrapper({ children }) {
    const [user, setUser] = useState({});
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
        }
        const getUser = async () => {
            const res = await getLoggedInUser(token);
            const loggedInUser = res.user.data;
            console.log("loggedInUSer", loggedInUser);
            setUser(loggedInUser);
        }
        validate();
        getUser();
    },[])

    return (
        <div className="mt-16">
            <Header />
            <Navbar user={user} />
            { children }
        </div>
    )
}