import React from "react";
import { assets } from "../assets/assets";

const Partner = () => {
  return (
    <div className="mt-10 mb-6">
      <div className="text-center mb-6">
        <p className="text-gray-500 font-medium text-sm uppercase tracking-wider mb-4">
          Trusted by innovative companies worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity">
          <img
            className="h-6 md:h-8"
            src={assets.microsoft_logo}
            alt="Microsoft"
          />
          <img className="h-6 md:h-8" src={assets.walmart_logo} alt="Walmart" />
          <img
            className="h-6 md:h-8"
            src={assets.accenture_logo}
            alt="Accenture"
          />
          <img className="h-6 md:h-8" src={assets.samsung_logo} alt="Samsung" />
          <img className="h-6 md:h-8" src={assets.amazon_logo} alt="Amazon" />
          <img className="h-6 md:h-8" src={assets.adobe_logo} alt="Adobe" />
        </div>
      </div>
    </div>
  );
};

export default Partner;
