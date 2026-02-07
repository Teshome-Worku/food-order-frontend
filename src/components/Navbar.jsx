import { NavLink } from "react-router-dom"
const Navbar = () => {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
            {/* <h1 className="text-xl font-bold text-orange-500">ማሚ Food</h1> */}
            <NavLink
                to="/"
                className="text-2xl font-bold text-orange-500 no-underline"
                >
                ማሚ Food
            </NavLink>

          <div className="flex gap-6 items-center">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold"
                  : "text-gray-700 hover:text-orange-500"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold"
                  : "text-gray-700 hover:text-orange-500"
              }
            >
              Menu
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                [
                  "text-white px-4 py-2 rounded-lg transition duration-300",
                  isActive ? "bg-orange-600" : "bg-orange-500 hover:bg-orange-600",
                ].join(" ")
              }
            >
              Cart
            </NavLink>
          </div>
        </div>
      </nav>
    )
  }
  
  export default Navbar
  