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
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-20 px-4 text-center mx-2 rounded-2xl shadow-xl overflow-hidden relative">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-white/10"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Discover Your <span className="text-blue-300">Dream Job</span> Today
          </h2>
          <p className="text-lg md:text-xl lg:text-xl mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            Join over <span className="font-medium">20,000+</span> professionals
            who found their perfect match. Your next career breakthrough starts
            here.
          </p>

          {/* Search Container */}
          <div className="flex flex-col sm:flex-row items-center justify-center bg-white rounded-lg text-gray-800 max-w-4xl mx-auto shadow-2xl overflow-hidden">
            {/* Job Title Search */}
            <div className="flex items-center gap-3 px-4 py-3 w-full sm:w-auto border-b sm:border-b-0 sm:border-r border-gray-100">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
                className="text-sm md:text-base p-1 rounded outline-none w-full placeholder-gray-400 focus:ring-2 focus:ring-blue-200"
                ref={titleRef}
              />
            </div>

            {/* Location Search */}
            <div className="flex items-center gap-3 px-4 py-3 w-full sm:w-auto">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
                className="text-sm md:text-base p-1 rounded outline-none w-full placeholder-gray-400 focus:ring-2 focus:ring-blue-200"
                ref={locationRef}
              />
            </div>

            <button
              onClick={onSearch}
              href="#job-list"
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-6 py-3 text-white font-medium w-full sm:w-auto sm:px-8"
            >
              <a href="#job-list">Search Jobs</a>
            </button>
          </div>
        </div>
      </div>

      <Divider />

      {/* Trusted By Section */}
      <div className="border border-gray-200 bg-white shadow-sm mx-2 mt-8 p-6 rounded-xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-12 flex-wrap">
          <p className="text-sm font-medium text-gray-500 tracking-wider">
            TRUSTED BY LEADING COMPANIES
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
            <img
              className="h-6 opacity-80 hover:opacity-100 transition-opacity"
              src={assets.microsoft_logo}
              alt="Microsoft logo"
            />
            <img
              className="h-6 opacity-80 hover:opacity-100 transition-opacity"
              src={assets.walmart_logo}
              alt="Walmart logo"
            />
            <img
              className="h-6 opacity-80 hover:opacity-100 transition-opacity"
              src={assets.accenture_logo}
              alt="Accenture logo"
            />
            <img
              className="h-6 opacity-80 hover:opacity-100 transition-opacity"
              src={assets.samsung_logo}
              alt="Samsung logo"
            />
            <img
              className="h-6 opacity-80 hover:opacity-100 transition-opacity"
              src={assets.amazon_logo}
              alt="Amazon logo"
            />
            <img
              className="h-6 opacity-80 hover:opacity-100 transition-opacity"
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
