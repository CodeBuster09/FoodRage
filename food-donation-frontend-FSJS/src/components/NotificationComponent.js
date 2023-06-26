import React, { useContext, useRef, useEffect } from "react";
import { GlobalContex } from "../context/contex";
import NotificationListComponent from "./NotificationListComponent";
function NotificationComponent() {
  const { setShowNotificationComponent, notificationData } =
    useContext(GlobalContex);
  const naveBarComponentRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", (e) => handleClickOutside(e), true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (e.target.closest(".notificationButton")) {
      return setShowNotificationComponent((preVal) => (preVal ? false : true));
    }
    if (e.target.closest(".notificationComponent")) return;
    if (e.target.closest(".notificationListComponent")) return;
    setShowNotificationComponent(false);
  };

  return (
    <div
      className="notificationComponent  scroll absolute top-24 right-4  flex flex-col gap-3 z-10  max-w-md   overflow-scroll  max-h-[70vh]  px-4 py-2 rounded-xl"
      ref={naveBarComponentRef}
    >
      {/* card */}
      {notificationData.notifications &&
      notificationData.notifications.length < 1 ? (
        <div className="md:w-[20rem] md:h-20  shadow-2xl bg-white rounded-lg flex items-center justify-center  dark:bg-gray-700 p-2">
          <p className=" font-bold text-xl   text-blue-500">No notifications</p>
        </div>
      ) : (
        notificationData.notifications &&
        notificationData.notifications.map((notification) => (
          <NotificationListComponent
            key={notification._id}
            notification={notification}
          />
        ))
      )}
      {/* card end */}
    </div>
  );
}

export default NotificationComponent;
