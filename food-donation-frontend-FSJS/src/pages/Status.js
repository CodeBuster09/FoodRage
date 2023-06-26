import React, { useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import DonationList from "../components/donationLists";
import DonationInfo from "../components/DonationInfo";
import { useParams } from "react-router-dom";
import { GlobalContex } from "../context/contex.js";

function Status() {
  const { userData } = useContext(GlobalContex);

  const { donationId } = useParams();
  const URL = process.env.REACT_APP_URL;
  const donationsUrl = `${URL}/api/donations?donorId=${userData._id}&status=PENDING+ACCEPTED`;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex  h-full md:gap-1">
      <Sidebar />
      <div className="scroll h-full relative flex-1  bg-blue-50  dark:bg-gray-800 overflow-scroll">
        {donationId ? (
          <DonationInfo
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            path="Status"
          />
        ) : (
          <DonationList
            setCurrentPage={setCurrentPage}
            donationsUrl={donationsUrl}
            PageType="Status"
            baseUrl="/status"
            PAGE="STATUS"
          />
        )}
      </div>
    </div>
  );
}

export default Status;
