export default function OrderCustomization({ label, options, isDropdown }) {
    return (
        <div className="w-full flex flex-nowrap"><label className="text-xl my-2" for={label.for}>{label.label}</label></div>
    )
}