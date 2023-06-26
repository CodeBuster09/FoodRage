import React, { useState, useContext } from "react";
import axios from "axios";
import { GlobalContex } from "../../context/contex";
import { useNavigate } from "react-router-dom";

function RemoveRejectDonation({
  type,
  id,
  setDonation,
  donation,
  redirectPath = "/donations"
}) {
  const navigate = useNavigate();
  const { notify, TOKEN, socketInstance, userData } = useContext(GlobalContex);
  const [loading, setLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const URL = process.env.REACT_APP_URL;
  async function handleRemoveDonation() {
    try {
      const response = await axios({
        method: "delete",
        url: URL + "/api/donation/" + id,
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + TOKEN.token
        }
      });
      if (response.data.success) {
        navigate(redirectPath);
        notify(response.data.message, "success");
        setShowPopUp(false);
      }
    } catch (error) {
      setLoading(false);
      notify(error.response.message.error);
    }
  }

  async function handleRejecCollectDonaiton(type) {
    // sendNotification({ agentName: "agentNAme" }, type);
    // setShowPopUp(false);
    setLoading(true);
    try {
      const response = await axios({
        method: "put",
        url: URL + "/api/donation/" + id,
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + TOKEN.token
        },
        data: { status: type }
      });
      const data = response.data.data;
      if (response.data.success) {
        setDonation((preVal) => {
          return { ...preVal, status: type };
        });
        notify(`you just ${type} one  donation`, "success");
        setShowPopUp(false);
        // sendNotification(data, type);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notify(error.response.data.message, "error");
    }
  }

  /// send notificaiton
  function sendNotification(data, type) {
    /// send notification to admin and donor of agent mark donation as collected
    if (type === "COLLECTED") {
      socketInstance.emit(
        "notification",
        [
          {
            agentName: userData.firstName + " " + userData.lastName,
            donorName: donation.donorName,
            donationId: donation._id,
            donationStatus: "COLLECTED",
            role: "ADMIN"
          },
          {
            donorId: donation.donorId, // send notification to this user(donor)
            agentName: data.agentName,
            donationId: donation._id,
            donationStatus: "COLLECTED",
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
    // send notification to donor if admin rejected the donation
    if (type === "REJECTED") {
      socketInstance.emit(
        "notification",
        [
          {
            donorId: donation.donorId, // send notification to this user
            donationId: donation._id,
            donationStatus: "REJECTED",
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
  }

  return (
    <>
      <button
        className={
          type === "COLLECTED"
            ? " mx-2   py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            : " mx-2   py-2 px-3 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        }
        onClick={() => setShowPopUp((preVal) => !preVal)}
      >
        {type === "COLLECTED" && "COLLECT"}
        {type === "REJECTED" && "REJECT"}
        {type === "Remove" && "REMOVE"}
      </button>
      {showPopUp ? (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50  bg-[#000000c7] flex  justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0  h-full"
        >
          <div className="relative max-w-md md:h-auto shadow-2xl">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="popup-modal"
                onClick={() => {
                  setShowPopUp(false);
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
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {type === "COLLECTED" && "Mark this donation  as collected"}
                  {type === "REJECTED" &&
                    "Are you sure you want to reject this donation?"}
                  {type === "Remove" &&
                    "Are you sure you want to Remove this donation"}
                </h3>
                <div className="flex  gap-5    flex-wrap  justify-center items-center">
                  <button
                    type="button"
                    className={
                      type === "COLLECTED"
                        ? "text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                        : "text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    }
                    onClick={() => {
                      if (type === "Remove") handleRemoveDonation();
                      if (type === "REJECTED" || type === "COLLECTED") {
                        handleRejecCollectDonaiton(type);
                      }
                    }}
                  >
                    Yes, I'm sure
                    {loading ? (
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
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => {
                      setShowPopUp(false);
                    }}
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default RemoveRejectDonation;
