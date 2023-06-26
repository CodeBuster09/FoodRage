import React, { useState, useContext } from "react";
import { GlobalContex } from "../context/contex";
import { useNavigate, useLocation } from "react-router-dom";

// conponent
import RemoveRejectDonation from "./popUp/Remove.Reject.collected.Donation.js";
import Accept from "./popUp/AcceptDonation/Accept.js";

function DonationStatus({ item, setDonationData }) {
  const location = useLocation();
  const urlQuery = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const { userData } = useContext(GlobalContex);
  const [showFooditems, setShowFoodItems] = useState(
    urlQuery.get("donationId") && urlQuery.get("donationId") == item._id
      ? true
      : false
  );

  // console.log(item);

  const donorDetail = (
    <div className="flex  items-center justify-center   gap-2">
      {item.donorImage ? (
        <img
          className="   rounded-full w-11 h-11 m-1 "
          src={item.donorImage}
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
        <h1>{item.donorName}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-xs">
          {item.donorEmail}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs">
          {new Date(item.createdAt).toDateString()}
        </p>
      </div>
    </div>
  );

  return (
    <div className="overflow-x-auto relative shadow-2xl rounded-lg  mb-4 ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption
          className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:bg-gray-800  dark:text-white  cursor-pointer "
          onClick={() => {
            setShowFoodItems((preVal) => !preVal);
            if (location.pathname == "/status") navigate("/status");
          }}
        >
          <div className=" flex-col  md:flex-row  flex   md:gap-14 md-4">
            <div className="flex  md:flex-col  md:items-start items-center  gap-4 ">
              {userData.role === "DONOR" ? (
                <h1>{new Date(item.createdAt).toDateString()}</h1>
              ) : (
                // donor detail
                donorDetail
                // donor detail end
              )}

              <p
                className={
                  (item.status === "PENDING" && " text-yellow-400") ||
                  (item.status === "ACCEPTED" && "text-green-500") ||
                  (item.status === "REJECTED" && "text-red-500") ||
                  (item.status === "DONATED" && "text-blue-500")
                }
              >
                {item.status}
              </p>
            </div>
            <p className=" mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              {item.message}
            </p>
          </div>
        </caption>
        {/* table body */}
        {showFooditems ? (
          <>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Item
                </th>
                <th scope="col" className="py-3 px-6">
                  Quantity
                </th>
                <th scope="col" className="py-3 px-6">
                  Unit
                </th>
              </tr>
            </thead>
            <tbody>
              {item.items.map((e, i) => {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={i}
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {e.item}
                    </th>
                    <td className="py-4 px-6">{e.quantity}</td>
                    <td className="py-4 px-6">{e.unit}</td>
                  </tr>
                );
              })}
            </tbody>
          </>
        ) : null}
        {/* table body  end*/}
      </table>
      {/* donation info Agent , donor Address*/}
      {showFooditems ? (
        <div className="m-4 flex flex-col gap-4 items-start ">
          {item.status === "ACCEPTED" ? (
            <div className="flex gap-5">
              <h1 className=" dark:text-white  text-gray-700  font-semibold">
                Agent :
              </h1>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <p>{item.agentName}</p>
                <p>{item.agentEmail}</p>
                <p>{item.agentPhoneNo}</p>
              </span>
            </div>
          ) : null}
          <h1 className=" dark:text-white  text-gray-700  font-semibold">
            Address :{" "}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {" "}
              {item.pickUpAddress}
            </span>
          </h1>

          {/* functional buttons reject, accept, remove, edit*/}
          <div className="flex gap-4">
            {/* reject button form admin */}
            {userData.role === "ADMIN" && item.status === "PENDING" ? (
              <>
                {/* reject donation */}
                <RemoveRejectDonation
                  id={item._id}
                  setDonationData={setDonationData}
                  type="Reject"
                />
                {/* reject donation end */}
                {/* accept donation */}
                <Accept id={item._id} setDonationData={setDonationData} />
                {/* accept donation  end*/}
              </>
            ) : null}
            {/* reject button form admin  end*/}

            {(userData.role === "DONOR" && item.status === "PENDING") ||
            item.status == "REJECTED" ? (
              <>
                <button
                  type="button"
                  className="   py-2 px-3 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={() => {
                    navigate("/donate?edit=" + item._id);
                  }}
                >
                  Edit
                </button>
                <RemoveRejectDonation
                  id={item._id}
                  setDonationData={setDonationData}
                  type="Remove"
                  redirectPath="/status"
                />
              </>
            ) : null}
          </div>
          {/* functional buttons */}
        </div>
      ) : null}
      {/* donation info end */}
    </div>
  );
}

export default DonationStatus;
