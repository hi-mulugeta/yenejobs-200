import React from "react";

const FeaturesShowcase = () => {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z"
          />
        </svg>
      ),
      title: "Smart Job Matching",
      description:
        "Our AI-powered algorithm learns your preferences to deliver the most relevant job opportunities—saving you hours of searching.",
      cta: "See how it works →",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "One-Click Apply",
      description:
        "Apply to multiple jobs in seconds with your pre-filled profile. No more tedious form filling—just opportunities.",
      cta: "Try it now →",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
          />
        </svg>
      ),
      title: "Real-Time Insights",
      description:
        "Track application status, employer engagement, and market trends—all in one dashboard. Knowledge is power.",
      cta: "Explore insights →",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
      ),
      title: "Career Coaching",
      description:
        "Get personalized resume reviews and interview prep from industry experts. Stand out from the competition.",
      cta: "Get expert help →",
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Career,{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative">
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-20 -rotate-1 rounded-lg"></span>
                <span className="relative">Accelerated</span>
              </span>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            We're redefining job searching with technology that works as hard as
            you do.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Animated Background Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

              {/* Icon Container */}
              <div className="w-14 h-14 flex items-center justify-center bg-indigo-50 rounded-lg text-indigo-600 mb-6 group-hover:bg-indigo-100 transition-colors duration-300">
                {feature.icon}
              </div>

              {/* Feature Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <a
                href="#"
                className="inline-flex items-center text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors duration-300"
              >
                {feature.cta}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1 duration-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 sm:p-12 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-4">
                <p className="text-4xl font-bold mb-2">20K+</p>
                <p className="text-indigo-100">Jobs Available</p>
              </div>
              <div className="p-4">
                <p className="text-4xl font-bold mb-2">85%</p>
                <p className="text-indigo-100">Faster Hiring</p>
              </div>
              <div className="p-4">
                <p className="text-4xl font-bold mb-2">4.9/5</p>
                <p className="text-indigo-100">User Satisfaction</p>
              </div>
              <div className="p-4">
                <p className="text-4xl font-bold mb-2">10K+</p>
                <p className="text-indigo-100">Success Stories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesShowcase;
