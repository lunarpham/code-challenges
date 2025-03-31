import { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Testimonials from "./sections/Testimonials";
import Pricing from "./sections/Pricing";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("savedTheme", darkMode ? "light" : "dark");
  };

  useEffect(() => {
    let savedTheme = localStorage.getItem("savedTheme");
    if (!savedTheme) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        savedTheme = "dark";
        setDarkMode(true);
        localStorage.setItem("savedTheme", "dark");
      } else {
        savedTheme = "light";
        setDarkMode(false);
        localStorage.setItem("savedTheme", "light");
      }
    } else {
      if (savedTheme === "dark") {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    }
  }, []);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen transition-colors duration-300">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
