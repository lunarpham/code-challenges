import React from "react";

function Navbar() {
  return (
    <div className="bg-white sticky top-0 z-40 py-5">
      <div className="w-11/12 md:w-4/5 m-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold">BuyCar</h1>
        <ul className="hidden md:flex space-x-5 text-sm font-semibold">
          <li>Home</li>
          <li>Cars</li>
          <li>Contact Us</li>
          <li>Help</li>
        </ul>
        <div className="flex space-x-5 items-center">
          <button className="px-5 py-2 text-indigo-600 font-semibold">
            Register
          </button>
          <button className="px-5 py-2 text-indigo-600 rounded-md border border-indigo-600 font-semibold">
            Signin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
