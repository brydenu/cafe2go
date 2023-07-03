import { useRouter } from 'next/router';

export default function DashboardOption({ title, destination, bgColor, bgHover, isDisabled }) {
    const router = useRouter();

    const handleClick = () => {
        if (!isDisabled) {
            router.push(destination);
        }
    }
    const backgroundColor = `bg-${bgColor} hover:bg-${bgHover}`;

    return (
        <div className={`w-90 h-24 mx-5 sm:w-60 sm:h-60 sm:px-10 sm:aspect-square flex flex-col justify-center items-center rounded shadow-md m-2 duration-300 ${isDisabled ? `bg-gray-500` : `hover:cursor-pointer ${backgroundColor}`} ` } onClick={handleClick}>
            <p className="text-center text-white font-bold text-2xl">{title}</p>
            {isDisabled && 
                <p className="text-center text-white italic text-xl ">(Coming soon)</p>
            }
        </div>
    )
}