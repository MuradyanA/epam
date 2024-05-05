import { NavLink } from "react-router-dom";

export function Nav() {

  return (
    <nav className="text-white font-semibold flex w-full justify-center justify-around">
      <NavLink className={({ isActive }) => (isActive ? "text-green-400" : "")} to="/garage">
        Garage
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? "text-green-400" : "")} to="/winners">
        Winers
      </NavLink>
    </nav>
  );
}
