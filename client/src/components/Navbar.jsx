import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm py-3 border-b border-gray-100 backdrop-blur-sm bg-opacity-90">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          className="max-sm:w-32 cursor-pointer h-9 transition-transform hover:scale-105"
          src={assets.logo}
          alt="mjobs logo"
        />
        {user ? (
          <div className="flex items-center gap-6 max-sm:gap-3 max-sm:text-xs">
            <Link
              to={"/applications"}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Applied Jobs
            </Link>
            <p className="text-gray-300">|</p>
            <p className="max-sm:hidden text-gray-700 font-medium">
              Hi, {user.firstName + " " + user.lastName}
            </p>
            <div className="ml-2">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-9 h-9",
                    userButtonPopoverCard: "shadow-lg rounded-xl",
                  },
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-5 max-sm:gap-3 max-sm:text-xs">
            <button
              onClick={(e) => setShowRecruiterLogin(true)}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Recruiter Login
            </button>
            <button
              onClick={(e) => openSignIn()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2.5 rounded-full transition-all font-medium shadow-sm hover:shadow-md active:scale-95"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
