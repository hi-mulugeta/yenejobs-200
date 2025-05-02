import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import SubscriptionFlow from "../components/SubscriptionFlow";

const ApplyJob = () => {
  const { id } = useParams();
  const [JobData, setJobData] = useState(null);
  const { jobs, backendUrl, userData, userApplications } =
    useContext(AppContext);
  const navigate = useNavigate();

  const { getToken } = useAuth();

  //apply for a job

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error("Login to apply for Jobs!");
      }
      if (!userData.resume) {
        navigate("/applications");
        return toast.error("Please upload your resume to apply!");
      }

      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/users/apply",
        { jobId: JobData._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`);

      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  return JobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 px-4 2xl:px-20 mx-auto bg-gray-50">
        <div className="max-w-7xl w-full mx-auto">
          {/* Job Header Section */}
          <div className="bg-white rounded-2xl w-full shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between p-8 md:p-10 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-24 w-24 object-contain bg-white rounded-xl p-2 border border-gray-200 shadow-sm"
                    src={JobData.companyId.image}
                    alt={JobData.companyId.name}
                  />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {JobData.title}
                  </h1>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center text-gray-600">
                    <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-xs border border-gray-200">
                      <img
                        src={assets.suitcase_icon}
                        alt=""
                        className="h-4 w-4"
                      />
                      {JobData.companyId.name}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-xs border border-gray-200">
                      <img
                        src={assets.location_icon}
                        alt=""
                        className="h-4 w-4"
                      />
                      {JobData.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-xs border border-gray-200">
                      <img
                        src={assets.person_icon}
                        alt=""
                        className="h-4 w-4"
                      />
                      {JobData.level}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-blue-100 px-3 py-1 rounded-full text-sm font-medium text-blue-800 border border-blue-200">
                      <img src={assets.money_icon} alt="" className="h-4 w-4" />
                      {kconvert.convertTo(JobData.salary, "k", 2)}/month
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end mt-6 md:mt-0 space-y-3">
                <button
                  onClick={applyHandler}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Apply Now
                </button>
                <p className="text-sm text-gray-500">
                  Posted {moment(JobData.date).fromNow()}
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row p-8 gap-8">
              {/* Job Description */}
              <div className="w-full lg:w-2/3">
                <div className="mb-8">
                  <h2 className="font-bold text-2xl text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    Job Description
                  </h2>
                  <div
                    className="rich-text"
                    dangerouslySetInnerHTML={{ __html: JobData.description }}
                  ></div>
                </div>
                <div className="mt-8 mb-8">
                  <SubscriptionFlow />
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <h3 className="font-semibold text-lg text-gray-800 mb-4">
                    Ready to apply?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    This position is open until{" "}
                    {moment(JobData.deadline).format("MMMM Do, YYYY")}. We're
                    looking forward to receiving your application!
                  </p>
                  <button
                    onClick={applyHandler}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Apply Now
                  </button>
                </div>
              </div>

              {/* Sidebar - More Jobs */}
              <div className="w-full lg:w-1/3">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 sticky top-6">
                  <h2 className="font-bold text-xl text-gray-800 mb-6 pb-2 border-b border-gray-200">
                    More jobs at {JobData.companyId.name}
                  </h2>
                  <div className="space-y-4">
                    {jobs
                      .filter(
                        (job) =>
                          job._id !== JobData._id &&
                          job.companyId._id === JobData.companyId._id
                      )
                      .slice(0, 4)
                      .map((job, index) => (
                        <JobCard key={index} job={job} />
                      ))}
                  </div>
                  {jobs.filter(
                    (job) =>
                      job.companyId._id === JobData.companyId._id &&
                      job._id !== JobData._id
                  ).length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      No other jobs currently available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
