import { useRouter } from "next/router";

export default function DashboardOption({
    title,
    destination,
    isDisabled,
    primaryOption = false,
    mainOption = false,
}) {
    const router = useRouter();

    const handleClick = () => {
        if (!isDisabled) {
            router.push(destination);
        }
    };

    const bgColor = mainOption ? "[#ded881]" : "primary";
    const bgHover = "secondary";
    const backgroundColor = mainOption
        ? "bg-secondary hover:bg-[#241e1e] active:bg-[#241e1e] focus:bg-[#241e1e] border-primary border-2"
        : "bg-primary hover:bg-[#241e1e] active:bg-[#241e1e] focus:bg-[#241e1e]";
    // console.log("backgroundvcolor", backgroundColor);

    return (
        <div
            className={`w-90 h-24 sm:h-32 max-h-32 mx-5 ${
                primaryOption
                    ? " sm:w-full mx-5 "
                    : " sm:w-full sm:min-w-48 sm:px-10 "
            } sm:h-60 sm:px-10 flex flex-col justify-center items-center rounded shadow-md m-2 duration-300 ${
                isDisabled
                    ? `bg-gray-500`
                    : `hover:cursor-pointer ${backgroundColor}`
            } `}
            onClick={handleClick}
        >
            <p
                className={`text-center text-white font-bold ${
                    primaryOption ? " text-2xl" : " text-xl"
                }`}
            >
                {title}
            </p>
            {isDisabled && (
                <p className="text-center text-white italic text-lg ">
                    (Coming soon)
                </p>
            )}
        </div>
    );
}
