import { useRouter } from 'next/router';

export default function DashboardOption({ title, destination, bgColor, bgHover }) {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();

        router.push(destination);
    }
    console.log("bgColor", bgColor)
    const backgroundColor = `bg-${bgColor} hover:bg-${bgHover}`;

    return (
        <div className={`w-52 px-10 aspect-square flex justify-center items-center rounded shadow-md m-2 hover:cursor-pointer ` + backgroundColor } onClick={handleClick}>
            <p className="text-center text-white font-bold text-2xl">{title}</p>
        </div>
    )
}