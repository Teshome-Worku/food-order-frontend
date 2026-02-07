import { useState,useEffect } from "react"
import { NavLink } from "react-router-dom"
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto"
  }, [isMenuOpen])
  

  const navItemClass = ({ isActive }) =>
    [
      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
      isActive
        ? "text-orange-500 font-semibold"
        : "text-gray-700 hover:text-orange-500",
    ].join(" ")

  const mobileNavItemClass = ({ isActive }) =>
    [
      "block rounded-md px-3 py-2 text-base font-medium transition-colors",
      isActive
        ? "text-orange-500 font-semibold"
        : "text-gray-700 hover:text-orange-500",
    ].join(" ")

  const cartClass = ({ isActive }) =>
    [
      "rounded-lg px-4 py-2 text-sm font-medium text-white transition duration-300",
      isActive ? "bg-orange-600" : "bg-orange-500 hover:bg-orange-600",
    ].join(" ")

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-xl font-bold text-orange-500 sm:text-2xl"
          onClick={closeMenu}
        >
          ማሚ Food
        </NavLink>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" end className={navItemClass}>
              Home
            </NavLink>
            <NavLink to="/menu" className={navItemClass}>
              Menu
            </NavLink>
          </div>

          {/* Cart (always visible) */}
          <NavLink to="/cart" className={cartClass}>
            {/* Cart */}
            <FiShoppingCart className="text-2xl " />

          </NavLink>

          {/* Hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu (Home + Menu only) */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <NavLink to="/" end className={mobileNavItemClass} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/menu" className={mobileNavItemClass} onClick={closeMenu}>
              Menu
            </NavLink>
          </div>
        </div>
      )}
    </nav>
    
  )
}

export default Navbar
