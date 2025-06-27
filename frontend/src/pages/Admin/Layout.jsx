import React from "react";
import { assets } from "../../assets/assets";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";
import { useAppContext } from "../../contexts/appContent";

const Layout = () => {
  const { axiosInstance, setToken, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    axiosInstance.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12">
        <img
          className="w-32 sm:w-40 cursor-pointer"
          src={assets.logo}
          alt="logo"
          onClick={() => navigate("/")}
        />
        <button
          className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
