import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GlobalContex } from "../context/contex";

function Sidebar() {
  const { showSideBar, setShowSideBar, setShowLogoutPopUp, userData } =
    useContext(GlobalContex);
  const location = useLocation();
  useEffect(() => {
    window.screen.width > 768 ? setShowSideBar(true) : setShowSideBar(false);
  }, [window.screen.width]);

  return (
    <>
      {showSideBar ? (
        <div className="relative h-full">
          <aside
            className="w-64  h-full shadow-3xl   md:relative     md:top-0    fixed  z-50 left-0 top-20   md:z-0  "
            aria-label="Sidebar     "
          >
            <div className="overflow-y-auto h-full py-4 px-3 bg-gray-50   dark:bg-gray-800">
              <ul className="space-y-2  border-b pb-5 border-gray-200 dark:border-gray-700">
                {Object.keys(userData).length > 0 ? (
                  <>
                    {/* donations */}
                    <li>
                      <Link
                        to="/donations"
                        className={
                          location.pathname.includes("/donations")
                            ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                            : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        }
                      >
                        <svg
                          aria-hidden="true"
                          className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                        </svg>
                        <span className="ml-3">Donations</span>
                      </Link>
                    </li>
                    {/* donations end */}
                    {/* Assigned */}
                    {userData.role === "AGENT" ? (
                      <li>
                        <Link
                          to="/assigned"
                          className={
                            location.pathname.includes("/assigned")
                              ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                              : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          }
                        >
                          <svg
                            aria-hidden="true"
                            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              clipRule="evenodd"
                              d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                          <span className="ml-3">Assigned</span>
                        </Link>
                      </li>
                    ) : null}
                    {/* assigned */}
                    {/* requests */}
                    {userData.role === "ADMIN" ? (
                      <li>
                        <Link
                          to="/requests"
                          className={
                            location.pathname === "/requests"
                              ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                              : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          }
                        >
                          <svg
                            aria-hidden="true"
                            fill="currentColor"
                            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5.625 3.75a2.625 2.625 0 100 5.25h12.75a2.625 2.625 0 000-5.25H5.625zM3.75 11.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zM3 15.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3.75 18.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z"></path>
                          </svg>
                          <span className="flex-1 ml-3 whitespace-nowrap">
                            Requests
                          </span>
                        </Link>
                      </li>
                    ) : null}
                    {/* requestts end */}
                    {/*   agents */}
                    {userData.role === "ADMIN" ? (
                      <li>
                        <Link
                          to="/agents"
                          className={
                            location.pathname.includes("/agents")
                              ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                              : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          }
                        >
                          <svg
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"></path>
                          </svg>

                          <span className="flex-1 ml-3 whitespace-nowrap">
                            Agents
                          </span>
                        </Link>
                      </li>
                    ) : null}
                    {/*  agents end */}
                    {/* donors */}
                    {userData.role === "ADMIN" ? (
                      <li>
                        <Link
                          to="/donors"
                          className={
                            location.pathname.includes("/donors")
                              ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                              : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          }
                        >
                          <svg
                            aria-hidden="true"
                            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              clipRule="evenodd"
                              d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                              fillRule="evenodd"
                            ></path>
                            <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z"></path>
                          </svg>

                          <span className="flex-1 ml-3 whitespace-nowrap">
                            Donors
                          </span>
                        </Link>
                      </li>
                    ) : null}
                    {/* donors end */}
                    {/* donate */}
                    {userData.role === "DONOR" ? (
                      <li>
                        <Link
                          to="/donate"
                          className={
                            location.pathname === "/donate"
                              ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                              : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          }
                        >
                          <svg
                            aria-hidden="true"
                            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                          </svg>
                          <span className="flex-1 ml-3 whitespace-nowrap">
                            Donate
                          </span>
                        </Link>
                      </li>
                    ) : null}
                    {/* donate */}
                    {/* Status */}
                    {userData.role === "DONOR" ? (
                      <li>
                        <Link
                          to="/status"
                          className={
                            location.pathname === "/status"
                              ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                              : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          }
                        >
                          <svg
                            aria-hidden="true"
                            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                            <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                          </svg>
                          <span className="flex-1 ml-3 whitespace-nowrap">
                            Status
                          </span>
                        </Link>
                      </li>
                    ) : null}
                    {/* Status end */}
                    {/* add agent */}
                    {userData.role === "ADMIN" ? (
                      <li>
                        <Link
                          to="/add_agent"
                          className={
                            location.pathname === "/add_agent"
                              ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                              : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          }
                        >
                          <svg
                            aria-hidden="true"
                            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                          </svg>
                          <span className="flex-1 ml-3 whitespace-nowrap">
                            Add Agent
                          </span>
                        </Link>
                      </li>
                    ) : null}
                    {/* add agent end */}
                    {/* profile  */}
                    <li>
                      <Link
                        to="/profile"
                        className={
                          location.pathname === "/profile"
                            ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                            : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        }
                      >
                        <svg
                          aria-hidden="true"
                          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">
                          Profile
                        </span>
                      </Link>
                    </li>
                    {/* profile end */}
                    {/* logout */}
                    <li>
                      <div
                        className=" cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {
                          setShowLogoutPopUp(true);
                        }}
                      >
                        <svg
                          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          ></path>
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">
                          Log Out
                        </span>
                      </div>
                    </li>
                    {/* logout end */}
                  </>
                ) : (
                  <>
                    {/* sign in */}
                    <li>
                      <Link
                        to="/sign_in"
                        className={
                          location.pathname === "/sign_in"
                            ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                            : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        }
                      >
                        <svg
                          aria-hidden="true"
                          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">
                          signIn
                        </span>
                      </Link>
                    </li>{" "}
                    {/* sing in end */}
                    {/* sing up*/}
                    <li>
                      <Link
                        to="/sign_up"
                        className={
                          location.pathname === "/sign_up"
                            ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                            : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        }
                      >
                        <svg
                          aria-hidden="true"
                          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">
                          signUp
                        </span>
                      </Link>
                    </li>
                    {/* signup out */}
                  </>
                )}
              </ul>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}

export default Sidebar;
