import React from "react";
import { useNavigate } from "react-router-dom";

function AgentListComponentmobile({ agent, redirectPath, setCurrentAgent }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto  shadow-2xl rounded-lg  mb-4 ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption
          className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:bg-gray-800  dark:text-white  cursor-pointer "
          onClick={() => {
            setCurrentAgent((preVal) => {
              return { ...preVal, agent: agent };
            });
            navigate(redirectPath + "/" + agent._id);
          }}
        >
          <div className="flex  items-center    gap-2">
            {agent.profileImage?.url ? (
              <img
                className="   rounded-full w-11 h-11 m-1  object-cover"
                src={agent.profileImage.url}
                alt="img"
              />
            ) : (
              <svg
                className="w-14 h-14 text-gray-200 dark:text-gray-700"
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
            <div>
              <h1>{agent.firstName + " " + agent.lastName}</h1>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                {agent.email}
              </p>
            </div>
          </div>
        </caption>
      </table>
    </div>
  );
}

export default AgentListComponentmobile;
