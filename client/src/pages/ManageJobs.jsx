import React, { useContext, useEffect, useState } from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5); // You can adjust this number

  const { backendUrl, companyToken } = useContext(AppContext);

  //function to change Job visibility
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/job-visibility",
        { id },
        {
          headers: { token: companyToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchCompanyData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/jobs", {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs(data.jobsData.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return jobs.length > 0 ? (
    <div className="container p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-sm:hidden">
                  #
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-sm:hidden">
                  Date Posted
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-sm:hidden">
                  Location
                </th>
                <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicants
                </th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentJobs.map((job, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900 max-sm:hidden">
                    {indexOfFirstJob + index + 1}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {job.title}
                    </div>
                    <div className="text-xs text-gray-500 sm:hidden">
                      {moment(job.date).format("ll")} • {job.location}
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 max-sm:hidden">
                    {moment(job.date).format("MMMM D, YYYY")}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 max-sm:hidden">
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 text-gray-400 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {job.location}
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-center">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        job.applicants > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {job.applicants}{" "}
                      {job.applicants === 1 ? "applicant" : "applicants"}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        onChange={() => changeJobVisibility(job._id)}
                        type="checkbox"
                        checked={job.visible}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{indexOfFirstJob + 1}</span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastJob, jobs.length)}
            </span>{" "}
            of <span className="font-medium">{jobs.length}</span> jobs
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            {Array.from(
              { length: Math.ceil(jobs.length / jobsPerPage) },
              (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {i + 1}
                </button>
              )
            ).slice(
              Math.max(0, currentPage - 3),
              Math.min(Math.ceil(jobs.length / jobsPerPage), currentPage + 2)
            )}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(jobs.length / jobsPerPage)}
              className={`px-3 py-1 rounded-md ${
                currentPage === Math.ceil(jobs.length / jobsPerPage)
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
          <button
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-lg shadow-sm transition-all duration-200 flex items-center"
            onClick={() => navigate("/dashboard/add-job")}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Add New Job
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ManageJobs;
