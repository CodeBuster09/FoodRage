import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import DonationInfo from "../../components/DonationInfo.js";
import DonationList from "./DonationList";

function Index() {
  const { donationId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex  h-full md:gap-1">
      <Sidebar />
      <div className="scroll h-full relative flex-1  bg-blue-50  dark:bg-gray-800 overflow-scroll">
        {donationId ? (
          <DonationInfo
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            path="Donations"
          />
        ) : (
          <DonationList setCurrentPage={setCurrentPage} />
        )}
      </div>
    </div>
  );
}
export default Index;
