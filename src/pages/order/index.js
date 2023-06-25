import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "components/Header";
import getIngredients from "utils/getIngredients";
import getMenu from "utils/getMenu";
import getCustomizations from "utils/getCustomizations";
import DrinkOption from "components/DrinkOption";
import OrderCustomization from "components/OrderCustomization";
import FormCheckbox from "components/FormCheckbox";
import HotIcedOption from "components/HotIcedOption";
import CustomTempOption from "components/CustomTempOption";

export default function Order({ menu, ingredients, customizations }) {
  const [bevType, setBevType] = useState("coffee");
  const [selectedDrink, setSelectedDrink] = useState(menu[0]);
  const [currentDrinkCustomizations, setCurrentDrinkCustomizations] = useState([]);
  const [selectedCustomizations, setSelectedCustomizations] = useState({drink: selectedDrink.menu_id});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // console.log("selectedDrink:", selectedDrink);egg slay!!!!!!! geeia smells
  /*

  
  */
  // console.log("selectedCustomizations:", selectedCustomizations);
  console.log("selectedDrink:", selectedDrink);

  const router = useRouter();

  const bevTabClasses = "w-40 text-white text-xl px-5 py-2 rounded-xl duration-200";
  const selectedOption = "bg-blfs-teal " + bevTabClasses;
  const unselectedOption = "bg-blfs-blue hover:bg-blfs-teal/50  " + bevTabClasses;

  useEffect(() => {
    const getCurrentDrinkCustomizationOptions = async () => {
      const res = await axios.get(`api/customizations/${selectedDrink.menu_id}`);
      const { customizations } = res.data;
      setCurrentDrinkCustomizations(customizations);
      setSelectedCustomizations({menu_id: selectedDrink});
      if (bevType === "coffee" && !!selectedCustomizations?.num_shots) {
        setSelectedCustomizations((selectedCustomizations) => ({...selectedCustomizations, "num_shots": {"ingredient_name": 2, "in_stock": true, "shots_option": true}}))
      }
    };

    getCurrentDrinkCustomizationOptions();
  }, [selectedDrink]);
  
  const handleChangeTab = (e) => {
    e.preventDefault();
    const newBevType = e.target.value;
    setBevType(newBevType);
  }

  const updateDrink = (property, value=null) => {
    if (value) {
      setSelectedCustomizations((selectedCustomizations) => ({...selectedCustomizations, [property]: value}));
    } else {
      const customizationsWithoutProperty = {...selectedCustomizations};
      delete customizationsWithoutProperty[property];
      setSelectedCustomizations(customizationsWithoutProperty);
    }
  }

  const handleGoBack = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = { "drink": selectedCustomizations };
    try {
      const res = await axios.post(`api/orders`, data);
      if (res.status === 201) {
        console.log("success");
        const { order_id } = res.data;
        router.push(`/order/success?order_id=${order_id}`);
      } else {
        console.log("no")
      }
      console.log("res.data from post:", res);
    } catch (e) {
      console.error(e);
    }
  }

  console.log("selectedCustomizations", selectedCustomizations);
  return (
    <>
      <Header />
      <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200">
        <h1 className="text-4xl mb-4">Order A Drink</h1>
        <small className="text-sm mb-8 text-blfs-teal underline hover:cursor-pointer" onClick={handleGoBack}>Back to dashboard</small>
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 flex flex-col justify-center items-center bg-blfs-blue pt-10 pb-1 rounded">
          <div className="w-full flex justify-evenly mb-2">
            <button type="button" value="coffee" className={bevType === "coffee" ? selectedOption : unselectedOption} onClick={handleChangeTab}>Coffee</button>
            <button type="button" value="tea" className={bevType === "tea" ? selectedOption : unselectedOption} onClick={handleChangeTab}>Tea</button>
            <button type="button" value="other" className={bevType === "other" ? selectedOption : unselectedOption} onClick={handleChangeTab}>Other</button>
          </div>
          <form className="w-full flex flex-col w-full bg-white justify-center mb-2 px-8 sm:px-16">
            <DrinkOption bevType={bevType} selectedDrink={selectedDrink} setSelectedDrink={setSelectedDrink} menu={menu} updateDrink={updateDrink} />
            <hr />
            {selectedDrink.menu_id !== 10 &&
            (<>
                <HotIcedOption updateDrink={updateDrink} selectedDrink={selectedDrink} />
                <CustomTempOption isIced={selectedCustomizations?.hot_iced?.ingredient_name === "iced"} updateDrink={updateDrink} />
              </>)
            }
            {(bevType === "coffee" || !!selectedCustomizations.num_shots) && (
              <FormCheckbox customization={{"customization_label": "Decaf", "customization_name": "decaf"}} updateDrink={updateDrink} selectedDrink={selectedDrink} />
            )}
            <OrderCustomization customizations={currentDrinkCustomizations} updateDrink={updateDrink} selectedDrink={selectedDrink} bevType={bevType} />
          </form>
          <button className="w-40 text-white rounded-xl bg-green-600 hover:bg-green-500 duration-200 self-end font-bold text-lg mx-10 my-2 px-4 py-2 flex justify-center align-middle" onClick={handleSubmit}>
            {isSubmitting ? 
            (<div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
            </div>)
            :
            (
              "Submit Order"
            )}
          </button>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps(context) {
      const menu = await getMenu();
      const ingredients = await getIngredients();
      const customizations = await getCustomizations();

  return {
    props: {
      menu,
      ingredients,
      customizations
    }
  }
}