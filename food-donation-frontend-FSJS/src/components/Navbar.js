import React from "react";
import logo from "../asset/icon.jpg";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContex } from "../context/contex.js";
// component
import DarkModeToggleButton from "./DarkModeToggleButton.js";
import useFetchData from "../customHooks/useFetchData";
function Navbar() {
  const {
    notify,
    userData,
    userLoading,
    setShowSideBar,
    setShowNotificationComponent,
    showNotificationComponent,
    notificationData,
    setNotificationData
  } = useContext(GlobalContex);
  const location = useLocation();

  // uncomment when use when use sockit

  // const { error, data, loading, fetchData } = useFetchData();

  // useEffect(() => {
  //   if (Object.values(userData).length > 0) {
  //     fetchData(process.env.REACT_APP_URL + "/api/notifications?limit=50");
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!loading) setNotificationData(data);
  // }, [loading]);
  // useEffect(() => {
  //   notify(error, "error");
  // }, [error]);

  return (
    <>
      <nav className=" flex items-center  fixed top-0 left-0 w-full h-20 bg-white border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-900 shadow   z-10 ">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              className="h-6 mr-3 sm:h-9"
              alt="Food donation Logo"
            />
            <span className="self-center text-gray-900 text-xl font-semibold whitespace-nowrap dark:text-white">
              Food Donation
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setShowSideBar((preval) => !preval)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="md:flex md:order-2 items-center  hidden">
            {/* <DarkModeToggleButton /> */}
            {userLoading ? (
              <div className="flex items-center  space-x-3">
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
                <div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                  <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
              </div>
            ) : Object.values(userData).length < 1 ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/sign_in"
                  className={
                    location.pathname === "/sign_in"
                      ? " py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      : "py-2 px-3 text-sm text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg  text-center  dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                  }
                >
                  SignIn
                </Link>{" "}
                <Link
                  to="/sign_up"
                  className={
                    location.pathname === "/sign_up"
                      ? " py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      : "py-2 px-3 text-sm text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg  text-center  dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                  }
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div className="flex items-center  space-x-3   cursor-pointer ">
                {/* uncomment the notification component , when you wnat use sockeit.io */}

                {/* notification */}
                {/* {Object.keys(userData).length > 0 ? (
                  <div
                    onClick={() =>
                      setShowNotificationComponent((preval) => !preval)
                    }
                    className="notificationButton md:mr-8  mr-4 h-8 relative  p-1 w-8   dark:text-blue-500  dark:hover:bg-gray-800  hover:bg-gray-100  rounded-full flex items-center justify-center"
                  > */}
                {/* {showNotificationComponent ? (
                      <svg
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    )} */}

                {/* red ball */}
                {/* {notificationData.notifications &&
                    notificationData.notifications.length > 0 ? (
                      <div className="absolute w-2 h-2  rounded-full bg-red-600   bottom-1 right-1"></div>
                    ) : null} */}
                {/* red ball end */}
                {/* </div>
                ) : null} */}

                {/* notificaton  end */}
                {userData.profileImage && userData.profileImage.url ? (
                  <img
                    src={userData.profileImage.url}
                    alt="image"
                    className="  h-12 w-12 rounded-full object-cover"
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
                  <p className="dark:text-white text-gray-800 font-semibold text-lg">
                    {userData.firstName} {userData.lastName[0].toUpperCase()}
                  </p>
                  <p className="dark:text-white text-gray-600">
                    {userData.email}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              {Object.values(userData).length > 0 ? (
                <li>
                  <Link
                    to="/donations"
                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Donations
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
