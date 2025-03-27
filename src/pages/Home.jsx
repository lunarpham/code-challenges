import React from "react";
import Navbar from "../components/Navbar";
import Cars from "../components/Cars";
import Search from "../components/Search";
import Footer from "../components/Footer";

function Home({ cars }) {
  return (
    <>
      <Navbar />
      <Search />
      <Cars cars={cars} />
      <Footer />
    </>
  );
}

export default Home;
