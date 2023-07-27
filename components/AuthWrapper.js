import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import Navbar from "./Navbar";
import getLoggedInUser from "utils/getLoggedInUser";
import validateToken from "utils/auth/validateToken";
import validateAdmin from "utils/auth/validateAdmin";

export default function AuthWrapper({ children }) {
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);
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
      setUser(loggedInUser);
      const isAdmin = await validateAdmin(token);
      if (isAdmin) {
        setAdmin(true);
      }
    };
    validate();
    getUser();
  }, []);

  return (
    <div className="mt-16 min-h-screen bg-gray-200">
      <Header />
      <Navbar user={user} admin={admin} />
      {children}
    </div>
  );
}
