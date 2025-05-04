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
    titleRef.current.value = "";
    locationRef.current.value = "";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16 px-6 rounded-2xl overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-700 rounded-full mix-blend-overlay opacity-20 filter blur-3xl"></div>
          <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-indigo-700 rounded-full mix-blend-overlay opacity-20 filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay opacity-10 filter blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your <span className="text-blue-200">Perfect</span> Career
              Match
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands who found their dream jobs through our platform.
              Start your journey today with curated opportunities from top
              employers.
            </p>
          </div>

          {/* Search Container */}
          <div className="bg-white rounded-xl p-2 max-w-3xl mx-auto shadow-2xl">
            <div className="flex flex-col md:flex-row gap-2 rounded-lg overflow-hidden">
              {/* Job Title Search */}
              <div className="flex-1 flex items-center px-5 py-4 bg-gray-50 rounded-lg">
                <div className="mr-4 text-blue-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="flex-1 text-gray-800 placeholder-gray-500 bg-transparent outline-none text-base"
                  ref={titleRef}
                  onKeyPress={handleKeyPress}
                />
              </div>

              {/* Location Search */}
              <div className="flex-1 flex items-center px-5 py-4 bg-gray-50 rounded-lg border-l border-gray-200 md:border-l-0">
                <div className="mr-4 text-blue-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  className="flex-1 text-gray-800 placeholder-gray-500 bg-transparent outline-none text-base"
                  ref={locationRef}
                  onKeyPress={handleKeyPress}
                />
              </div>

              {/* Search Button */}
              {/* <button
                onClick={onSearch}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 font-semibold rounded-lg transition-all duration-300 whitespace-nowrap shadow-md hover:shadow-lg"
              >
                <a href="#jo"> Find Jobs</a>
              </button> */}
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  onSearch(); // Run your search function
                  document
                    .getElementById("jo")
                    ?.scrollIntoView({ behavior: "smooth" }); // Scroll to section
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 font-semibold rounded-lg transition-all duration-300 whitespace-nowrap shadow-md hover:shadow-lg"
              >
                Find Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
