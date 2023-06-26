import React, { useState } from "react";

// component
import AcceptDonation from "./AcceptDonation";
import SelectAgent from "./SelectAgent";
function Accept({ setDonationData, donation, setDonation }) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [component, setComponent] = useState("ACCEPT");
  return (
    <>
      <button
        className=" mx-2   py-2 px-3 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={() => setShowPopUp((preVal) => !preVal)}
      >
        Accepte ✅
      </button>
      {showPopUp ? (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed  p-0  top-0 left-0 right-0 z-50  bg-[#000000c7] flex  justify-center items-center md:p-4 overflow-x-hidden overflow-y-auto md:inset-0  h-full"
        >
          {component === "ACCEPT" ? (
            <AcceptDonation
              setComponent={setComponent}
              setShowPopUp={setShowPopUp}
            />
          ) : null}
          {component === "AGENT" ? (
            <SelectAgent
              setShowPopUp={setShowPopUp}
              setComponent={setComponent}
              setDonationData={setDonationData}
              setDonation={setDonation}
              donation={donation}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export default Accept;
