import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  const handleSignOut = async () => {
    setCompanyData(null);
    localStorage.removeItem("companyToken");
    setCompanyToken(null);
    navigate("/");
  };
  useEffect(() => {
    if (companyData) {
      navigate("/dashboard/add-job");
    }
  }, [companyData]);
  return (
    <div className="min-h-screen">
      {/* Enhanced Navbar for the Recruiter panel */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              className="h-8 w-auto cursor-pointer transition-transform hover:scale-105"
              src={assets.logo}
              alt="Company Logo"
              onClick={() => navigate("/")}
            />
            <span className="hidden md:inline-block text-sm font-medium text-gray-500 ml-2">
              Recruiter Dashboard
            </span>
          </div>

          {companyData && (
            <div className="flex items-center space-x-4">
              <p className="hidden sm:block text-sm font-medium text-gray-700">
                Welcome,{" "}
                <span className="text-blue-600">{companyData.name}</span>
              </p>

              <div className="relative group">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <img
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                    src={companyData.image}
                    alt="Profile"
                  />
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out transform group-hover:translate-y-0">
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex items-start">
        {/* left side-bar with options to add-job,manage-jobs and view-applications */}
        <div className="inline-block min-h-screen border-r-2 border-gray-300">
          <ul className="flex flex-col items-start pt-5 text-gray-500">
            <NavLink
              className={({ isActive }) =>
                `flex items-center mr-2 p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"/dashboard/add-job"}
            >
              <img className="min-w-4" src={assets.add_icon} alt="" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 mr-2 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"/dashboard/manage-jobs"}
            >
              <img className="min-w-4" src={assets.home_icon} alt="" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 mr-1 w-full hover:bg-gray-100 ${
                  isActive && "bg-blue-100 border-r-4 border-blue-500"
                }`
              }
              to={"/dashboard/view-applications"}
            >
              <img className="min-w-4" src={assets.person_tick_icon} alt="" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>
        <div className="mt-3 w-full min-h-screen px-5 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
