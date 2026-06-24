import { NavLink, useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/auth.js";
function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-300 hover:bg-slate-700 hover:text-white"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-slate-900 p-4 overflow-y-auto shadow-xl z-50">
      <h1 className="text-white text-3xl font-bold mb-6">Inventory</h1>

      <div className="bg-slate-800 rounded-lg p-3 mb-6">
        <p className="text-white font-semibold">{user?.username}</p>

        <p className="text-sm text-gray-400 uppercase">{user?.role}</p>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink to="/" end className={linkClass}>
          Dashboard
        </NavLink>

        {isAdmin() && (
          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>
        )}

        <NavLink to="/issued" className={linkClass}>
          Issued Assets
        </NavLink>

        <NavLink to="/returned" className={linkClass}>
          Returned Assets
        </NavLink>

        <NavLink to="/damaged" className={linkClass}>
          Damaged Assets
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
      >
        Logout
      </button>
    </aside>
  );
}

export default Navbar;
