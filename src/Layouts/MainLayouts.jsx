import React from "react";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const MainLayouts = () => {
  return (
    <>
      <header>
        <nav>
            <Navbar />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
       <Footer />
      </footer>
    </>
  );
};

export default MainLayouts;
