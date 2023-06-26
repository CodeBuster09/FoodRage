import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { GlobalContex } from "../../context/contex";
function Filter() {
  const { filter, setfilter, userData } = useContext(GlobalContex);
  const [donationFilter, setDonationFilter] = useState(filter);
  const [showFilterPopUp, setShowFilterPopUp] = useState(false);
  const [dateRange, setDateRange] = useState([filter.from, filter.to]);
  const [startDate, endDate] = dateRange;
  /// custon input date field
  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      className="w-[17rem] h-10  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={onClick}
      ref={ref}
      defaultValue={value}
      readOnly
      required
    />
  ));

  function handlefilter() {
    setfilter({
      ...donationFilter,
      from: startDate === null ? "" : startDate,
      to: endDate === null ? "" : endDate,
      page: 1
    });
    setShowFilterPopUp(false);
  }
  function checkFilteredApplied() {
    if (
      filter.to === "" &&
      filter.from === "" &&
      filter.status === "ALL" &&
      filter.donorId === ""
    )
      return false;
    else return true;
  }

  return (
    <>
      {/* filter button */}
      <button
        onClick={() => {
          setShowFilterPopUp((preVal) => !preVal);
        }}
        type="button"
        className="text-blue-700  md:mr-8 mb-2 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
      >
        {checkFilteredApplied() ? (
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        )}

        <span className="sr-only">Icon description</span>
      </button>
      {/* filter button  end*/}

      {showFilterPopUp ? (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50   bg-[#000000c7] flex  justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0  h-full"
        >
          <div className="relative max-w-md md:h-auto shadow-2xl">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="popup-modal"
                onClick={() => {
                  setShowFilterPopUp(false);
                }}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

              <div className="p-6 text-center ">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>

                {/* date */}
                <div className="flex  md:items-center  items-start gap-4   md:gap-0 flex-col md:flex-row mb-4">
                  <p className="w-28   text-start  font-semibold  text-gray-800 dark:text-gray-400">
                    Select Date
                  </p>
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    maxDate={new Date()}
                    endDate={endDate}
                    todayButton="currentDate"
                    dateFormat="MMMM d, yyyy"
                    onChange={(update) => {
                      setDateRange(update);
                    }}
                    isClearable={true}
                    customInput={<ExampleCustomInput />}
                  />
                </div>
                {/* date end */}
                {/* status */}
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <p className="font-semibold  text-gray-800 dark:text-gray-400">
                    Status :
                  </p>
                  <div className=" flex flex-wrap">
                    <div className="flex items-center mr-4 mt-2">
                      <input
                        id="red-radio"
                        type="radio"
                        defaultChecked={
                          donationFilter.status == "PENDING" ? true : false
                        }
                        onChange={(e) =>
                          setDonationFilter((preVal) => {
                            return { ...preVal, status: "PENDING" };
                          })
                        }
                        name="colored-radio"
                        className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="red-radio"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        pending
                      </label>
                    </div>
                    <div className="flex items-center mr-4 mt-2">
                      <input
                        id="yellow-radio"
                        type="radio"
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        defaultChecked={
                          donationFilter.status == "ACCEPTED" ? true : false
                        }
                        onChange={(e) =>
                          setDonationFilter((preVal) => {
                            return { ...preVal, status: "ACCEPTED" };
                          })
                        }
                        name="colored-radio"
                      />
                      <label
                        htmlFor="yellow-radio"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {userData.role === "DONOR" ? "  Accepted" : "Assigned"}
                      </label>
                    </div>{" "}
                    {/* rejected  */}
                    {userData.role === "AGENT" ? null : (
                      <div className="flex items-center mr-4 mt-2">
                        <input
                          id="yellow-radio"
                          type="radio"
                          className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          defaultChecked={
                            donationFilter.status == "REJECTED" ? true : false
                          }
                          onChange={(e) =>
                            setDonationFilter((preVal) => {
                              return { ...preVal, status: "REJECTED" };
                            })
                          }
                          name="colored-radio"
                        />
                        <label
                          htmlFor="yellow-radio"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Rejected
                        </label>
                      </div>
                    )}
                    {/* rejected end */}
                    <div className="flex items-center mr-4 mt-2">
                      <input
                        id="green-radio"
                        type="radio"
                        defaultChecked={
                          donationFilter.status == "COLLECTED" ? true : false
                        }
                        onChange={(e) =>
                          setDonationFilter((preVal) => {
                            return { ...preVal, status: "COLLECTED" };
                          })
                        }
                        name="colored-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="green-radio"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        collected
                      </label>
                    </div>
                    <div className="flex items-center mr-4 mt-2">
                      <input
                        id="red-radio"
                        type="radio"
                        defaultChecked={
                          donationFilter.status == "ALL" ? true : false
                        }
                        onChange={(e) =>
                          setDonationFilter((preVal) => {
                            return { ...preVal, status: "ALL" };
                          })
                        }
                        name="colored-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="red-radio"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        All
                      </label>
                    </div>
                  </div>
                </div>
                {/* status */}

                {/* submit cancle button */}
                <div className="flex  gap-5   mt-16  flex-wrap  justify-center items-center">
                  <button
                    type="button"
                    className="text-white    bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:blue-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center "
                    onClick={() => handlefilter()}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Filter
                  </button>
                  <button
                    data-modal-toggle="popup-modal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => {
                      setShowFilterPopUp(false);
                      setfilter((preVal) => {
                        return {
                          ...preVal,
                          to: "",
                          from: "",
                          status: "ALL",
                          donorId: ""
                        };
                      });
                      setDonationFilter({
                        to: "",
                        from: "",
                        status: "ALL",
                        donorId: ""
                      });
                      setDateRange([null, null]);
                    }}
                  >
                    Cancel
                  </button>
                </div>
                {/* submit cancle button end */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Filter;
