import { useState } from "react";
import { NavLink } from "react-router-dom";

import CartIcon from "./CartIcon";
import useBodyScrollLock from "../hooks/useBodyScrollLock";
import { BRAND_NAME, ROUTES } from "../constants";
import { useCart } from "../context/cartContext";

const navItemClass = ({ isActive }) =>
  [
    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "font-semibold text-orange-500"
      : "text-gray-700 hover:text-orange-500",
  ].join(" ");

const mobileNavItemClass = ({ isActive }) =>
  [
    "block rounded-md px-3 py-2 text-base font-medium transition-colors",
    isActive
      ? "font-semibold text-orange-500"
      : "text-gray-700 hover:text-orange-500",
  ].join(" ");

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  useBodyScrollLock(isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <NavLink
          to={ROUTES.HOME}
          className="text-xl font-bold text-orange-500 sm:text-2xl"
          onClick={closeMenu}
        >
          {BRAND_NAME}
        </NavLink>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <NavLink to={ROUTES.HOME} end className={navItemClass}>
              Home
            </NavLink>
            <NavLink to={ROUTES.MENU} className={navItemClass}>
              Menu
            </NavLink>
            <NavLink to={ROUTES.TRACK_ORDER} className={navItemClass}>
              Track Order
            </NavLink>
          </div>

          <button
            type="button"
            onClick={openCart}
            className="rounded-lg bg-orange-500 px-2 py-1 transition hover:bg-orange-600"
            aria-label={`Cart with ${cartCount} items`}
          >
            <CartIcon cartCount={cartCount} />
          </button>

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
                <path d="M4 6h20" />
                <path d="M4 12h20" />
                <path d="M4 18h20" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <NavLink
              to={ROUTES.HOME}
              end
              className={mobileNavItemClass}
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to={ROUTES.MENU}
              className={mobileNavItemClass}
              onClick={closeMenu}
            >
              Menu
            </NavLink>
            <NavLink
              to={ROUTES.TRACK_ORDER}
              className={mobileNavItemClass}
              onClick={closeMenu}
            >
              Track Order
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
