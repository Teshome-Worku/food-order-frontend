import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { ROUTES, STORAGE_KEYS } from "../../constants";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);

  if (!token) {
    navigate(ROUTES.ADMIN_LOGIN, { replace: true, state: { from: location } });
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    navigate(ROUTES.ADMIN_LOGIN, { replace: true });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        
        {/* Logo / Title */}
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Restaurant Admin
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          <NavItem to="orders" label="Orders" />
          <NavItem to="menu" label="Menu" />
          <NavItem to="announcements" label="Announcements" />
          <NavItem to="settings" label="Settings" />
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

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg transition ${
          isActive
            ? "bg-gray-700 border-l-4 border-orange-500"
            : "hover:bg-gray-800"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default AdminLayout;
