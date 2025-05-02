import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import Divider from "./Divider";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
    console.log({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    titleRef.current.value = "";
    locationRef.current.value = "";
  };

  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      {/* Hero Section - Now with solid background to prevent blur conflicts */}
      <div className="relative bg-indigo-700 text-white py-16 px-6 text-center mx-2 rounded-2xl overflow-hidden">
        {/* Subtle abstract shape for visual interest */}
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute top-20 right-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Discover Your <span className="text-yellow-300">Dream Job</span>{" "}
            Among 20,000+ Opportunities
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Your next career breakthrough starts here. Explore top-tier
            opportunities and take the first step toward your future.
          </p>

          {/* Search Container - Solid white background for clarity */}
          <div className="bg-white rounded-xl p-1 max-w-3xl mx-auto shadow-lg">
            <div className="flex flex-col md:flex-row gap-1 rounded-lg overflow-hidden">
              <div className="flex-1 flex items-center px-4 py-3">
                <svg
                  className="w-5 h-5 text-gray-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <input
                  type="text"
                  placeholder="Job title, keywords"
                  className="flex-1 text-gray-800 placeholder-gray-500 bg-transparent outline-none text-sm md:text-base"
                  ref={titleRef}
                />
              </div>

              <div className="hidden md:block border-l border-gray-200"></div>

              <div className="flex-1 flex items-center px-4 py-3">
                <svg
                  className="w-5 h-5 text-gray-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <input
                  type="text"
                  placeholder="Location"
                  className="flex-1 text-gray-800 placeholder-gray-500 bg-transparent outline-none text-sm md:text-base"
                  ref={locationRef}
                />
              </div>

              <button
                onClick={onSearch}
                className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap"
              >
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* Trusted By Section */}
      <div className="border border-gray-200 shadow-sm mx-2 mt-8 p-6 rounded-xl bg-white">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-wrap">
          <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">
            Trusted by leading companies
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <img
              className="h-6 opacity-70 hover:opacity-100 transition-opacity"
              src={assets.microsoft_logo}
              alt="Microsoft logo"
            />
            <img
              className="h-6 opacity-70 hover:opacity-100 transition-opacity"
              src={assets.walmart_logo}
              alt="Walmart logo"
            />
            <img
              className="h-6 opacity-70 hover:opacity-100 transition-opacity"
              src={assets.accenture_logo}
              alt="Accenture logo"
            />
            <img
              className="h-6 opacity-70 hover:opacity-100 transition-opacity"
              src={assets.samsung_logo}
              alt="Samsung logo"
            />
            <img
              className="h-6 opacity-70 hover:opacity-100 transition-opacity"
              src={assets.amazon_logo}
              alt="Amazon logo"
            />
            <img
              className="h-6 opacity-70 hover:opacity-100 transition-opacity"
              src={assets.adobe_logo}
              alt="Adobe logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
