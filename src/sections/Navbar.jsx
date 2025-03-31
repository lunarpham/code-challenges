import React, { useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { FiMoon } from "react-icons/fi";
import { LuMenu } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="px-8 py-3 bg-white/60 dark:bg-black/60 border-b border-gray-500/20 dark:border-white/20 sticky top-0 z-50 w-full backdrop-blur">
        <div className="mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-[#eaeaea] rounded-md"></div>
            <h1 className="font-bold text-xl">Brand</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-6 text-sm font-medium">
            <nav className="gap-6 hidden md:flex">
              <a href="#features">Features</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#pricing">Pricing</a>
              <a href="#contact">Contact</a>
            </nav>
            <button
              onClick={() => {
                toggleDarkMode();
              }}
              className="rounded-md h-10 w-10 px-0 md:h-9 md:px-3 md:w-fit inline-flex justify-center items-center bg-white border border-black/10 hover:bg-black/10 dark:bg-black dark:border-white/20 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {darkMode ? (
                <MdOutlineLightMode size={17} />
              ) : (
                <FiMoon size={17} />
              )}
            </button>
            <button className="hidden md:block px-4 py-2 h-10 rounded-md bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disable:pointer-events-none">
              Get Started
            </button>
            <button
              onClick={() => {
                toggleMenu();
              }}
              className="block md:hidden rounded-md h-10 w-10 inline-flex items-center md:h-9 px-3 bg-white border border-black/10 hover:bg-black/10 dark:bg-black dark:border-white/20 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {open ? <IoMdClose size={18} /> : <LuMenu size={18} />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="px-8 py-3 border-b border-gray-500/20 dark:border-white/20 backdrop-blur-sm sticky relative top-0 w-full z-10">
          <nav className="flex flex-col gap-4 text-sm">
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
            <button className="px-4 py-2 w-full text-sm inline-flex justify-center items-center h-10 rounded-md bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disable:pointer-events-none">
              Get Started
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
