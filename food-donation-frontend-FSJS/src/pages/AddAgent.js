import React, { useRef, useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Address from "../components/popUp/Address";
import { GlobalContex } from "../context/contex";
import axios from "axios";

function AddAgent() {
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_URL;
  const { notify, TOKEN } = useContext(GlobalContex);
  const [address, setAddress] = useState("");
  const [addAgentLoading, setAddAgentLoading] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const imageInputRef = useRef(null);
  const [inputImage, setInputtImage] = useState({
    base64: "",
    file: ""
  });
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      setInputtImage((preVal) => {
        return {
          ...preVal,
          base64: reader.result
        };
      });
    },
    false
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputImage.file) return notify("profile image is required", "warning");
    setAddAgentLoading(true);
    const formData = new FormData(e.target);
    formData.append("role", "AGENT");
    formData.append("profileImage", inputImage.file);

    try {
      const response = await axios({
        url: URL + "/api/user",
        method: "post",
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + TOKEN.token
        },
        data: formData
      });
      if (response.data.success) {
        setAddAgentLoading(false);
        navigate("/agents/" + response.data.data._id);
      }
    } catch (error) {
      setAddAgentLoading(false);
      return notify(error.response.data.message, "error");
    }
  }

  return (
    <div className="flex  h-full md:gap-1 ">
      <Sidebar />
      <div className="scroll  relative h-full flex-1  bg-blue-50  dark:bg-gray-800 overflow-scroll">
        <header className="   sticky top-0 left-0 pt-4  px-4 border-b-4 bg-blue-50 z-10  dark:bg-gray-800 border-blue-300  dark:border-gray-500 ">
          <h1 className="md:text-2xl mb-3 font-semibold  text-blue-500   dark:text-white">
            Add agent
          </h1>
        </header>
        <div className="flex  w-full  justify-center items-center">
          <form
            className="flex flex-col gap-3   mb-8"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {/* profile image */}
            <div className=" flex items-center justify-center">
              <div className="relative w-fit ">
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
            </div>

            {/* profile image  end*/}
            {/* name */}
            <div className="flex gap-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className=" bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="First Name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
            {/* name end */}
            <div className=" flex gap-2">
              {/* phone */}
              <div>
                <label
                  htmlFor="phoneNo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  phoneNo
                </label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="0000000000"
                  id="phoneNo"
                  name="phoneNo"
                  minLength="10"
                  maxLength="10"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              {/* phone end */}
              {/* email   */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email Id
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter Your Email Id"
                  required
                />
              </div>
              {/* email end */}
            </div>
            {/* address  */}
            <div className="mb-3  gap-4">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <textarea
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onClick={() => setShowAddress(true)}
              />
            </div>
            {/* address end */}
            {/* password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter Password"
                required
                maxLength="8"
                minLength="8"
              />
            </div>
            {/* password */}
            {/* comform password */}
            <div>
              <label
                htmlFor="confirmPass"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPass"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter confirm Password"
                required
                maxLength="8"
                minLength="8"
                autoComplete="off"
              />
            </div>
            {/* comform password  end*/}

            {/* submit button */}
            <button
              type="submit"
              className="w-full  flex   justify-center text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add Agent
              {addAgentLoading ? (
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
            {/* submit button end */}
          </form>
        </div>
        {/* address */}
        {showAddress ? (
          <Address
            setData={setAddress}
            data={address}
            setShowAddress={setShowAddress}
            type="ADDRESS"
          />
        ) : null}
        {/* /// image input hidden */}
        <input
          type="file"
          ref={imageInputRef}
          className="hidden"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => {
            setInputtImage((preVal) => {
              return {
                ...preVal,
                file: e.target.files[0]
              };
            });
            reader.readAsDataURL(e.target.files[0]);
          }}
        />
      </div>
    </div>
  );
}

export default AddAgent;
