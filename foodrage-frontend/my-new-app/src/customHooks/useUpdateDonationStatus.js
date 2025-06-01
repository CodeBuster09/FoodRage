import { useContext } from "react";
import { GlobalContex } from "../context/contex";

const useUpdateDonationStatus = () => {
  const { notificationData } = useContext(GlobalContex);
  const { notifications } = notificationData;

  function updateDonationStatus(donations, page = "") {
    /// return notification(object) if the donations(array of object)  donation(object)
    ///  exist in notifications(array of object) notification(object)
    /// base on donationdId in notification(objcet) and _id in donation(object)
    function notificationObj(donation) {
      return notifications.find(
        (notification) => notification.donationId === donation._id
      );
    }

    const updatedStatusDonationsArr = donations.map((donation) => {
      const notification = notificationObj(donation);
      return notification
        ? { ...donation, status: notification.donationStatus }
        : donation;
    });

    //// return the updated status donation basee on notificaion
    if (page === "Status") {
      return updatedStatusDonationsArr.filter(
        (donation) => donation.status !== "COLLECTED"
      );
    } else return updatedStatusDonationsArr;
  }

  return updateDonationStatus;
};

export default useUpdateDonationStatus;

//  notificationData = {  next:{} , previous:{} ,   notifications: [ {} , {}  {} ] }
/// donationData = {next:{} , previous:{} ,  donations :[ {}, {}, {} ]  }
