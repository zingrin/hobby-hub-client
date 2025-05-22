import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import GroupListSkeleton from "../Components/GroupCardSkeleton";

const MainLayouts = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    setLoading(false);
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [location]);
  return (
    <>
      <header className="max-w-11/12 mx-auto">
        <nav>
          <Navbar />
        </nav>
      </header>
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
