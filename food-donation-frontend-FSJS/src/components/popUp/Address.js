import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContex } from "../../context/contex";
import loadingSvg from "../../asset/loading.svg";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer
} from "@react-google-maps/api";

function Address({ setShowAddress, data, setData = "", type = "" }) {
  /** @type React.MutableRefObject<HTMLInputElement> */
  const searchRef = useRef(null);
  const { userData, notify } = useContext(GlobalContex);
  const [map, setMap] = useState(null);
  const [currentlocationLoading, setCurrentLocationLoading] = useState(false);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [center, setCenter] = useState({
    lat: 28.7041,
    lng: 77.1025
  });
  const [address, setAddress] = useState(data ? data : "");
  const [from, setFrom] = useState("");

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_URL_GOOGLE_API_KEY,
    libraries: ["places"]
  });

  useEffect(() => {
    // console.log(data.address);
    if (type === "ADDRESS" && data) handleSearch(data);
  }, [isLoaded]);

  ///  load current location
  async function loadCurrentLocation() {
    setCurrentLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (e) => {
        setCurrentLocationLoading(false);
        setCenter({
          lat: parseFloat(e.coords.latitude),
          lng: parseFloat(e.coords.longitude)
        });
        getAddress(
          parseFloat(e.coords.latitude),
          parseFloat(e.coords.longitude)
        );
      },
      (error) => {
        setCurrentLocationLoading(false);
        setCenter({ lat: parseFloat(28.7041), lng: parseFloat(77.1025) });
        notify("enable to get your location", "error");
      }
    );
  }

  function handleLocation() {
    if (type === "ADDRESS") {
      loadCurrentLocation();
      map.panTo(center);
    } else {
      loadCurrentLocation();

      calculateRoute();
    }
  }

  async function calculateRoute() {
    setCurrentLocationLoading(true);

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: from,
      destination: data,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    });
    if (results) {
      setDirectionsResponse(results);
      setCurrentLocationLoading(false);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    }
  }

  ///  handle search
  function handleSearch(address) {
    if (!isLoaded) return;
    // eslint-disable-next-line no-undef
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function (results, status) {
      // eslint-disable-next-line no-undef
      if (status === google.maps.GeocoderStatus.OK) {
        setCenter({
          lat: parseFloat(results[0].geometry.location.lat()),
          lng: parseFloat(results[0].geometry.location.lng())
        });
        getAddress(
          parseFloat(results[0].geometry.location.lat()),
          parseFloat(results[0].geometry.location.lng())
        );
      } else {
      }
    });
  }

  /// handle get address from lat , lng
  function getAddress(myLatitude, myLongitude) {
    if (!isLoaded) return;
    // eslint-disable-next-line no-undef
    var geocoder = new google.maps.Geocoder(); // create a geocoder object
    // eslint-disable-next-line no-undef
    var location = new google.maps.LatLng(myLatitude, myLongitude); // turn coordinates into an object
    geocoder.geocode({ latLng: location }, function (results, status) {
      // eslint-disable-next-line no-undef
      if (status == google.maps.GeocoderStatus.OK) {
        setAddress(results[0].formatted_address); // if address found, pass to processing function
        setFrom(results[0].formatted_address);
      } else {
        alert("Geocode failure: " + status); // alert any other error(s)
        return false;
      }
    });
  }

  return (
    <>
      <div
        id="popup-modal"
        tabIndex="-1"
        className="fixed top-0 left-0 right-0 z-50  bg-[#000000c7] flex  justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0  h-full"
      >
        <div className="relative    w-full md:w-fit  md:h-auto shadow-2xl">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* popuo close button */}
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
              onClick={() => {
                setShowAddress(false);
                setAddress("");
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
            {/* popuo close button  end*/}

            <div className=" md:p-6   p-1">
              {/* address  display */}
              <div className="md:w-[50rem] md:mt-0 mt-4 ">
                {type === "ADDRESS" ? (
                  <p className=" text-gray-700 dark:text-white font-semibold">
                    Address :{" "}
                    <span className=" font-medium   text-gray-600 dark:text-gray-300">
                      {address}
                    </span>
                  </p>
                ) : (
                  <>
                    <p className=" text-gray-700 dark:text-white font-semibold">
                      From :
                      <span className=" font-medium   text-gray-600 dark:text-gray-300">
                        {from}
                      </span>
                    </p>
                    <p className=" text-gray-700 dark:text-white font-semibold">
                      To :
                      <span className=" font-medium   text-gray-600 dark:text-gray-300">
                        {data}
                      </span>
                    </p>{" "}
                    <p className=" text-gray-700 dark:text-white font-semibold">
                      distance:{" "}
                      <span className=" font-medium   text-gray-600 dark:text-gray-300">
                        {distance}
                      </span>
                    </p>
                    <p className=" text-gray-700 dark:text-white font-semibold">
                      duration:{" "}
                      <span className=" font-medium   text-gray-600 dark:text-gray-300">
                        {duration}
                      </span>
                    </p>
                  </>
                )}
              </div>
              {/* address display end */}
              {/* map */}
              <div className=" md:my-8  my-4 md:w-[50rem] w-full relative ">
                {!isLoaded ? (
                  <div className="flex items-center justify-center ">
                    <img src={loadingSvg} alt="loading" className="h-40 w-40" />
                  </div>
                ) : (
                  <>
                    <GoogleMap
                      mapContainerStyle={{
                        width: "100%",
                        height: "400px"
                      }}
                      center={center}
                      zoom={12}
                      onLoad={(map) => setMap(map)}
                      options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false
                      }}
                    >
                      <Marker
                        position={center}
                        draggable={true}
                        onDragEnd={(e) =>
                          getAddress(e.latLng.lat(), e.latLng.lng())
                        }
                      />
                      {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                      )}
                    </GoogleMap>

                    {type === "ADDRESS" ? (
                      <Autocomplete
                        onPlaceChanged={() =>
                          handleSearch(searchRef.current.value)
                        }
                      >
                        {/* search  */}
                        <div className="flex items-center     absolute  top-0 left-0 bg-white rounded-br-lg  dark:bg-gray-700 p-1">
                          <label htmlFor="simple-search" className="sr-only">
                            Search
                          </label>
                          <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                            <input
                              type="text"
                              id="simple-search"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Search"
                              ref={searchRef}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              handleSearch(searchRef.current.value);
                            }}
                            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              ></path>
                            </svg>
                            <span className="sr-only">Search</span>
                          </button>
                        </div>
                        {/* search  */}
                      </Autocomplete>
                    ) : null}
                    {/* current location */}
                    <div
                      className="absolute bottom-8 right-4  text-blue-600 h-8 w-8 rounded-full hover:bg-blue-500 hover:text-white items-center flex justify-center"
                      onClick={() => {
                        handleLocation();
                      }}
                    >
                      {currentlocationLoading ? (
                        <svg
                          aria-hidden="true"
                          role="status"
                          className=" w-6 h-6  text-blue animate-spin"
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
                        <svg
                          className="w-6 h-6     cursor-pointer"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                          ></path>
                        </svg>
                      )}
                    </div>
                    {/* currentLocation */}
                  </>
                )}
              </div>
              {/* map */}
              {type === "ADDRESS" ? (
                <div className="flex  gap-5    flex-wrap  justify-center items-center">
                  <button
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    onClick={() => {
                      setData(address);
                      setShowAddress(false);
                      setAddress("");
                    }}
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    data-modal-toggle="popup-modal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => {
                      setShowAddress(false);
                      setAddress("");
                    }}
                  >
                    No, cancel
                  </button>
                </div>
              ) : null}
              {/* button end */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Address;
