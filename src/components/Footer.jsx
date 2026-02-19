import { Link } from "react-router-dom";

import { BRAND_NAME, ROUTES } from "../constants";

const Footer = () => (
  <footer className="mt-12 bg-gray-900 text-gray-300 sm:mt-16">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-center sm:px-6 md:grid-cols-3 md:text-left">
      <div>
        <h2 className="mb-3 text-lg font-bold text-white sm:text-xl">{BRAND_NAME}</h2>
        <p className="text-sm text-gray-400">
          Delicious food made with love and delivered fast.
        </p>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-white">Address</h3>
        <p className="text-sm text-gray-400">
          Adama, Ethiopia <br />
          Bole Sub City
        </p>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-white">Quick Links</h3>
        <div className="space-x-3 text-sm text-gray-400">
          <Link to={ROUTES.MENU} className="transition hover:text-white">
            Menu
          </Link>
          <Link to={ROUTES.TRACK_ORDER} className="transition hover:text-white">
            Track Order
          </Link>
          <Link to={ROUTES.ADMIN_LOGIN} className="transition hover:text-white">
            Admin
          </Link>
        </div>
      </div>
    </div>

    <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
      Copyright {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
    </div>
  </footer>
);

export default Footer;
