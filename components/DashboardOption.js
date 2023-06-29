import { useRouter } from 'next/router';

export default function DashboardOption({ title, destination, bgColor, bgHover }) {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();

        router.push(destination);
    }
    const backgroundColor = `bg-${bgColor} hover:bg-${bgHover}`;

    return (
        <div className={`w-90 h-24 mx-5 sm:w-52 sm:h-52 sm:px-10 sm:aspect-square flex justify-center items-center rounded shadow-md m-2 duration-300 hover:cursor-pointer ` + backgroundColor } onClick={handleClick}>
            <p className="text-center text-white font-bold text-2xl">{title}</p>
        </div>
    )
}