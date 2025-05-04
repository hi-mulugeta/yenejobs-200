import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-6">
        <img
          onClick={() => {
            navigate("/"); // Your existing navigation
            setTimeout(() => {
              // Wait for navigation to complete
              const heroElement = document.getElementById("hero");
              if (heroElement) {
                heroElement.scrollIntoView({ behavior: "smooth" });
              }
            }, 0);
          }}
          className="max-sm:w-32 cursor-pointer h-9 transition-transform hover:scale-105"
          src={assets.logo}
          alt="mjobs logo"
        />
        <p className="flex-1 border-l border-gray-300 pl-4 text-sm text-gray-600 max-sm:hidden font-medium">
          Copyright © {new Date().getFullYear()} mjobs.com | All rights reserved
        </p>
        <div className="flex gap-4">
          <a
            href="#"
            className="p-1.5 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <img
              width={24}
              src={assets.facebook_icon}
              alt="Facebook"
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
          </a>
          <a
            href="#"
            className="p-1.5 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <img
              width={24}
              src={assets.twitter_icon}
              alt="Twitter"
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
          </a>
          <a
            href="#"
            className="p-1.5 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <img
              width={24}
              src={assets.instagram_icon}
              alt="Instagram"
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
