import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="border border-gray-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white hover:border-blue-100 group h-full flex flex-col">
      {/* Card Header */}
      <div className="flex justify-between items-center">
        <div className="w-16 h-16 flex items-center justify-center bg-white rounded-lg border border-gray-100 shadow-xs p-2 group-hover:shadow-sm transition-shadow duration-300">
          <img
            className="h-10 object-contain"
            src={assets.company_icon}
            alt={`${job.title} company logo`}
          />
        </div>
        <span className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
          {new Date(job.postedDate || Date.now()).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Job Title - Fixed height container */}
      <div className="min-h-[72px] mt-4">
        <h4 className="font-semibold text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
          {job.title}
        </h4>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-100">
          {job.location}
        </span>
        <span className="bg-red-50 text-red-700 text-xs font-medium px-3 py-1.5 rounded-full border border-red-100">
          {job.level}
        </span>
        {/* {job.salary && (
          <span className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full border border-green-100">
            {job.salary}
          </span>
        )} */}
      </div>

      {/* Description - Fixed height container */}
      <div className="mt-5 flex-grow">
        <p
          className="text-gray-600 text-sm leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
        ></p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-1 text-center"
        >
          Apply now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="text-gray-700 hover:text-blue-600 border border-gray-300 hover:border-blue-300 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex-1 text-center"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobCard;
