export default function OrderNote({ updateDrink, fontSize = "xl" }) {
    const handleChange = (e) => {
        const noteInput = e.target.value;
        updateDrink("note", noteInput);
    };

    return (
        <div
            className="w-full flex flex-nowrap justify-between items-center mt-2 mb-4"
            style={{ zIndex: 50 }}
        >
            <label className={`text-${fontSize}`}>Notes</label>
            <input
                className={`border text-${fontSize} pr-1 pl-3 py-1 rounded w-1/2`}
                onChange={handleChange}
            />
        </div>
    );
}
