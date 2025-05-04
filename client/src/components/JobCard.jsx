import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import kconvert from "k-convert";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  // State to manage job visibility
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Calculate the job's deadline and check if it's expired
    const deadlineDate = moment(job.date).add(job.deadline ?? 7, "days");
    const currentDate = moment();

    // If the current date is past the deadline, hide the job card
    if (currentDate.isAfter(deadlineDate)) {
      setIsVisible(false);
    }
  }, [job.date, job.deadline]);

  // If the job is expired, don't render the job card
  if (!isVisible) {
    return null;
  }

  return (
    <div
      id="jo"
      className="border border-gray-100 p-6 rounded-2xl shadow-xs hover:shadow-lg transition-all duration-300 bg-white hover:border-blue-50 group h-full flex flex-col transform hover:-translate-y-1"
    >
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
          <span className="font-medium text-red-600">Deadline:</span>{" "}
          <span className="italic">
            {moment().to(moment(job.date).add(job.deadline ?? 7, "days"))}
          </span>
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
          {job.location}
        </span>
        <span className="bg-purple-50/70 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-purple-100/50 backdrop-blur-sm flex items-center">
          {job.level}
        </span>
        {job.salary && (
          <span className="bg-emerald-50/70 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-emerald-100/50 backdrop-blur-sm flex items-center">
            {kconvert.convertTo(job.salary, "k", 2)}/month
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
          Apply now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-blue-200 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:ring-offset-2 flex-1 text-center flex items-center justify-center gap-1.5 hover:bg-blue-50/30"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobCard;
