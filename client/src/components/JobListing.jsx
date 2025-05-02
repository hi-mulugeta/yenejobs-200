import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";
import SubscriptionFlow from "./SubscriptionFlow";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location]
    );
  };

  // Count jobs per category
  const countJobsByCategory = (category) => {
    return filteredJobs.filter((job) => job.category === category).length;
  };

  // Count jobs per location
  const countJobsByLocation = (location) => {
    return filteredJobs.filter((job) => job.location === location).length;
  };

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);
    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);
    const matchesSearchTitle = (job) =>
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase()) ||
      searchFilter.title === "";
    const matchesSearchLocation = (job) =>
      job.location
        .toLowerCase()
        .includes(searchFilter.location.toLowerCase()) ||
      searchFilter.location === "";
    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesSearchTitle(job) &&
          matchesSearchLocation(job)
      );
    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [
    jobs,
    setFilteredJobs,
    selectedCategories,
    selectedLocations,
    searchFilter,
  ]);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* sidebar */}
      <div className="w-full lg:w-1/4 bg-white px-4 space-y-8">
        {/* Search Filter From hero Component */}
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <h3 className="font-medium text-lg mb-4">Current Search</h3>
              <div className="mb-4 text-gray-600">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-50 px-4 py-1.5 rounded">
                    {searchFilter.title}{" "}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      src={assets.cross_icon}
                      className="cursor-pointer"
                      alt=""
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="inline-flex ml-2 items-center gap-2.5 bg-red-50 border border-red-50 px-4 py-1.5 rounded">
                    {searchFilter.location}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      src={assets.cross_icon}
                      className="cursor-pointer"
                      alt=""
                    />
                  </span>
                )}
              </div>
            </div>
          )}

        {/* Subscription Flow Component */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <SubscriptionFlow />
        </div>

        {/* location filter section */}
        <button
          onClick={(e) => setShowFilter((prev) => !prev)}
          className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white shadow-sm lg:hidden transition-all hover:bg-gray-50 active:scale-95 flex items-center justify-center gap-2 w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clipRule="evenodd"
            />
          </svg>
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>

        <div
          className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${
            showFilter ? "" : "max-lg:hidden"
          }`}
        >
          <h4 className="font-medium text-lg pb-2 border-b border-gray-100">
            Search by Categories
          </h4>
          <ul className="text-gray-600 mt-3">
            {JobCategories.map((cat, i) => {
              const jobCount = countJobsByCategory(cat);
              return (
                <React.Fragment key={i}>
                  {jobCount ? (
                    <li className="flex items-center group py-2.5 relative">
                      <label className="flex items-center w-full cursor-pointer">
                        <div className="relative flex-shrink-0">
                          <input
                            className="absolute opacity-0 h-0 w-0"
                            type="checkbox"
                            onChange={() => handleCategoryChange(cat)}
                            checked={selectedCategories.includes(cat)}
                          />
                          <div
                            className={`h-5 w-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center 
                          ${
                            selectedCategories.includes(cat)
                              ? "bg-blue-600 border-blue-600 shadow-sm"
                              : "border-gray-300 hover:border-blue-400 group-hover:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
                          }`}
                          >
                            {selectedCategories.includes(cat) && (
                              <svg
                                className="w-3 h-3 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="ml-3 text-gray-700 group-hover:text-blue-600 transition-colors">
                          {cat}
                        </span>
                        {jobCount > 0 && (
                          <span className="ml-auto px-2 py-1 text-xs font-semibold leading-none text-blue-100 bg-blue-600 rounded-full transition-all group-hover:bg-blue-700 group-hover:scale-105">
                            {jobCount}
                          </span>
                        )}
                      </label>
                    </li>
                  ) : (
                    ""
                  )}
                  {jobCount > 0 && i !== JobCategories.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"></div>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </div>

        <div
          className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${
            showFilter ? "" : "max-lg:hidden"
          }`}
        >
          <h4 className="font-medium text-lg pb-2 border-b border-gray-100">
            Search by Location
          </h4>
          <ul className="text-gray-600 mt-3">
            {JobLocations.map((loc, i) => {
              const jobCount = countJobsByLocation(loc);
              return (
                <React.Fragment key={i}>
                  {jobCount ? (
                    <li className="flex items-center group py-2.5 relative">
                      <label className="flex items-center w-full cursor-pointer">
                        <div className="relative flex-shrink-0">
                          <input
                            className="absolute opacity-0 h-0 w-0"
                            type="checkbox"
                            onChange={() => handleLocationChange(loc)}
                            checked={selectedLocations.includes(loc)}
                          />
                          <div
                            className={`h-5 w-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center 
                          ${
                            selectedLocations.includes(loc)
                              ? "bg-blue-600 border-blue-600 shadow-sm"
                              : "border-gray-300 hover:border-blue-400 group-hover:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
                          }`}
                          >
                            {selectedLocations.includes(loc) && (
                              <svg
                                className="w-3 h-3 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="ml-3 text-gray-700 group-hover:text-blue-600 transition-colors">
                          {loc}
                        </span>
                        {jobCount > 0 && (
                          <span className="ml-auto px-2 py-1 text-xs font-semibold leading-none text-blue-100 bg-blue-600 rounded-full transition-all group-hover:bg-blue-700 group-hover:scale-105">
                            {jobCount}
                          </span>
                        )}
                      </label>
                    </li>
                  ) : (
                    ""
                  )}
                  {jobCount > 0 && i !== JobLocations.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"></div>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Job listing section */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4 lg:pl-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-medium text-3xl py-2" id="job-list">
            Latest Jobs
          </h3>
          <p className="mb-0 text-gray-500">
            {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}{" "}
            found
          </p>
        </div>

        {filteredJobs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredJobs
                .slice((currentPage - 1) * 6, currentPage * 6)
                .map((job, i) => {
                  return <JobCard key={i} job={job} />;
                })}
            </div>

            <div className="flex items-center justify-center space-x-2 mt-10">
              <a href="#job-list">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center border rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-500 border-gray-300 hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </a>

              {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
                (_, index) => (
                  <a href="#job-list" key={index}>
                    <button
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 flex items-center justify-center border rounded transition-all ${
                        currentPage === index + 1
                          ? "bg-blue-600 text-white border-blue-600 shadow-md"
                          : "text-gray-500 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  </a>
                )
              )}

              <a href="#job-list">
                <button
                  onClick={() =>
                    setCurrentPage(
                      Math.min(
                        currentPage + 1,
                        Math.ceil(filteredJobs.length / 6)
                      )
                    )
                  }
                  disabled={currentPage === Math.ceil(filteredJobs.length / 6)}
                  className="w-10 h-10 flex items-center justify-center border rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-500 border-gray-300 hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </a>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSelectedCategories([]);
                setSelectedLocations([]);
                setSearchFilter({ title: "", location: "" });
              }}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
