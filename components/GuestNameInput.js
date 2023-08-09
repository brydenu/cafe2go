export default function GuestNameInput({ setGuestName }) {
  const handleChange = (e) => {
    const guestInput = e.target.value;
    setGuestName(guestInput);
  };
  return (
    <div
      className="w-full flex flex-nowrap justify-between items-center mb-1 mt-4"
      style={{ zIndex: 115 }}
    >
      <label className="text-xl">Name</label>
      <input
        className="border text-xl pr-1 pl-3 py-1 rounded w-1/2"
        required={true}
        onChange={handleChange}
      ></input>
    </div>
  );
}
