import IngredientOption from "./IngredientOption";

export default function OrderCustomization({ customizations, updateDrink }) {

    return (
        <div className="w-full flex flex-col w-full bg-white justify-center items-center mb-2 px-8">
            { !(customizations.length > 0) ? 
            (<>
                <div className="m-10 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blfs-teal border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </>)
            : 
              customizations.map((customization) => {
                   return (<>
                        <IngredientOption customization={customization} key={customization.customization_id} updateDrink={updateDrink} />
                        <hr />
                    </>)
                })
            }
        </div>
    )
}