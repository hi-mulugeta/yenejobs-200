import React from "react";

const SectionDividers = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Content Section
      </h2>
      <p className="text-gray-600 mb-12 text-center">
        This is an example content section. The dividers below will separate it
        from the next section.
      </p>

      {/* Divider 1: Simple Line */}
      <div className="py-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          1. Minimal Line Divider
        </h3>
        <div className="h-px bg-gray-200 w-full"></div>
      </div>

      {/* Divider 2: Gradient Line */}
      <div className="py-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          2. Gradient Line Divider
        </h3>
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </div>

      {/* Divider 3: Dotted Line */}
      <div className="py-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          3. Dotted Line Divider
        </h3>
        <div className="h-2 w-full border-t-2 border-dotted border-gray-300"></div>
      </div>

      {/* Divider 4: Ornamental */}
      <div className="py-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          4. Ornamental Divider
        </h3>
        <div className="flex items-center justify-center space-x-4">
          <div className="h-px bg-gray-300 flex-1"></div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>
      </div>

      {/* Divider 5: Wave Shape */}
      <div className="py-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          5. Wave Divider
        </h3>
        <div className="overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-12"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="fill-current text-gray-200"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="fill-current text-gray-200"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-current text-gray-200"
            ></path>
          </svg>
        </div>
      </div>

      {/* Divider 6: Diagonal */}
      <div className="py-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          6. Diagonal Divider
        </h3>
        <div className="relative h-16 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gray-100 transform -skew-y-2 origin-top-left"></div>
        </div>
      </div>

      {/* Divider 7: Curved */}
      <div className="py-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          7. Curved Divider
        </h3>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12"
        >
          <path
            d="M1200 0L0 0 892.25 114.72 1200 0z"
            className="fill-current text-gray-200"
          ></path>
        </svg>
      </div>

      {/* Divider 8: With Text */}
      <div className="py-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          8. Text Divider
        </h3>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-gray-500 text-sm">
              OR CONTINUE WITH
            </span>
          </div>
        </div>
      </div>

      {/* Next Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Next Content Section
        </h2>
        <p className="text-gray-600 text-center">
          This section is visually separated from the previous one by the
          divider of your choice.
        </p>
      </div>
    </div>
  );
};

// Individual divider components for reuse
export const SimpleLineDivider = () => (
  <div className="h-px bg-gray-200 w-full my-8"></div>
);

export const GradientLineDivider = ({ color = "blue" }) => (
  <div
    className={`h-0.5 w-full bg-gradient-to-r from-transparent via-${color}-500 to-transparent my-8`}
  ></div>
);

export const OrnamentalDivider = ({ icon = "plus", color = "blue" }) => (
  <div className="flex items-center justify-center space-x-4 my-8">
    <div className="h-px bg-gray-300 flex-1"></div>
    <div
      className={`flex items-center justify-center w-8 h-8 rounded-full bg-${color}-500 text-white`}
    >
      {icon === "plus" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
    <div className="h-px bg-gray-300 flex-1"></div>
  </div>
);

export const WaveDivider = ({ flip = false, color = "gray" }) => (
  <div className={`overflow-hidden ${flip ? "transform rotate-180" : ""}`}>
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="w-full h-12"
    >
      <path
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
        opacity=".25"
        className={`fill-current text-${color}-200`}
      ></path>
      <path
        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
        opacity=".5"
        className={`fill-current text-${color}-200`}
      ></path>
      <path
        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
        className={`fill-current text-${color}-200`}
      ></path>
    </svg>
  </div>
);

export const TextDivider = ({ text = "OR", color = "gray" }) => (
  <div className="relative my-8">
    <div className="absolute inset-0 flex items-center">
      <div className={`w-full border-t border-${color}-300`}></div>
    </div>
    <div className="relative flex justify-center">
      <span className={`px-3 bg-white text-${color}-500 text-sm`}>{text}</span>
    </div>
  </div>
);

export default SectionDividers;
