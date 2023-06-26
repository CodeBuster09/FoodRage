function AcceptDonation({ setShowPopUp, setComponent }) {
  return (
    <div className="relative w-full m-1 md:w-fit  md:h-auto shadow-2xl">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        {/* close button */}
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
        {/* close button */}
        <div className="p-6 text-center ">
          <p className="mx-auto mb-4 text-gray-400   text-5xl dark:text-gray-200">
            🤝
          </p>

          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to Accepte this donation?
          </h3>
          <div className="flex  gap-5    flex-wrap  justify-center items-center">
            <button
              type="button"
              className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              onClick={() => {
                setComponent("AGENT");
              }}
            >
              Yes, I'm sure
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
  );
}

export default AcceptDonation;
