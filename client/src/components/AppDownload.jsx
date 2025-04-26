import React from "react";
import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto my-28">
      <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-12 sm:p-16 lg:p-20 rounded-3xl overflow-hidden shadow-2xl">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0zNiAzNGg0djJoLTR2LTJ6bTAgMjRoNHYyaC00di0yem0yMi0yMmg0djJoLTR2LTJ6bTAgMjRoNHYyaC00di0yek0xMiAxMGg0djJoLTR2LTJ6bTAgMjRoNHYyaC00di0yem0yMi0yMmg0djJoLTR2LTJ6bTAgMjRoNHYyaC00di0yem0tMjIgMGg0djJoLTR2LTJ6bTAgMjRoNHYyaC00di0yem0yMi0xMmg0djJoLTR2LTJ6bTAgMjRoNHYyaC00di0yem0tMjIgMGg0djJoLTR2LTJ6bTAgMjRoNHYyaC004di0yeiIvPjwvZz48L2c+PC9zdmc+')]"></div>

        {/* Content container */}
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-white leading-tight">
            Enhance Your Experience <br className="hidden sm:block" /> With Our
            Mobile App
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-lg">
            Get access to exclusive features, faster ordering, and personalized
            recommendations.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="transition-transform hover:scale-105 active:scale-95"
            >
              <img
                className="h-14"
                src={assets.play_store}
                alt="Get it on Google Play"
              />
            </a>
            <a
              href="#"
              className="transition-transform hover:scale-105 active:scale-95"
            >
              <img
                className="h-14"
                src={assets.app_store}
                alt="Download on the App Store"
              />
            </a>
          </div>
        </div>

        {/* App screenshot with floating effect */}
        <img
          className="absolute w-80 right-0 -bottom-4 mr-16 max-lg:hidden transform transition-all hover:scale-105"
          src={assets.app_main_img}
          alt="App preview"
          style={{
            filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.2))",
          }}
        />

        {/* Decorative elements */}
        <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white/10"></div>
        <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-white/5"></div>
      </div>
    </div>
  );
};

export default AppDownload;
