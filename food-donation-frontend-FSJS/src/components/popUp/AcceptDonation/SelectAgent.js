import React, { useState, useContext, useEffect } from "react";
import useFetchData from "../../../customHooks/useFetchData.js";
import { GlobalContex } from "../../../context/contex";
import loadingSvg from "../../../asset/loading.svg";
import axios from "axios";
import Search from "../../Search";

// component
import AgentComponent from "./AgentComponent.js";

function SelectAgent({ setShowPopUp, setComponent, donation, setDonation }) {
  const { notify, TOKEN, socketInstance } = useContext(GlobalContex);
  const [agentsData, setAgentsData] = useState({});
  const [conformLoading, setConformLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState({ _id: "" });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const URL = process.env.REACT_APP_URL;
  const url = (page, search = "") =>
    URL + `/api/users?role=AGENT&page=${page}&limit=10&search=${search}`;
  const { data, loading, error, fetchData } = useFetchData(url(page));
  if (error) notify(error, "error");

  useEffect(() => {
    setAgentsData(data);
  }, [data]);

  useEffect(() => {
    if (!loading) fetchData(url(page, search));
  }, [page]);

  async function handleSearch() {
    fetchData(url(1, search));
    setPage(1);
  }

  async function handleConform() {
    setConformLoading(true);

    try {
      const response = await axios({
        method: "put",
        url: URL + "/api/donation/" + donation._id,
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + TOKEN.token
        },
        data: { status: "ACCEPTED", agentId: selectedAgent._id }
      });
      /// update current donation
      if (response.data.success) {
        setDonation((preVal) => {
          return {
            ...preVal,
            status: "ACCEPTED",
            agentId: selectedAgent._id,
            agentName: selectedAgent.firstName + " " + selectedAgent.lastName,
            agentEmail: selectedAgent.email,
            agentPhoneNo: selectedAgent.phoneNo,
            agentImage: selectedAgent.profileImage?.url
          };
        });

        // sendNorification(); // send notification to agent and donor if donation accepted
        notify("Donation Accepted", "success");
        setShowPopUp(false);
        setComponent("ACCEPT");
      }
      setConformLoading(false);
    } catch (error) {
      setConformLoading(false);
      notify(error.response.data.message, "error");
    }
  }

  /// send notificaiton
  function sendNorification() {
    socketInstance.emit(
      "notification",
      [
        {
          agentId: selectedAgent._id, // send norificationt ot this agent
          donorName: donation.donorName,
          donationId: donation._id,
          donationStatus: "ACCEPTED",
          role: "AGENT"
        },
        {
          donorId: donation.donorId, // send notification to this donor
          agentName: selectedAgent.firstName + " " + selectedAgent.lastName,
          donationId: donation._id,
          donationStatus: "ACCEPTED",
          role: "DONOR"
        }
      ],
      function (data) {
        if (!data.succes) {
          notify(data.message, "error");
        }
      }
    );
  }

  return (
    <div className="relative bg-white md:rounded-lg shadow dark:bg-gray-700   w-full h-full  md:w-[50rem]  md:h-[80vh]">
      {/* close button */}
      <button
        type="button"
        className="absolute z-10 top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
        data-modal-toggle="popup-modal"
        onClick={() => {
          setShowPopUp(false);
          setComponent("ACCEPT");
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
      {/* close button */}
      <div className="p-6  h-full relative">
        <div className=" text-gray-600   dark:text-white   text-2xl  font-semibold">
          Assign Agent
        </div>
        <div className="w-full   ">
          {/* search */}
          <div className=" md:my-4    my-3">
            <Search handleSearch={handleSearch} setSearch={setSearch} />
          </div>
          {/* search  */}
          <div className="scroll  w-full      relative">
            <div className="scroll divide-y  h-[70vh]  md:h-[50vh] overflow-scroll  divide-gray-400 md:divide-y-8100">
              {loading ? (
                <div className="flex items-center justify-center w-full h-full">
                  <img src={loadingSvg} alt="img" />
                </div>
              ) : (
                agentsData.users &&
                agentsData.users.map((agent) => (
                  <AgentComponent
                    key={agent._id}
                    agent={agent}
                    setSelectedAgent={setSelectedAgent}
                    selectedAgent={selectedAgent}
                  />
                ))
              )}
            </div>

            <div className="flex    sticky w-full bottom-0      left-0   flex-wrap-reverse   gap-2   items-center  md:justify-between pt-4 ">
              <div className="   w-full md:w-fit  flex items-center justify-center gap-4 ">
                <button
                  data-modal-toggle="popup-modal"
                  type="button"
                  disabled={!selectedAgent._id}
                  className={
                    selectedAgent._id
                      ? "text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      : "text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  }
                  onClick={() => {
                    handleConform();
                  }}
                >
                  Conform
                  {conformLoading ? (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline ml-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : null}
                </button>
                <button
                  data-modal-toggle="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:red-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  onClick={() => {
                    setShowPopUp(false);
                    setComponent("ACCEPT");
                  }}
                >
                  No, cancel
                </button>
              </div>
              {/* page  */}
              <div className="   absolute    right-5 flex gap-5   items-center h-11   justify-center   w-40">
                <button
                  type="button"
                  onClick={() => setPage((preVal) => preVal - 1)}
                  disabled={loading || page <= 1}
                  className={
                    page > 1
                      ? "text-white shadow-2xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      : "text-blue-700 border shadow-2xl border-blue-700    focus:outline-none  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center  dark:border-blue-500 dark:text-blue-500  "
                  }
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Icon description</span>
                </button>

                <div className=" shadow-2xl rounded-lg bg-blue-600 h-10 w-10 text-white flex items-center justify-center font-semibold text-lg">
                  {loading ? (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className=" w-5 h-5 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    page
                  )}
                </div>
                <button
                  onClick={() => setPage((preVal) => preVal + 1)}
                  type="button"
                  disabled={loading || !agentsData.next}
                  className={
                    agentsData.next
                      ? "text-white shadow-2xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      : "text-blue-700 shadow-2xl border border-blue-700   focus:outline-none  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center  dark:border-blue-500 dark:text-blue-500  "
                  }
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
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Icon description</span>
                </button>
              </div>
              {/* page end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectAgent;
