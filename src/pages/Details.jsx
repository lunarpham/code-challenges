import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import { FaStar } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";

function Details({ cars }) {
  const { carId } = useParams();
  const selectedCar = cars.find((car) => car.id === Number(carId));
  const images = [selectedCar.image, selectedCar.image, selectedCar.image];
  return (
    <div>
      <Navbar />
      <div className="w-11/12 md:w-4/5 m-auto py-20 flex flex-col md:flex-row justify-between md:space-x-10">
        <div className="md:w-1/2 space-y-5">
          <p>
            <Link to="/">Home</Link> {">"} Cars {">"}{" "}
            <span className="font-semibold text-indigo-500">Details</span>{" "}
          </p>
          <h1 className="text-4xl font-bold">{selectedCar.model}</h1>
          <h1 className="text-3xl font-bold text-indigo-500">
            $ {selectedCar.price}
          </h1>
          <ImageSlider images={images} />
        </div>
        <div class name="md:w-1/2 flex flex-col justify-between p-4">
          <div className="py-5 border-b space-y-2">
            <h1 className="text-2xl font-semibold">Rating & Reviews</h1>
            <div className="flex space-x-5 items-center">
              <div className="flex space-x-1 text-amber-500 items-center">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p>
                <span className="font-bold">4.8 </span>(120 reviews)
              </p>
            </div>
          </div>
          <div className="py-5 border-b space-y-2">
            <h1 className="text-2xl font-semibold">Colors</h1>
            <div className="flex space-x-5 items-center">
              <div className="w-6 h-6 rounded-full bg-blue-500"></div>
              <div className="w-6 h-6 rounded-full bg-red-500"></div>
              <div className="w-6 h-6 rounded-full bg-black"></div>
            </div>
          </div>
          <div className="py-5 border-b space-y-2">
            <h1 className="text-2xl font-semibold">Description</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo et
              dolore ab error accusamus itaque amet nisi modi, ratione labore
              iure fuga saepe adipisci natus quod deleniti accusantium, sapiente
              velit.
            </p>
          </div>
          <div className="py-5 border-b space-y-2 flex justify-between">
            <div>
              <h1 className="md:text-2xl font-semibold">{selectedCar.model}</h1>
              <p>Buy Now</p>
            </div>
            <button className="w-48 px-8 py-2 flex justify-between items-center bg-indigo-500 text-white rounded-md">
              <span className="text-xl font-bold">{selectedCar.price}</span>
              <span className="p-1 bg-white/20 rounded-lg">
                <IoIosArrowRoundForward size={24} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
