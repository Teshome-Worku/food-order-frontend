import { Link } from "react-router-dom";
import { ROUTES } from "../constants";

const Footer = () => (
  <footer className="mt-12 bg-gray-900 text-gray-300 sm:mt-16">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-center sm:px-6 md:grid-cols-3 md:text-left">
        <div>
          <h2 className="mb-3 text-lg font-bold text-white sm:text-xl">ማሚ Food</h2>
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
          <h3 className="mb-2 font-semibold text-white">Contact</h3>
          <p className="text-sm text-gray-400">
            Phone: +251 9XX XXX XXX <br />
            Email: info@mamifood.com
          </p>
        </div>
      </div>

    <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} ማሚ Food. All rights reserved.{" "}
      <Link
        to={ROUTES.ADMIN_LOGIN}
        className="text-gray-400 hover:text-white transition"
      >
        Admin
      </Link>
    </div>
  </footer>
);

export default Footer;
