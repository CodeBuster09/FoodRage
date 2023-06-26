import React from "react";
import { Link } from "react-router-dom";

function UserListComponent({ user, setCurrentUser, page }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="flex  items-center gap-2   px-2 py-1 md:px-6 md:py-4   font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user.profileImage && user.profileImage.url ? (
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={user.profileImage.url}
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
        <div className="text-base font-semibold">
          {user.firstName + " " + user.lastName}
        </div>
      </th>
      <td className="px-6 py-4 text-center dark:text-gray-200 text-gray-700     ">
        {user.phoneNo}
      </td>
      <td className="px-6 py-4  ">
        <div className="flex items-center justify-center dark:text-gray-200 text-gray-700">
          {user.email}
        </div>
      </td>
      <td className="px-6 py-4  text-center">
        <Link
          to={`/${user.role.toLowerCase() + "s"}/` + user._id}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          <div onClick={() => setCurrentUser({ page: page, user: user })}>
            more Info
          </div>
        </Link>
      </td>
    </tr>
  );
}

export default UserListComponent;
