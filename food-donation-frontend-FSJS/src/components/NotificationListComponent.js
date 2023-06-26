import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContex } from "../context/contex";
import useRemoveNotificationHook from "../customHooks/useRemoveNotificationHook.js";
function NotificationListComponent({ notification }) {
  const navigate = useNavigate();

  const { setShowNotificationComponent, setNotificationData, notify } =
    useContext(GlobalContex);

  const { loading, error, data, removeNotification } =
    useRemoveNotificationHook();

  async function handleNotification() {
    removeNotification(notification._id);
  }

  useEffect(() => {
    if (!loading && data) {
      navigate("/donations/" + notification.donationId);
      setNotificationData((preVal) => {
        return {
          ...preVal,
          notifications: preVal.notifications.filter(
            (e) => e._id !== notification._id
          )
        };
      });
      setShowNotificationComponent(false);
    }
  }, [loading]);

  return (
    <div
      className="notificationListComponent max-w-md md:h-auto rounded-lg cursor-pointer"
      style={{ boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px" }}
      onClick={() => {
        handleNotification();
      }}
    >
      {/* collected */}
      {notification.donationStatus === "COLLECTED" ? (
        <div className="relative bg-white rounded-lg  dark:bg-gray-700 p-4">
          <span className="flex    items-end gap-2">
            <p className=" font-bold text-blue-500 text-xl">
              {notification.donationStatus}
            </p>
            <p className=" dark:text-white text-gray-500  pb-1 font-thin text-xs">
              {notification.donationId}
            </p>
          </span>
          <p className="dark:text-gray-400 text-gray-600  font-thin">
            {notification.role === "ADMIN"
              ? notification.donorName +
                "s donation collected by Agent " +
                notification.agentName
              : null}
            {notification.role === "DONOR"
              ? notification.agent + " Collected  you donation"
              : null}
          </p>
        </div>
      ) : null}
      {/* collected */}
      {/* pending */}
      {notification.donationStatus === "PENDING" ? (
        <div className="relative bg-white rounded-lg  dark:bg-gray-700 p-4">
          <span className="flex    items-end gap-2">
            <p className=" font-bold text-yellow-500 text-xl">
              {notification.donationStatus}
            </p>
            <p className=" dark:text-white text-gray-500  pb-1 font-thin text-xs">
              {notification.donationId}
            </p>
          </span>
          <p className="dark:text-gray-400 text-gray-600  font-thin">
            {notification.donorName} just send make the request for donation
          </p>
        </div>
      ) : null}
      {/* pending end */}
      {/* rejected */}
      {notification.donationStatus === "REJECTED" ? (
        <div className="relative bg-white rounded-lg  dark:bg-gray-700 p-4">
          <span className="flex    items-end gap-2">
            <p className=" font-bold text-red-500 text-xl">
              {notification.donationStatus}
            </p>
            <p className=" dark:text-white text-gray-500  pb-1 font-thin text-xs">
              {notification.donationId}
            </p>
          </span>
          <p className="dark:text-gray-400 text-gray-600  font-thin">
            {notification.donorName} donation request is rejected
          </p>
        </div>
      ) : null}
      {/* rejected end */}
      {/*  */}
      {notification.donationStatus === "ACCEPTED" ? (
        <div className="relative bg-white rounded-lg  dark:bg-gray-700 p-4">
          <span className="flex    items-end gap-2">
            <p className=" font-bold text-green-500 text-xl">
              {notification.donationStatus}
            </p>
            <p className=" dark:text-white text-gray-500  pb-1 font-thin text-xs">
              {notification.donationId}
            </p>
          </span>
          <p className="dark:text-gray-400 text-gray-600  font-thin">
            {notification.role === "DONOR"
              ? notification.agentName + " will collect donation from you"
              : null}

            {notification.role === "AGENT"
              ? notification.donorName + "s donation Assigned to you"
              : null}
          </p>
        </div>
      ) : null}
      {/*  */}
    </div>
  );
}

export default NotificationListComponent;
