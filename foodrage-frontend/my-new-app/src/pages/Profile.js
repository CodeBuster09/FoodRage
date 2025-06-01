import { useState, useContext, useEffect, useRef } from "react";
import { GlobalContex } from "../context/contex.js";
import { useNavigate } from "react-router-dom";
import useForgotPassword from "../customHooks/userForgotPassword.js";
import axios from "axios";
// component
//import Address from "../components/popUp/Address.js";
import Sidebar from "../components/Sidebar";
import DarkModeToggleButton from "../components/DarkModeToggleButton.js";

function Profile() {
  const URL = process.env.REACT_APP_URL;
  const imageInputRef = useRef(null);
  const navigate = useNavigate();
  const { notify, userData, setUserData, TOKEN } = useContext(GlobalContex);
  const [isEdit, setIsEdit] = useState(false);
  const [editedData, setEditedData] = useState({
    address: userData.address ? userData.address : ""
  });
  const [address, setAddress] = useState(editedData.address);
  const [showAddress, setShowAddress] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [inputImage, setInputImage] = useState({
    base64: userData.profileImage?.url ? userData.profileImage.url : "",
    file: ""
  });

  const reader = new FileReader();
  const { data, loading, error, forgot } = useForgotPassword(userData.email);
  const [reset, setReset] = useState({ data, error, loading });
  useEffect(() => {
    if (Object.keys(userData).length < 1) return navigate("/");
  }, []);

  useEffect(() => {
    if (address)
      setEditedData((preVal) => {
        return { ...preVal, address: address };
      });
  }, [address]);

  reader.addEventListener(
    "load",
    () => {
      setInputImage((preVal) => {
        return {
          ...preVal,
          base64: reader.result
        };
      });
    },
    false
  );

  useEffect(() => {
    if (error) notify(error.response.data.message, "error");
    if (data) notify(data.message, "success");
    setReset({ data, error, loading });
  }, [data, error, loading]);

  async function handleEdit(e) {
    e.preventDefault();
    setEditLoading(true);
    const formData = new FormData();
    for (const key in editedData) {
      formData.append(key, editedData[key]);
    }
    if (inputImage.file) formData.append("profileImage", inputImage.file);
    if (userData.profileImage) formData.append("imgUrl", userData.profileImage);

    try {
      setEditLoading(true);
      const response = await axios({
        method: "patch",
        url: URL + "/api/user",
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + TOKEN.token
        },
        data: formData
      });
      if (response.data.success) {
        setUserData(response.data.data);
        setIsEdit(false);
      }
      setEditLoading(false);
    } catch (error) {
      setEditLoading(false);
      notify(error.response.data.message, "error");
    }
  }

  return (
    <div className="flex  h-full md:gap-1">
      <Sidebar />
      <div className="scroll h-full relative flex-1  bg-blue-50  dark:bg-gray-800 overflow-scroll">
        <header className="md:block   sticky top-0 left-0  hidden  pt-4  px-4 border-b-4    border-blue-300  dark:border-gray-500  bg-blue-50  dark:bg-gray-800 z-10">
          <h1 className="   text-xl md:text-2xl mb-3 font-semibold  text-blue-500   dark:text-white">
            Profile
          </h1>
        </header>
        {/* profile body */}
        {isEdit ? (
          <>
            <form onSubmit={(e) => handleEdit(e)} className="p-4">
              <div className=" items-center flex   flex-col justify-center ">
                <div>
                  <div className="flex  pt-4   md:gap-10         flex-col items-center ">
                    {/* profile image */}
                    <div className="relative">
                      {inputImage.base64 ? (
                        <img
                          src={inputImage.base64}
                          className="w-44 h-44 rounded-full object-cover"
                          alt="img"
                        />
                      ) : (
                        <svg
                          className="w-48 h-48 text-gray-200 dark:text-gray-700"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                      {/* edit button */}
                      <div
                        onClick={() => imageInputRef.current.click()}
                        className="absolute text-sm bottom-5 left-[8rem]  h-9 w-9 rounded-full cursor-pointer  hover:shadow-2xl    bg-blue-200  hover:bg-blue-100 dark:bg-[#9885855d] dark:hover:bg-[#98858526] flex items-center  justify-center"
                      >
                        <svg
                          className="w-6 h-6 text-blue-500   dark:text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          ></path>
                        </svg>
                      </div>
                      {/* edit button end */}
                    </div>
                    {/* profile image  end*/}
                    <div className="md:w-fit w-full  flex  md:gap-4  gap-2  md:mt-0   mt-8 ">
                      {/* first name */}
                      <div className="mb-3    md:block">
                        <label
                          htmlFor="firstName"
                          className="md:block  mb-2   md:mr-0 mr-4 text-sm     font-semibold text-gray-800 dark:text-white flex items-center"
                        >
                          firstName
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="name@flowbite.com"
                          required
                          defaultValue={userData.firstName}
                          onChange={(e) =>
                            setEditedData((preVal) => {
                              return { ...preVal, firstName: e.target.value };
                            })
                          }
                        />
                      </div>
                      {/* firstname end */}
                      {/* lastName */}
                      <div className="mb-3    md:block">
                        <label
                          htmlFor="lastname"
                          className="md:block   md:mr-0 mr-4  flex items-center  mb-2 text-sm  font-semibold text-gray-800 dark:text-white"
                        >
                          LastName
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          defaultValue={userData.lastName}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          onChange={(e) =>
                            setEditedData((preVal) => {
                              return { ...preVal, lastName: e.target.value };
                            })
                          }
                        />
                      </div>
                      {/* lastName end */}
                    </div>
                  </div>

                  {/* phone no */}
                  <div className="mb-3    ">
                    <label
                      htmlFor="phoneNo"
                      className="block   mb-2 text-sm    font-semibold text-gray-800 dark:text-white"
                    >
                      PhoneNo
                    </label>
                    <input
                      type="tel"
                      pattern="[0-9]{10}"
                      placeholder="0000000000"
                      id="phoneNo"
                      className="md:w-fit  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      maxLength="10"
                      minLength="10"
                      defaultValue={userData.phoneNo}
                      onChange={(e) =>
                        setEditedData((preVal) => {
                          return { ...preVal, phoneNo: e.target.value };
                        })
                      }
                    />
                  </div>
                  {/* phone no  end */}
                  {/* address  */}
                  <div className="mb-3  ">
                    <label
                      htmlFor="address"
                      className="block   mb-2 text-sm     font-semibold text-gray-800 dark:text-white"
                    >
                      Address
                    </label>
                    <textarea
                      type="text"
                      id="address"
                      value={editedData.address}
                      onChange={(e) =>
                        setEditedData((preVal) => {
                          return { ...preVal, address: e.target.value };
                        })
                      }
                      setEditedData
                      className="  md:max-w-lg  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                     // onClick={() => setShowAddress(true)}
                    />
                  </div>
                  {/* address end */}
                </div>
              </div>
              {/* password  reset password */}
              <div className="mb-3 flex items-center gap-4  flex-col ">
                <label
                  htmlFor="lastname"
                  className="md:block   md:mr-0 mr-4  flex items-center  mb-2 text-sm  md:text-lg font-semibold text-gray-800 dark:text-white"
                >
                  click here to send the reset password instructions on your
                  email
                </label>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => forgot()}
                >
                  resetPassword
                  {reset.loading ? (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline ml-3 w-4 h-4 text-white animate-spin"
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
                  ) : null}
                </button>
              </div>
              {/* password  reset password */}
              {/* cancle  save button  */}
              <div className=" flex  w-full justify-end mt-4  md:mt-20">
                <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => {
                    setIsEdit(false);
                    setEditedData({
                      address: userData.address ? userData.address : ""
                    });
                    setInputImage({
                      base64: userData.profileImage.url
                        ? userData.profileImage.url
                        : "",
                      file: ""
                    });
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Update
                  {editLoading ? (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline ml-3 w-4 h-4 text-white animate-spin"
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
                  ) : null}
                </button>
              </div>
              {/* cancle  save button  */}
            </form>
{/*{showAddress ? (
              <Address
                setData={setAddress}
                data={address}
                setShowAddress={setShowAddress}
                type="ADDRESS"
              />
            ) : null}*/}
          </>
        ) : (
          // userInfo
          <div className="p-4">
            <div className="relative flex justify-center items-center flex-col md:mt-4 ">
              {/* edit butotn */}
              <div
                className="absolute   right-8  md:top-6  top-3   h-9 w-9 rounded-full cursor-pointer  hover:shadow-2xl hover:bg-[#98858526] flex items-center  justify-center"
                onClick={() => setIsEdit(true)}
              >
                <svg
                  className="w-6 h-6 text-blue-500   dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
              </div>
              {/* edit butotn  end*/}

              {/* profile image */}
              <div className="relative">
                {userData.profileImage?.url ? (
                  <img
                    src={userData.profileImage.url}
                    className="w-44 h-44 rounded-full object-cover"
                    alt="img"
                  />
                ) : (
                  <svg
                    className="w-40 h-40 text-gray-200 dark:text-gray-700"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
                <p className="absolute text-sm bottom-5 left-24 h-6 w-[4rem] flex items-center justify-center bg-blue-500  text-white font-semibold rounded-3xl">
                  {userData.role}
                </p>
              </div>
              {/* profile image  end*/}

              {/* name email */}
              <div className="text-center  ">
                <p className="text-xl text-blue-500    font-semibold  dark:text-gray-100">
                  {" "}
                  {userData.firstName + " " + userData.lastName}
                </p>
                <p className="text-blue-500   dark:text-gray-300">
                  {userData.email}
                </p>
              </div>
              {/* name email end */}
            </div>

            <div className="mt-12  max-w-3xl">
              <h1 className="text-xl md:text-xl mb-3 font-semibold  text-blue-500   dark:text-white flex gap-2">
                PhoneNo :{" "}
                <span className="text-lg  font-semibold text-gray-500">
                  {userData.phoneNo}
                </span>
              </h1>
              <div className="text-xl md:text-xl mb-3 font-semibold  text-blue-500   dark:text-white flex item gap-2 ">
                Address:{" "}
                <span className="text-lg  font-semibold text-gray-500">
                  {userData.address}
                </span>
              </div>
              <h1 className="text-xl md:text-xl mb-3 font-semibold  text-blue-500   dark:text-white gap-2 flex">
                Password :
                <span className="text-lg  font-semibold text-gray-500">
                  {" "}
                  xxxxxxxx
                </span>
              </h1>
              {/* <h1 className=" md:hidden text-xl md:text-xl mb-3 font-semibold  text-blue-500   dark:text-white">
                Theme :
                <DarkModeToggleButton />
              </h1> */}
            </div>
          </div>
          // userInfo end
        )}
      </div>
      {/* /// image input hidden */}
      <input
        type="file"
        ref={imageInputRef}
        className="hidden"
        accept=".png, .jpg, .jpeg"
        onChange={(e) => {
          setInputImage((preVal) => {
            return {
              ...preVal,
              file: e.target.files[0]
            };
          });
          reader.readAsDataURL(e.target.files[0]);
        }}
      />
    </div>
  );
}
export default Profile;
