import Header from 'components/Header';
import Navbar from 'components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import validateToken from 'utils/auth/validateToken';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
        const validate = async () => {
            try {
                const res = await validateToken(token);
                if (res.message === "valid_token") {
                  router.push("/dashboard");
                }
              } catch (e) {
                localStorage.clear();
            }
        }
        validate();
    }
  }, []);

  return (
    <>
      <Header />
      <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200">
        <Navbar />
        <div className="bg-white shadow-md p-10 rounded">
          <div className="w-full flex flex-row justify-center items-center gap-5">
            <Image 
              priority
              src="/images/BS-Symbol-BS-Master-TM.svg"
              height={75}
              width={75}
              alt="Biolife Solutions logo"
            />
            <h1 className=" text-4xl sm:text-6xl text-primary font-bold text-center">Welcome to Biolife Cafe</h1>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-5 justify-center items-center my-5">
              <Link href="/login" className="hover:cursor-pointer hover:scale-110 duration-200 text-white text-lg bg-secondary text-center px-4 py-2 rounded w-full sm:w-1/4 shadow-md">Login</Link>
              <Link href="/register" className="hover:cursor-pointer hover:scale-110 duration-200 text-white text-lg bg-secondary text-center px-4 py-2 rounded w-full sm:w-1/4 shadow-md">Register</Link>          
            </div>
          </div>
      </main>
    </>
  )
}
