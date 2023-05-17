import { useState, useEffect } from "react";
import Header from "components/Header";
import OrderCustomization from "components/OrderCustomization";
import getIngredients from "helpers/getIngredients";
import getMenu from "helpers/getMenu";

export default function Order({ menu, ingredients }) {
  const [bevType, setBevType] = useState("coffee");

  const bevTabClasses = "w-40 text-white text-xl px-5 py-2 rounded-xl duration-200";
  const selectedOption = "bg-blfs-teal " + bevTabClasses;
  const unselectedOption = "bg-blfs-blue hover:bg-blfs-teal/50  " + bevTabClasses;

  console.log("ingredients print:", ingredients);
  console.log("menu print:", menu);
    
  const handleChangeTab = (e) => {
    e.preventDefault();
    const newBevType = e.target.value;
    setBevType(newBevType);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <Header />
      <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200">
        <h1 className="text-4xl mb-8">Order A Drink</h1>
        <div className="w-2/3 flex flex-col justify-center items-center bg-blfs-blue pt-10 pb-1 rounded">
          <div className="w-full flex justify-evenly mb-2">
            <button type="button" value="coffee" className={bevType === "coffee" ? selectedOption : unselectedOption} onClick={handleChangeTab}>Coffee</button>
            <button type="button" value="tea" className={bevType === "tea" ? selectedOption : unselectedOption} onClick={handleChangeTab}>Tea</button>
            <button type="button" value="other" className={bevType === "other" ? selectedOption : unselectedOption} onClick={handleChangeTab}>Other</button>
          </div>
          <div className="w-full flex flex-col w-full bg-white justify-center mb-2 px-8">
            {/* {customizeOptions.map((customization) => (
              <>
                <OrderCustomization key={customization.id} label={customization.label} options={customization.options} />
                <hr />
              </>
            ))} */}
            <OrderCustomization label="Drink" options={menu} ingredient={false} />
            <OrderCustomization label="Milk" options={ingredients.milks} />
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

  return {
    props: {
      menu,
      ingredients
    }
  }
}