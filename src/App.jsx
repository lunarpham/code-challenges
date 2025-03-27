import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";

const cars = [
  {
    id: 1,
    model: "Toyota Prius",
    price: 27000,
    image: "/car3.svg",
    category: "hybrid",
  },

  {
    id: 2,
    model: "Toyota Corolla",
    price: 20000,
    image: "/car2.svg",
    category: "sedan",
  },

  {
    id: 3,
    model: "Toyota Camry",
    price: 30000,
    image: "/car1.svg",
    category: "sedan",
  },

  {
    id: 4,
    model: "Toyota Highlander",
    price: 40000,
    image: "/car4.svg",
    category: "suv",
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home cars={cars} />} />
        <Route path="/details/:carId" element={<Details cars={cars} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
