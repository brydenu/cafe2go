import { useState } from "react";
import Header from "components/Header";
import OrderCustomization from "components/OrderCustomization";

export default function Order() {
  const [bevType, setBevType] = useState("coffee");
  const [customizations, setCustomizations] = useState({});

  const bevTabClasses = "w-40 text-white text-xl px-5 py-2 rounded-xl duration-200";
  const selectedOption = "bg-blfs-teal " + bevTabClasses;
  const unselectedOption = "bg-blfs-blue hover:bg-blfs-teal/50  " + bevTabClasses;

  const customizeOptions = [
    {
      id: 1,
      label: "Drink Type",
      options: [
        {id: 1, label: "Americano", unavailable: false},
        {id: 2, label: "Latte", unavailable: false},
        {id: 3, label: "Mocha", unavailable: false},
        {id: 4, label: "White Mocha", unavailable: false},
        {id: 5, label: "Caramel Macchiato", unavailable: false},
        {id: 5, label: "Espresso", unavailable: false},
        {id: 6, label: "Cortado", unavailable: false},
        {id: 7, label: "Espresso Macchiato", unavailable: false}
      ]
    },
    {
      id: 2,
      label: "Hot/Iced",
      options: [
        {id: 1, label: "Hot", unavailable: false},
        {id: 2, label: "Iced", unavailable: false},
      ]
    },
    {
      
      id: 3,
      label: "Number of shots",
      options: [
        {id: 1, label: 1, unavailable: false},
        {id: 2, label: 2, unavailable: false},
        {id: 3, label: 3, unavailable: false},
        {id: 4, label: 4, unavailable: false},
        {id: 5, label: 5, unavailable: false},
        {id: 6, label: 6, unavailable: false},
        {id: 7, label: 7, unavailable: false},
        {id: 8, label: 8, unavailable: false}
      ]
    },
    {
      id: 4,
      label: "Syrup",
      options: [
        {id: 1, label: "No Syrup", unavailable: false},
        {id: 2, label: "Vanilla", unavailable: false},
        {id: 3, label: "Caramel", unavailable: false},
        {id: 4, label: "Hazelnut", unavailable: false},
        {id: 5, label: "English Toffee", unavailable: false},
        {id: 6, label: "Mocha", unavailable: false},
        {id: 7, label: "White Mocha", unavailable: false},
        {id: 8, label: "Lavender", unavailable: false},
        {id: 9, label: "Pistachio", unavailable: false},
        {id: 10, label: "Pumpkin Spice", unavailable: false},
        {id: 11, label: "Cardamom", unavailable: false},
        {id: 12, label: "Brown Sugar Cinnamon", unavailable: false},
        {id: 13, label: "Cane Sugar", unavailable: false},
        {id: 14, label: "Peppermint", unavailable: false},
        {id: 15, label: "Sugar Free Vanilla", unavailable: false},
        {id: 16, label: "Sugar Free Hazelnut", unavailable: false},
        {id: 17, label: "Sugar Free Caramel", unavailable: false},
        {id: 18, label: "Sugar Free Peppermint", unavailable: false},
        {id: 19, label: "Sugar Free Chocolate", unavailable: false},
        {id: 20, label: "Sugar Free White Chocolate", unavailable: false}
      ]
    },
    {
      id: 5,
      label: "Sauce",
      options: [
        {id: 1, label: "No Sauce", unavailable: false},
        {id: 2, label: "Caramel Sauce", unavailable: false},
        {id: 3, label: "Chocolate Sauce", unavailable: false}
      ]
    },
    {
      id: 6,
      label: "Foam",
      options: [
        {id: 1, label: "Normal Foam", unavailable: false},
        {id: 2, label: "Extra Foam", unavailable: false},
        {id: 3, label: "No Foam", unavailable: false},
      ]
    }
  ]
    
  const handleChangeTab = (e) => {
    e.preventDefault();
    const newBevType = e.target.value;
    setBevType(newBevType);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(customizations);
  }


  const testOptions = [
    {id: 1, label: "Hot", unavailable: false},
    {id: 3, label: "Iced", unavailable: false},
    {id: 3, label: "Room Temp", unavailable: true},
]
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
            {customizeOptions.map((customization) => (
              <>
                <OrderCustomization key={customization.id} label={customization.label} options={customization.options} />
                <hr />
              </>
            ))}
          </div>
          <button className="w-30 text-white rounded-xl bg-green-600 hover:bg-green-500 duration-200 self-end font-bold text-lg mx-10 my-2 px-4 py-2" onClick={handleSubmit}>Submit Order</button>
        </div>
      </main>
    </>
  )
}