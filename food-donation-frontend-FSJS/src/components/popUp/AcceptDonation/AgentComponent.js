import React, { useState } from "react";
function AgentComponent({ agent, selectedAgent, setSelectedAgent }) {
  const [showAgentDetail, setShowAgentDetail] = useState(false);

  return (
    <div className="  my-4   w-full  ">
      <div className="flex items-center space-x-4 justify-between w-full mt-4 md:px-1">
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => setShowAgentDetail((preVal) => !preVal)}
        >
          <div className="flex-shrink-0">
            {agent.profileImage?.url ? (
              <img
                className=" md:w-12 md:h-12   w-8 h-8 rounded-full object-cover object-center "
                src={agent.profileImage?.url}
                alt="Neil image"
              />
            ) : (
              <svg
                className="w-14 h-14 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm  text-gray-700 truncate dark:text-white flex gap-3">
              <p className=" font-semibold">
                {agent.firstName + " " + agent.lastName}
              </p>
              <span className="text-gray-700 truncate dark:text-white">
                {showAgentDetail ? (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </span>
            </span>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {agent.email}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {agent.phoneNo}
            </p>
          </div>
        </div>
        {/* assign button */}
        <button
          type="button"
          className={
            selectedAgent._id === agent._id
              ? "px-3 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:green-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              : "px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          }
          onClick={() =>
            setSelectedAgent((preVal) =>
              preVal && preVal._id === agent._id ? { _id: "" } : agent
            )
          }
        >
          Assign
        </button>
        {/* assign button  end*/}
      </div>
      {showAgentDetail ? (
        <div className=" flex flex-col gap-2 mt-3">
          {/* Address */}

          <p className="text-gray-900 truncate dark:text-white  mx-4 md:px-8 ">
            collected : {agent.collected}
          </p>
          <p className="text-gray-900 truncate dark:text-white  mx-4 md:px-8">
            Assigned : {agent.accepted}
          </p>
          <div className="  md:px-8">
            {agent.address ? (
              <span className="flex  mx-4     ">
                <p className=" text-start font-semibold text-gray-700  dark:text-white ">
                  Address:
                </p>
                <p className="  text-sm text-gray-700 text-start  dark:text-white ">
                  &nbsp; {agent.address}
                </p>
              </span>
            ) : null}
          </div>
          {/* Address  end*/}
        </div>
      ) : null}
    </div>
  );
}

export default AgentComponent;
