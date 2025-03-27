import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

function Search() {
  return (
    <div className="flex justify-center py-10">
      <div className="flex items-center space-x-8 bg-gray-50 p-5 rounded-full">
        <div className="flex items-center space-x-5">
          <FaLocationDot />
          <select className="bg-transparent w-full border border-gray-50 rounded outline-0 focus:ring focus:ring-indigo-200">
            <option value="">Select a country</option>
            <option value="US">USA</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
          </select>
        </div>
        <div>
          <select className="bg-transparent w-full border border-gray-50 rounded outline-0 focus:ring focus:ring-indigo-200">
            <option value="">Select Vendor</option>
            <option value="toyota">Toyota</option>
            <option value="honda">Honda</option>
            <option value="ford">Ford</option>
          </select>
        </div>
        <div>
          <select className="bg-transparent w-full border border-gray-50 rounded outline-0 focus:ring focus:ring-indigo-200">
            <option value="">Select Model</option>
            <option value="x">x</option>
            <option value="xy">xy</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Search;
