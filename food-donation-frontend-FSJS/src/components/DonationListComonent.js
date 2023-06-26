import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContex } from "../context/contex";

function DonationListComonent({ donation, setCurrentPage, path, page }) {
  const { userData } = useContext(GlobalContex);
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="flex  items-center gap-2   px-2 py-1 md:px-6 md:py-4   font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {donation.donorImage ? (
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={donation.donorImage}
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
        <div className="text-base font-semibold">{donation.donorName}</div>
      </th>
      <td className="px-6 py-4 text-center dark:text-gray-200 text-gray-700     ">
        {new Date(donation.createdAt).toDateString()}
      </td>
      <td className="px-6 py-4  ">
        <div
          className={`flex items-center justify-center   ${
            (donation.status === "ACCEPTED" && "text-green-500") ||
            (donation.status === "REJECTED" && "text-red-500") ||
            (donation.status === "PENDING" && "text-yellow-300") ||
            (donation.status === "COLLECTED" && "text-blue-500")
          }       font-bold`}
        >
          {donation.status === "ACCEPTED" &&
          (userData.role === "ADMIN" || userData.role === "AGENT")
            ? "ASSIGNED"
            : donation.status}
        </div>
      </td>
      <td className="px-6 py-4  text-center">
        <Link
          to={path + "/" + donation._id}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          <div
            onClick={() => {
              setCurrentPage(page);
            }}
          >
            more Info
          </div>
        </Link>
      </td>
    </tr>
  );
}

export default DonationListComonent;
