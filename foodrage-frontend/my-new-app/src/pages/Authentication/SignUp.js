import React, { useState, useContext } from "react";
import axios from "axios";
import { GlobalContex } from "../../context/contex.js";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar.js";
function SignUp() {
  const navigate = useNavigate();
  const { notify } = useContext(GlobalContex);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const URL = process.env.REACT_APP_URL;
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    try {
      const response = await axios({
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        url: URL + "/api/auth/signup",
        data: formData
      });
      if (response.data.success) {
        navigate("/sign_in");
      }
    } catch (error) {
      console.log(error);
      setSignUpLoading(false);
      notify(error.response.data.message, "error");
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-blue-50  dark:bg-gray-800">
      <div className="md:hidden bolck h-full">
        <Sidebar />
      </div>
      {/* <!-- Modal content --> */}
      <div className="rounded-lg shadow-2xl h-fit  m-4  w-full md:w-[25rem] p-4 bg-white border border-gray-200 sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-2 py-2 lg:px-2">
          <div className="mb-6">
            <h2 className="mb-2  text-blue-700 text-2xl  font-semibold text-center">
              Sign up
            </h2>
          </div>
          {/* form */}
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
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

            <button
              type="submit"
              className="w-full  flex   justify-center text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign Up
              {signUpLoading ? (
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
          </form>
          {/* form end */}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
