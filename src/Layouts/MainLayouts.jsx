import React from "react";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const MainLayouts = () => {
  return (
    <>
      <header className="max-w-11/12 mx-auto">
        <nav>
            <Navbar />
        </nav>
      </header >
      <main className="max-w-11/12 mx-auto">
        <Outlet />
      </main>
      <footer className="px-3 sm:px-6">
       <Footer />
      </footer>
    </>
  );
};

export default MainLayouts;
