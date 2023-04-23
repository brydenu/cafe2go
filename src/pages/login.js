import Header from 'components/header/header'

export default function Login() {


    return (
        <>
        <Header />
        <main className="w-full h-screen flex items-center justify-center bg-blfs-blue">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/5 h-1/3 flex flex-col justify-center">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
                    <input className="shadow appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                    <input className="shadow appearance-none border-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" />
                </div>
                <div className="flex justify-end">
                    <button className="bg-blfs-teal hover:bg-blfs-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign in</button>
                </div>
            </form>
        </main>
        </>
    )
}
