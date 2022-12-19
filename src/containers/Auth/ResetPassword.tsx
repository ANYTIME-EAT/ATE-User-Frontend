import { FC } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi, loginApi, resetPasswordApi } from "services/authServices";
import { toSafeInteger } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface ResetPasswordProps {
  className?: string;
  
}
const ResetPasswordPage: FC<ResetPasswordProps> = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [token, setToken] = useState("");
  const [allData, setAllData] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  // const token=useParams();

  console.log(id);

  const handleSubmit = async () => {
    var data = {
      token:id,
      password:password,
      confPassword:confPassword
    };

    const response = await resetPasswordApi(data);
    console.log(response);
    if (response.data) {
      if (response.data === "success") {
        console.log(response.data);
        setAllData(response)
              // navigate("/user/reset_password/${token}");
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    console.log(response.data);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#" 
          onSubmit={(e) => {
              e.preventDefault();
             handleSubmit()
            }}>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={confPassword}
                onChange={(e)=>{setConfPassword(e.target.value)}}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            
            <button
              type="submit"
              disabled={!password || !confPassword || password!==confPassword}
              className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-primary-800"
            >
              Reset passwod
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
function handleApi() {
  throw new Error("Function not implemented.");
}
