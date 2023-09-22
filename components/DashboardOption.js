import { useRouter } from "next/router";

export default function DashboardOption({
  title,
  destination,
  bgColor,
  bgHover,
  isDisabled,
  primaryOption = false,
}) {
  const router = useRouter();

  const handleClick = () => {
    if (!isDisabled) {
      router.push(destination);
    }
  };
  const backgroundColor = `bg-${bgColor} hover:bg-${bgHover} active:bg-${bgHover} focus:bg-${bgHover}`;

  return (
    <div
      className={`w-90 h-24 sm:h-32 mx-5 ${
        primaryOption ? " sm:w-full mx-5 " : " sm:w-full sm:min-w-48 sm:px-10 "
      } sm:h-60 sm:px-10 flex flex-col justify-center items-center rounded shadow-md m-2 duration-300 ${
        isDisabled ? `bg-gray-500` : `hover:cursor-pointer ${backgroundColor}`
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
        <p className="text-center text-white italic text-lg ">(Coming soon)</p>
      )}
    </div>
  );
}
