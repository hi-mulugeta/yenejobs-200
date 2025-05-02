import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="border border-gray-100 p-6 rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 bg-white hover:border-blue-50 group h-full flex flex-col transform hover:-translate-y-1">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="w-14 h-14 flex items-center justify-center bg-white rounded-xl border border-gray-50 shadow-xs p-1.5 group-hover:shadow-sm transition-all duration-300 overflow-hidden">
          <img
            className="h-8 object-contain"
            src={job.companyId.image}
            alt={`${job.title} company logo`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Y2FmZjAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1idWlsZGluZy0yIj48cGF0aCBkPSJNNiAydjIwIi8+PHBhdGggZD0ibTE4IDE2IDQgNFYyMkg2YTIgMiAwIDAgMS0yLTJWNiIvPjxwYXRoIGQ9Ik0xOCAyVjZINiIvPjxwYXRoIGQ9Ik0xOCAxMHY0Ii8+PHBhdGggZD0iTTYgMTBoNCIvPjxwYXRoIGQ9Ik02IDE0aDQiLz48cGF0aCBkPSJNNiAxOGg0Ii8+PC9zdmc+";
            }}
          />
        </div>
        <span className="text-xs font-medium text-gray-500 bg-gray-50/70 px-2.5 py-1 rounded-full backdrop-blur-sm">
          {new Date(job.postedDate || Date.now()).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Job Title */}
      <div className="min-h-[72px] mb-3">
        <h4 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
          {job.title}
        </h4>
        <p className="text-sm text-gray-500 mt-1">{job.companyId.name}</p>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="bg-blue-50/70 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-blue-100/50 backdrop-blur-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {job.location}
        </span>
        <span className="bg-purple-50/70 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-purple-100/50 backdrop-blur-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          {job.level}
        </span>
        {job.salary && (
          <span className="bg-emerald-50/70 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-emerald-100/50 backdrop-blur-sm flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            {job.salary}
          </span>
        )}
      </div>

      {/* Description */}
      <div className="mt-2 flex-grow">
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
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 flex-1 text-center flex items-center justify-center gap-1.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4" />
          </svg>
          Apply now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-blue-200 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:ring-offset-2 flex-1 text-center flex items-center justify-center gap-1.5 hover:bg-blue-50/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobCard;
