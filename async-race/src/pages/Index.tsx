import React from "react";
import { Nav } from "../components/Nav";
import { NavLink } from "react-router-dom";

export function Index() {
  return (
    <>
      <Nav />
      <div className="flex justify-center text-white text-xl mt-[10%]">
        This project created by Armen Muradyan as a practical task for EPAM JS Intership
      </div>
      <div className="flex justify-center mt-3">
        <NavLink to={"/garage"} className="bg-blue-800 text-white p-2 rounded-md font-semibold">
          Go To Garage
        </NavLink>
      </div>
    </>
  );
}
