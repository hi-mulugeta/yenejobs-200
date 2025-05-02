import React, { useState } from "react";
import SubscriptionCard from "./SubscriptionCard";
import VerifyPhoneCode from "./VerifyPhoneCode";

const SubscriptionFlow = () => {
  const [flowState, setFlowState] = useState("subscribe"); // 'subscribe', 'verify', 'verified'
  const [subscriptionData, setSubscriptionData] = useState(null);

  const handleSubscriptionSuccess = (data) => {
    setSubscriptionData(data);
    setFlowState("verify");
  };

  const handleVerificationSuccess = () => {
    setFlowState("verified");
  };

  return (
    <div className="max-w-md mx-auto transition-all duration-300">
      {flowState === "subscribe" && (
        <SubscriptionCard onSuccess={handleSubscriptionSuccess} />
      )}

      {flowState === "verify" && (
        <VerifyPhoneCode
          onSuccess={handleVerificationSuccess}
          phone={subscriptionData?.phone}
        />
      )}

      {flowState === "verified" && (
        <div className="p-8 bg-white rounded-xl shadow-lg border border-green-100">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              You're All Set!
            </h2>
            <p className="text-gray-600 mb-6">
              Your phone number{" "}
              <span className="font-semibold">{subscriptionData?.phone}</span>{" "}
              is now verified.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-left">
              <h3 className="font-medium text-blue-800 mb-2 text-lg">
                Your Alert Preferences
              </h3>
              <div className="space-y-2 text-sm text-blue-700">
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Category:</span>
                  <span className="font-medium">
                    {subscriptionData?.jobCategory}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Notification Method:</span>
                  <span className="font-medium capitalize">
                    {subscriptionData?.notificationMethod}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frequency:</span>
                  <span className="font-medium capitalize">
                    {subscriptionData?.notificationFrequency}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setFlowState("subscribe")}
              className="mt-6 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Update Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionFlow;
