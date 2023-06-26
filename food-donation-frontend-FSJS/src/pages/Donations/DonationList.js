import React, { useState, useContext, useEffect } from "react";
import useFetchData from "../../customHooks/useFetchData";
import { GlobalContex } from "../../context/contex";
import loadingSvg from "../../asset/loading.svg";
import DonationListConponent from "../../components/DonationListComonent.js";
import DonationListComponentMobile from "../../components/DonationListComponentMobile";
import Filter from "../../components/popUp/Filter.js";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useUpdateDonationStatus from "../../customHooks/useUpdateDonationStatus";

function DonationList({ setCurrentPage }) {
  const [donationData, setDonationData] = useState({ donations: [] });
  const navigate = useNavigate();
  const { notify, filter, setfilter, userData, notificationData } =
    useContext(GlobalContex);
  const URL = process.env.REACT_APP_URL;
  const updateDonationStatus = useUpdateDonationStatus();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page");

  const url = (page) =>
    `${URL}/api/donations?donorId=${
      userData.role === "DONOR" ? userData._id : ""
    }&agentId=${userData.role === "AGENT" ? userData._id : ""}&from=${
      filter.from
    }&to=${filter.to}&status=${
      filter.status === "ALL" ? "" : filter.status
    }&page=${page}&limit=10`;

  const { loading, data, error, fetchData } = useFetchData();

  useEffect(() => {
    if (!loading) setDonationData(data);
  }, [loading]);

  useEffect(() => {
    notify(error, "error");
  }, [error]);

  ////  if  pagen no is presend tin query the fetch the data base on thet page no.
  //// else fetch on the base of filter.page , on component load first time
  useEffect(() => {
    if (currentPage) {
      fetchData(url(currentPage));
      setfilter((preVal) => {
        return { ...preVal, page: Number(currentPage) };
      });
    } else fetchData(url(filter.page));
  }, []);

  ////  fetch the data base on filter
  useEffect(() => {
    fetchData(url(filter.page));
  }, [filter]);

  //// if we got notification and the in the notificationdata
  //// the present donationData donation exist then chande the status of the donation
  useEffect(() => {
    if (donationData.donations) {
      setDonationData((preVal) => {
        return {
          ...preVal,
          donations: updateDonationStatus(donationData.donations)
        };
      });
    }
  }, [notificationData]);

  // console.log("donations", donationData.donations);

  return (
    <>
      {/* header */}
      <header className="  top-0  left-0 pt-4  px-4 shadow-xl   border-b-4  flex justify-between items-center bg-blue-50  dark:bg-gray-800   border-blue-300  dark:border-gray-500 ">
        <h1 className="   text-xl md:text-2xl mb-3 font-semibold  text-blue-500   dark:text-white">
          Donations
        </h1>
        <Filter />
      </header>
      {/* header end */}
      <div className="px-4 mb-20">
        {/* destack view */}
        <div className="hidden md:block mt-4 ">
          <table className="   w-full   ">
            {donationData.donations &&
            Object.keys(donationData.donations).length > 0 ? (
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full shadow-xl">
                <tr>
                  <th scope="col" className="px-6 py-3  text-start  ">
                    Donor
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Action
                  </th>
                </tr>
              </thead>
            ) : null}
            <tbody className="w-full">
              {loading
                ? null
                : donationData.donations &&
                  donationData.donations.map((donation) => (
                    <DonationListConponent
                      key={donation._id}
                      donation={donation}
                      setCurrentPage={setCurrentPage}
                      page={filter.page}
                      path="/donations"
                    />
                  ))}
            </tbody>
          </table>
          {!loading &&
          donationData.donations &&
          Object.keys(donationData.donations).length < 1 ? (
            <div className=" w-full text-center mt-6">
              <p className="   text-blue-500  opacity-50   font-bold text-4xl">
                Donate Food
              </p>
            </div>
          ) : null}
        </div>
        {/* destack view  end*/}

        {/* mobile view  */}
        <div className=" block md:hidden mt-4">
          {loading
            ? null
            : donationData.donations &&
              donationData.donations.map((donation) => (
                <DonationListComponentMobile
                  key={donation._id}
                  donation={donation}
                  redirectPath="/donations"
                  setCurrentPage={setCurrentPage}
                  page={filter.page}
                />
              ))}
        </div>
        {/* mobile view  end */}
      </div>
      {loading ? (
        <div className="  top-0   left-0  absolute w-full  items-center flex justify-center  h-full">
          <img src={loadingSvg} />
        </div>
      ) : null}
      {/* page  */}
      <div className="  fixed bottom-5   right-5 flex gap-5   items-center h-11   justify-center  w-40">
        <button
          type="button"
          onClick={() => {
            currentPage && navigate("/dashboard");
            fetchData(url(filter.page - 1));
            setfilter((preVal) => {
              return { ...preVal, page: preVal.page - 1 };
            });
          }}
          disabled={loading || filter.page <= 1}
          className={
            filter.page > 1
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
            filter.page
          )}
        </div>
        <button
          onClick={() => {
            currentPage && navigate("/dashboard");
            fetchData(url(filter.page + 1));
            setfilter((preVal) => {
              return { ...preVal, page: preVal.page + 1 };
            });
          }}
          type="button"
          disabled={loading || !donationData.next}
          className={
            donationData.next
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
    </>
  );
}

export default DonationList;
