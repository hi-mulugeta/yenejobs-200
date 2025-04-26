import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCatagories, setSelectedCategories] = useState([]);
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
      selectedCatagories.length === 0 ||
      selectedCatagories.includes(job.category);
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
  }, [jobs, selectedCatagories, selectedLocations, searchFilter]);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* sidebar */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* Search Filter From hero Component */}
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
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
            </>
          )}

        {/* location filter section */}
        <button
          onClick={(e) => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden transition-all hover:bg-gray-50 active:scale-95"
        >
          {showFilter ? "Close" : "Filters"}
        </button>
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4">Search by Categories</h4>
          <ul className="text-gray-600">
            {JobCategories.map((cat, i) => {
              const jobCount = countJobsByCategory(cat);
              return (
                <React.Fragment key={i}>
                  {jobCount ? (
                    <li className="flex items-center group py-3 relative">
                      <label className="flex items-center w-full cursor-pointer">
                        <div className="relative flex-shrink-0">
                          <input
                            className="absolute opacity-0 h-0 w-0"
                            type="checkbox"
                            onChange={() => handleCategoryChange(cat)}
                            checked={selectedCatagories.includes(cat)}
                          />
                          <div
                            className={`h-5 w-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center 
                          ${
                            selectedCatagories.includes(cat)
                              ? "bg-blue-600 border-blue-600 shadow-sm"
                              : "border-gray-300 hover:border-blue-400 group-hover:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
                          }`}
                          >
                            {selectedCatagories.includes(cat) && (
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
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-1"></div>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4 pt-14">Search by Location</h4>
          <ul className="text-gray-600">
            {JobLocations.map((loc, i) => {
              const jobCount = countJobsByLocation(loc);
              return (
                <React.Fragment key={i}>
                  {jobCount ? (
                    <li className="flex items-center group py-3 relative">
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
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-1"></div>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </div>
      {/* Job listing section */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4 lg:pl-8">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest Jobs
        </h3>
        <p className="mb-8 text-gray-500">
          Get your desired job from top companies
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, i) => {
              return <JobCard key={i} job={job} />;
            })}
        </div>
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list">
              <img
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                src={assets.left_arrow_icon}
                alt=""
                className="transition-opacity hover:opacity-80 active:opacity-60"
              />
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
              <img
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      currentPage + 1,
                      Math.ceil(filteredJobs.length / 6)
                    )
                  )
                }
                src={assets.right_arrow_icon}
                alt=""
                className="transition-opacity hover:opacity-80 active:opacity-60"
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
