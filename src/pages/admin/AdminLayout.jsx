import { NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import { ROUTES, STORAGE_KEYS } from "../../constants";

const navItemClass = ({ isActive }) =>
  `block rounded-lg px-4 py-2 transition ${
    isActive
      ? "border-l-4 border-orange-500 bg-gray-700"
      : "hover:bg-gray-800"
  }`;

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);

  if (!token) {
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace state={{ from: location }} />;
  }

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    navigate(ROUTES.ADMIN_LOGIN, { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 md:flex-row">
      <aside className="w-full bg-gray-900 text-white md:w-64 md:shrink-0">
        <div className="border-b border-gray-700 p-6 text-2xl font-bold">
          Restaurant Admin
        </div>

        <nav className="flex flex-wrap gap-2 p-4 md:block md:space-y-2 md:gap-0">
          <NavLink to="orders" className={navItemClass}>
            Orders
          </NavLink>
          <NavLink to="menu" className={navItemClass}>
            Menu
          </NavLink>
          <NavLink to="announcements" className={navItemClass}>
            Announcements
          </NavLink>
          <NavLink to="settings" className={navItemClass}>
            Settings
          </NavLink>
        </nav>

        <div className="border-t border-gray-700 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg bg-red-500 py-2 font-medium transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
