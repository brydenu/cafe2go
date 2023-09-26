export default function OrderNote({ updateDrink }) {
  const handleChange = (e) => {
    const noteInput = e.target.value;
    updateDrink("note", noteInput);
  };

  return (
    <div
      className="w-full flex flex-nowrap justify-between items-center mb-1 mt-4"
      style={{ zIndex: 50 }}
    >
      <label className="text-xl">Notes</label>
      <input
        className="border text-xl pr-1 pl-3 py-1 rounded w-1/2"
        onChange={handleChange}
      />
    </div>
  );
}
