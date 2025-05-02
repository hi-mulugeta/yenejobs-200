import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useAuth } from "@clerk/clerk-react";

const VerifyPhoneCode = ({ onSuccess, phone }) => {
  const { backendUrl } = useContext(AppContext);
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { getToken } = useAuth();

  const handleVerify = async () => {
    setIsVerifying(true);
    if (code.length !== 6) {
      setIsVerifying(false);
      return toast.error("Please enter a valid 6-digit code");
    }
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/subscribe/verify`,
        { code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(data.message);
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(value);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="text-center mb-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-3">
          <svg
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Verify Your Phone
        </h2>
        <p className="text-gray-600">
          We sent a 6-digit code to <span className="font-medium">{phone}</span>
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="verification-code"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Verification Code <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="verification-code"
              type="text"
              value={code}
              onChange={handleCodeChange}
              placeholder="Enter 6-digit code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-center text-xl tracking-widest"
              maxLength="6"
              inputMode="numeric"
            />
            {code.length > 0 && (
              <button
                onClick={() => setCode("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <button
          onClick={handleVerify}
          disabled={isVerifying || code.length !== 6}
          className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-md transition ${
            isVerifying || code.length !== 6
              ? "opacity-70 cursor-not-allowed"
              : "hover:from-blue-700 hover:to-blue-800"
          }`}
        >
          {isVerifying ? (
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
              Verifying...
            </span>
          ) : (
            "Verify Phone Number"
          )}
        </button>

        <div className="text-center text-sm text-gray-500">
          Didn't receive a code?{" "}
          <button
            className="text-blue-600 hover:text-blue-700 font-medium"
            onClick={() => toast.info("New code sent to your phone")}
          >
            Resend code
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhoneCode;
