import React, { useState, useContext, useEffect } from "react";
import useFetchData from "../customHooks/useFetchData.js";
import { GlobalContex } from "../context/contex.js";
import loadingSvg from "../asset/loading.svg";
import DonationListConponent from "../components/DonationListComonent.js";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../components/PaginationComponent";
import DonationListComponentMobile from "../components/DonationListComponentMobile.js";
import useUpdateDonationStatus from "../customHooks/useUpdateDonationStatus.js";

function DonationList({ setCurrentPage, donationsUrl, PageType, baseUrl }) {
  const navigate = useNavigate();
  const { notify, notificationData } = useContext(GlobalContex);
  const [donationData, setDonationData] = useState({ donations: [] });
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page");
  const [page, setPage] = useState(currentPage ? Number(currentPage) : 1);
  const { loading, data, error, fetchData } = useFetchData();
  const updateDonationStatus = useUpdateDonationStatus();
  const url = (page) => donationsUrl + `&page=${page}&limit=10`;

  useEffect(() => {
    if (!loading) setDonationData(data);
  }, [loading]);

  useEffect(() => {
    notify(error, "error");
  }, [error]);

  useEffect(() => {
    fetchData(url(page));
    if (currentPage) navigate(baseUrl);
  }, [page]);

  //// only form status page
  //// if we got notification and the in the notificationdata
  //// the present donationData donation exist then chande the status of the donation
  useEffect(() => {
    if (donationData.donations) {
      setDonationData((preVal) => {
        return {
          ...preVal,
          donations: updateDonationStatus(donationData.donations, PageType)
        };
      });
    }
  }, [notificationData]);
  //// only form donaiton list

  return (
    <>
      <header className=" sticky top-0  left-0 pt-4  px-4 shadow-xl   border-b-4  flex justify-between items-center  bg-blue-50  dark:bg-gray-800  border-blue-300    dark:border-gray-500 ">
        <h1 className="   text-xl md:text-2xl mb-3 font-semibold  text-blue-500   dark:text-white">
          {PageType}
        </h1>
      </header>
      <div className="px-4">
        {/* destop view */}
        <div className="hidden md:block mt-4">
          <table className="   w-full  mt-4">
            {donationData.donations &&
            Object.keys(donationData.donations).length > 1 ? (
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
                      page={page}
                      path={baseUrl}
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
        {/* desk top view end */}
        {/* mobile view  */}
        <div className=" block md:hidden mt-4">
          {loading
            ? null
            : donationData.donations &&
              donationData.donations.map((donation) => (
                <DonationListComponentMobile
                  key={donation._id}
                  donation={donation}
                  redirectPath={baseUrl}
                  setCurrentPage={setCurrentPage}
                  page={page}
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
      <PaginationComponent
        loading={loading}
        page={page}
        nextPage={donationData.next}
        setPage={setPage}
      />
      {/* page end */}
    </>
  );
}

export default DonationList;
