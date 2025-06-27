import React from "react";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../contexts/appContent.jsx";

const Header = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer">
      <img
        className="w-32 sm:w-44 cursor-pointer"
        src={assets.logo}
        alt="logo"
        onClick={() => navigate("/")}
      />
      <button
        className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
        onClick={() => navigate("/admin")}
      >
        {token ? "Dashboard" : "Login"}
        <img className="w-3" src={assets.arrow} alt="arrow" />
      </button>
    </div>
  );
};

export default Header;
