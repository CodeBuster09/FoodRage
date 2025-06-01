import React from "react";

function AgentProfileInfoComponent({ user }) {
  return (
    <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex gap-4">
        {user.profileImage ? (
          <img
            src={user.profileImage.url}
            className="h-20 w-20 rounded-full  object-cover object-center"
            alt=""
          />
        ) : (
          <svg
            className="w-20 h-20 text-gray-200 dark:text-gray-700"
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
          <p className="text-lg  font-semibold  dark:text-white text-gray-800">
            {user.firstName + " " + user.lastName}
          </p>
          <p className="font-semibold  dark:text-gray-400 text-gray-700">
            {user.email}
          </p>
          <p className="font-semibold  dark:text-gray-400 text-gray-700">
            {user.phoneNo}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4 ">
        {/* role */}
        <span className="flex gap-11 ">
          <p className="text-md   font-semibold dark:text-white text-gray-800">
            role :{" "}
          </p>
          <p className=" text-md   dark:text-gray-400 text-gray-700">
            {user.role}
          </p>
        </span>
        {/* role  end*/}
        {/* delivered */}
        <span className="flex gap-3 items-center">
          <p className="text-md font-semibold   dark:text-white text-gray-800">
            Collected :{" "}
          </p>
          <p className="text-md   dark:text-gray-400 text-gray-700">
            {" "}
            {user.collected}
          </p>
        </span>
        {/* delivered  end*/}
        {/* assinged */}
        <span className="flex gap-3 items-center">
          <p className=" text-md font-semibold  dark:text-white text-gray-800">
            Assigned :{" "}
          </p>
          <p className="text-md   dark:text-gray-400 text-gray-700">
            {user.accepted}
          </p>
        </span>
        {/* assinged */}
        {/* rejected */}
        {user.role === "DONOR" ? (
          <span className="flex gap-3 items-center">
            <p className="text-md font-semibold   dark:text-white text-gray-800">
              Pending :{" "}
            </p>
            <p className="text-md   dark:text-gray-400 text-gray-700">
              {" "}
              {user.pending}
            </p>
          </span>
        ) : null}
        {/* rejected */}
        {/* rejected */}
        {user.role === "DONOR" ? (
          <span className="flex gap-3 items-center">
            <p className="text-md font-semibold   dark:text-white text-gray-800">
              Rejected :{" "}
            </p>
            <p className="text-md   dark:text-gray-400 text-gray-700">
              {" "}
              {user.rejected}
            </p>
          </span>
        ) : null}

        {/* rejected */}
        {/*  */}
        <span className="flex gap-3   items-start">
          <p className="text-md   font-semibold  dark:text-white text-gray-800  ">
            Joined At:{" "}
          </p>
          <p className="text-md  dark:text-gray-400 text-gray-700 ">
            {" "}
            {new Date(user.createdAt).toDateString()}
          </p>
        </span>
        {/*  */}
        {/* address */}
        <span className="flex gap-3  items-start">
          <p className="text-md font-semibold dark:text-white text-gray-800  ">
            Address:{" "}
          </p>
          <p className="text-md  dark:text-gray-400 text-gray-700 ">
            {" "}
            {user.address}
          </p>
        </span>
        {/* address end */}
      </div>
    </div>
  );
}

export default AgentProfileInfoComponent;
