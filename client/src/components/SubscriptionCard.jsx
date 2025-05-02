import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";

const SubscriptionCard = ({ onSuccess }) => {
  const { backendUrl, jobs } = useContext(AppContext);
  const [phone, setPhone] = useState("");
  const [jobId, setJobId] = useState("");
  const [notificationMethod, setNotificationMethod] = useState("sms");
  const [notificationFrequency, setNotificationFrequency] = useState("instant");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();
  const uniqueCategories = Array.from(
    new Map(jobs.map((job) => [job.category, job])).values()
  );

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const handleSubscribe = async () => {
    setIsSubmitting(true);
    const token = await getToken();

    if (!user) {
      toast.error("You must be logged in to subscribe");
      setIsSubmitting(false);
      return navigate("/");
    }

    const rawPhone = phone.replace(/[^\d]/g, "");
    if (!rawPhone || !jobId) {
      setIsSubmitting(false);
      return toast.error("Phone and job category are required");
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/subscribe`,
        {
          phone: rawPhone,
          jobId,
          notificationMethod,
          notificationFrequency,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(data.message);
      onSuccess({
        phone,
        jobId,
        jobCategory: uniqueCategories.find((cat) => cat._id === jobId)
          ?.category,
        notificationMethod,
        notificationFrequency,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Job Alert Subscription
        </h2>
        <p className="text-gray-600">
          Get notified about new job opportunities
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="(123) 456-7890"
            value={phone}
            onChange={handlePhoneChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label
            htmlFor="job-category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Job Category <span className="text-red-500">*</span>
          </label>
          <select
            id="job-category"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white"
          >
            <option value="">Select a category</option>
            {uniqueCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notification Method
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["sms", "email", "both"].map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setNotificationMethod(method)}
                className={`py-2 px-3 rounded-lg border transition ${
                  notificationMethod === method
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notification Frequency
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["instant", "daily", "weekly"].map((frequency) => (
              <button
                key={frequency}
                type="button"
                onClick={() => setNotificationFrequency(frequency)}
                className={`py-2 px-3 rounded-lg border transition ${
                  notificationFrequency === frequency
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubscribe}
          disabled={isSubmitting || !phone || !jobId}
          className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-md transition ${
            isSubmitting || !phone || !jobId
              ? "opacity-70 cursor-not-allowed"
              : "hover:from-blue-700 hover:to-blue-800"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Subscribe Now"
          )}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
