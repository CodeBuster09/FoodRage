import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const GlobalContex = createContext();

const Contex = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [userLoading, setUserLoading] = useState(true);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showLogoutPopUp, setShowLogoutPopUp] = useState(false);
  const [currentDonation, setCurrentDonation] = useState({});
  const [socketInstance, setSocketInstance] = useState(null);
  const [notificationData, setNotificationData] = useState({
    notification: []
  });
  const [showNotificationComponent, setShowNotificationComponent] =
    useState(false);

  const [TOKEN, setTOKEN] = useState(
    sessionStorage.getItem("Token")
      ? JSON.parse(sessionStorage.getItem("Token"))
      : { token: "", expiryDate: new Date() }
  );
  const [filter, setfilter] = useState({
    from: "",
    to: "",
    donorId: "",
    agentId: "",
    status: "ALL",
    page: 1,
    limit: 10
  });

  const notify = (message, type) => {
    return toast[type](message, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
  };

  return (
    <GlobalContex.Provider
      value={{
        notify,
        TOKEN,
        setTOKEN,
        filter,
        setfilter,
        userData,
        setUserData,
        userLoading,
        setUserLoading,
        showSideBar,
        setShowSideBar,
        showLogoutPopUp,
        setShowLogoutPopUp,
        socketInstance,
        setSocketInstance,
        currentDonation,
        notificationData,
        setNotificationData,
        setCurrentDonation,
        showNotificationComponent,
        setShowNotificationComponent
      }}
    >
      {children}
    </GlobalContex.Provider>
  );
};

export default Contex;
