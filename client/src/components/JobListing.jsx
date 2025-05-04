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
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
    setActiveCategory(category);
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

  // Get all categories with job counts
  const getCategoryStats = () => {
    return JobCategories.map((category) => ({
      name: category,
      count: countJobsByCategory(category),
      active: selectedCategories.includes(category),
    })).filter((cat) => cat.count > 0);
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        {/* <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Find Your Dream Job
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Browse through our curated list of top opportunities
          </p>
        </div> */}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="w-full lg:w-90 flex-shrink-0">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center justify-between w-full px-6 py-4 bg-white rounded-xl shadow-md lg:hidden mb-6"
              aria-expanded={showFilter}
              aria-controls="filter-section"
            >
              <span className="font-semibold text-gray-800">
                {showFilter ? "Hide Filters" : "Show Filters"}
              </span>
              <svg
                className={`w-5 h-5 text-gray-600 transition-transform ${
                  showFilter ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Filter section */}
            <div
              id="filter-section"
              className={`bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-300 ease-in-out ${
                showFilter ? "block" : "hidden lg:block"
              }`}
            >
              {/* Current Search */}
              {isSearched &&
                (searchFilter.title !== "" || searchFilter.location !== "") && (
                  <div className="mb-8">
                    <h3 className="font-semibold text-lg text-gray-900 mb-4">
                      Current Search
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {searchFilter.title && (
                        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                          {searchFilter.title}
                          <button
                            onClick={() =>
                              setSearchFilter((prev) => ({
                                ...prev,
                                title: "",
                              }))
                            }
                            className="text-blue-600 hover:text-blue-800 focus:outline-none transition-colors"
                            aria-label="Remove title filter"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      )}
                      {searchFilter.location && (
                        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                          {searchFilter.location}
                          <button
                            onClick={() =>
                              setSearchFilter((prev) => ({
                                ...prev,
                                location: "",
                              }))
                            }
                            className="text-blue-600 hover:text-blue-800 focus:outline-none transition-colors"
                            aria-label="Remove location filter"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}

              {/* Subscription Flow */}
              {/* <div className="mb-8">
                <SubscriptionFlow />
              </div> */}

              {/* Categories Filter */}
              <div className="mb-8">
                <h4 className="font-semibold text-lg text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  Job Categories
                </h4>
                <ul className="space-y-3">
                  {JobCategories.map((category, i) => {
                    const jobCount = countJobsByCategory(category);
                    if (!jobCount) return null;

                    return (
                      <li key={i}>
                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="absolute opacity-0 h-0 w-0"
                              onChange={() => handleCategoryChange(category)}
                              checked={selectedCategories.includes(category)}
                            />
                            <div
                              className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-all ${
                                selectedCategories.includes(category)
                                  ? "bg-blue-600 border-blue-600 shadow-inner"
                                  : "border-gray-300 group-hover:border-blue-400 bg-white"
                              }`}
                            >
                              {selectedCategories.includes(category) && (
                                <svg
                                  className="w-4 h-4 text-white"
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
                          <span className="text-gray-700 group-hover:text-blue-600 transition-colors font-medium">
                            {category}
                          </span>
                          <span className="ml-auto px-2.5 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                            {jobCount}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Locations Filter */}
              <div>
                <h4 className="font-semibold text-lg text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Job Locations
                </h4>
                <ul className="space-y-3">
                  {JobLocations.map((location, i) => {
                    const jobCount = countJobsByLocation(location);
                    if (!jobCount) return null;

                    return (
                      <li key={i}>
                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="absolute opacity-0 h-0 w-0"
                              onChange={() => handleLocationChange(location)}
                              checked={selectedLocations.includes(location)}
                            />
                            <div
                              className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-all ${
                                selectedLocations.includes(location)
                                  ? "bg-blue-600 border-blue-600 shadow-inner"
                                  : "border-gray-300 group-hover:border-blue-400 bg-white"
                              }`}
                            >
                              {selectedLocations.includes(location) && (
                                <svg
                                  className="w-4 h-4 text-white"
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
                          <span className="text-gray-700 group-hover:text-blue-600 transition-colors font-medium">
                            {location}
                          </span>
                          <span className="ml-auto px-2.5 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                            {jobCount}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-16">
                <SubscriptionFlow />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Latest Opportunities
                  </h1>
                  <p className="text-gray-600">
                    {filteredJobs.length}{" "}
                    {filteredJobs.length === 1 ? "position" : "positions"}{" "}
                    matching your criteria
                  </p>
                </div>
                {(selectedCategories.length > 0 ||
                  selectedLocations.length > 0) && (
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedLocations([]);
                    }}
                    className="mt-4 sm:mt-0 px-5 py-2.5 text-sm font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all shadow-sm"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>

            {/* Category Quick Filters */}
            {filteredJobs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-5">
                  Browse by Category
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {getCategoryStats().map((category) => (
                    <button
                      key={category.name}
                      onClick={() => handleCategoryChange(category.name)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        category.active
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-blue-300 hover:shadow-sm bg-white"
                      }`}
                    >
                      <div className="flex flex-col items-start">
                        <span
                          className={`font-semibold text-sm sm:text-base ${
                            category.active ? "text-blue-700" : "text-gray-800"
                          }`}
                        >
                          {category.name}
                        </span>
                        <span
                          className={`text-xs sm:text-sm mt-1 ${
                            category.active ? "text-blue-600" : "text-gray-500"
                          }`}
                        >
                          {category.count}{" "}
                          {category.count === 1 ? "job" : "jobs"}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Job Listings */}
            {filteredJobs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredJobs
                    .slice((currentPage - 1) * 6, currentPage * 6)
                    .map((job, i) => (
                      <JobCard key={i} job={job} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center mt-12 space-x-2">
                  <a href="#job-list" className="focus:outline-none">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(currentPage - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all ${
                        currentPage === 1
                          ? "text-gray-400 border-gray-200 cursor-not-allowed"
                          : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-blue-300"
                      }`}
                      aria-label="Previous page"
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

                  {Array.from({
                    length: Math.ceil(filteredJobs.length / 6),
                  }).map((_, index) => (
                    <a
                      href="#job-list"
                      key={index}
                      className="focus:outline-none"
                    >
                      <button
                        onClick={() => setCurrentPage(index + 1)}
                        className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 font-medium transition-all ${
                          currentPage === index + 1
                            ? "bg-blue-600 text-white border-blue-600 shadow-md"
                            : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-blue-300"
                        }`}
                        aria-label={`Go to page ${index + 1}`}
                      >
                        {index + 1}
                      </button>
                    </a>
                  ))}

                  <a href="#job-list" className="focus:outline-none">
                    <button
                      onClick={() =>
                        setCurrentPage(
                          Math.min(
                            currentPage + 1,
                            Math.ceil(filteredJobs.length / 6)
                          )
                        )
                      }
                      disabled={
                        currentPage === Math.ceil(filteredJobs.length / 6)
                      }
                      className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all ${
                        currentPage === Math.ceil(filteredJobs.length / 6)
                          ? "text-gray-400 border-gray-200 cursor-not-allowed"
                          : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-blue-300"
                      }`}
                      aria-label="Next page"
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
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center">
                <div className="max-w-md mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-gray-400 mb-6"
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    No matching jobs found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or browse all available
                    positions
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedLocations([]);
                      setSearchFilter({ title: "", location: "" });
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
