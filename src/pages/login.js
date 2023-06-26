import Header from 'components/Header'
import Image from 'next/image';

export default function Login() {


    return (
        <>
        <Header />
        <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200">
            <div className="w-full flex justify-center items-center my-10">
                <Image 
                    priority
                    src="/images/BS-Symbol-BS-Master-TM.svg"
                    height={75}
                    width={75}
                    alt="Biolife Solutions logo"
                />
                <h1 className="mx-4 font-bold text-4xl">BLFS Cafe</h1>
            </div>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 sm:w-2/5 sm:h-1/3 flex flex-col justify-center">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
                    <input className="shadow appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                    <input className="shadow appearance-none border-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" />
                </div>
                <div className="flex justify-end">
                    <button className="w-full sm:w-fit bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign in</button>
                </div>
            </form>
        </main>
        </>
    )
}
