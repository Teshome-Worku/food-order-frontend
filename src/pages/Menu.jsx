// import menu from "../data/menu"
// import FoodCard from "../components/FoodCard"

// const Menu = () => {
//   return (
//     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {menu.map(food => (
//         <FoodCard key={food.id} food={food} />
//       ))}
//     </div>
//   )
// }

// export default Menu

const Menu = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-orange-500">
        Food Menu
      </h1>
      <p className="mt-4 text-gray-600">
        Menu items will appear here 🍕🍔
      </p>
    </div>
  )
}

export default Menu
