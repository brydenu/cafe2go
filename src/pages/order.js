import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "components/Header";
import getIngredients from "helpers/getIngredients";
import getMenu from "helpers/getMenu";
import getCustomizations from "helpers/getCustomizations";
import DrinkOption from "components/DrinkOption";
import IngredientOption from "components/IngredientOption";
import QuantityOption from "components/QuantityOption";
import OrderCustomization from "components/OrderCustomization";


export default function Order({ menu, ingredients, customizations }) {
  const [bevType, setBevType] = useState("coffee");
  const [selectedDrink, setSelectedDrink] = useState(menu[0]);
  const [currentDrinkCustomizations, setCurrentDrinkCustomizations] = useState([]);

  const router = useRouter();

  const bevTabClasses = "w-40 text-white text-xl px-5 py-2 rounded-xl duration-200";
  const selectedOption = "bg-blfs-teal " + bevTabClasses;
  const unselectedOption = "bg-blfs-blue hover:bg-blfs-teal/50  " + bevTabClasses;

  useEffect(() => {
    const getCurrentDrinkCustomizationOptions = async () => {
      const res = await fetch(`api/customizations/${selectedDrink.menu_id}`);
      const { customizations } = await res.json()
      setCurrentDrinkCustomizations(customizations);
    };

    getCurrentDrinkCustomizationOptions();
  }, [selectedDrink]);
  
  const handleChangeTab = (e) => {
    e.preventDefault();
    const newBevType = e.target.value;
    setBevType(newBevType);
  }

  const handleGoBack = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <Header />
      <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200">
        <h1 className="text-4xl mb-4">Order A Drink</h1>
        <small className="text-sm mb-8 text-blfs-teal underline hover:cursor-pointer" onClick={handleGoBack}>Back to dashboard</small>
        <div className="w-2/3 flex flex-col justify-center items-center bg-blfs-blue pt-10 pb-1 rounded">
          <div className="w-full flex justify-evenly mb-2">
            <button type="button" value="coffee" className={bevType === "coffee" ? selectedOption : unselectedOption} onClick={handleChangeTab}>Coffee</button>
            <button type="button" value="tea" className={bevType === "tea" ? selectedOption : unselectedOption} onClick={handleChangeTab}>Tea</button>
            <button type="button" value="other" className={bevType === "other" ? selectedOption : unselectedOption} onClick={handleChangeTab}>Other</button>
          </div>
          <div className="w-full flex flex-col w-full bg-white justify-center mb-2 px-8">
            <DrinkOption selectedDrink={selectedDrink} setSelectedDrink={setSelectedDrink} menu={menu} />
            <hr />
            <OrderCustomization customizations={currentDrinkCustomizations} />
          </div>
          <button className="w-30 text-white rounded-xl bg-green-600 hover:bg-green-500 duration-200 self-end font-bold text-lg mx-10 my-2 px-4 py-2" onClick={handleSubmit}>Submit Order</button>
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