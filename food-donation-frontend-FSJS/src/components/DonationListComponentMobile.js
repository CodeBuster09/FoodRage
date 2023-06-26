import React, { useContext } from "react";
import { GlobalContex } from "../context/contex";
import { useNavigate } from "react-router-dom";

function DonationListComponentMobile({
  donation,
  redirectPath,
  setCurrentPage,
  page
}) {
  const navigate = useNavigate();
  const { userData } = useContext(GlobalContex);
  const donorDetail = (
    <div className="flex  items-center justify-center   gap-2">
      {donation.donorImage ? (
        <img
          className="   rounded-full w-11 h-11 m-1  object-cover"
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
      <div>
        <h1>{donation.donorName}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-xs">
          {donation.donorEmail}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs">
          {new Date(donation.createdAt).toDateString()}
        </p>
      </div>
    </div>
  );

  return (
    <div className="overflow-x-auto  shadow-2xl rounded-lg  mb-4 ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption
          className="  md:p-5  p-2 text-lg font-semibold text-left text-gray-900 bg-white dark:bg-gray-800  dark:text-white  cursor-pointer "
          onClick={() => {
            setCurrentPage(page);
            navigate(redirectPath + "/" + donation._id);
          }}
        >
          <div className=" flex-col  md:flex-row  flex   md:gap-14 md-4">
            <div className="flex  md:flex-col  md:items-start items-center   gap-4 justify-between ">
              {userData.role === "DONOR" ? (
                <h1>{new Date(donation.createdAt).toDateString()}</h1>
              ) : (
                // donor detail
                donorDetail
                // donor detail end
              )}

              <p
                className={
                  `${
                    (donation.status === "PENDING" && " text-yellow-400") ||
                    (donation.status === "ACCEPTED" && "text-green-500") ||
                    (donation.status === "REJECTED" && "text-red-500") ||
                    (donation.status === "COLLECTED" && "text-blue-500")
                  }` + "     md:text-lg  text-sm mr-4"
                }
              >
                {donation.status}
              </p>
            </div>
            <p className=" my-3 text-sm font-normal text-gray-500 dark:text-gray-400 truncate max-w-xs">
              {donation.message}
            </p>
          </div>
        </caption>
      </table>
    </div>
  );
}

export default DonationListComponentMobile;
