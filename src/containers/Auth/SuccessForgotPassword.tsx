import { FC } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi, loginApi } from "services/authServices";
import { toSafeInteger } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface ForgotPasswordProps {
  className?: string;
}
const ForgotPasswordSuccessPage: FC<ForgotPasswordProps> = ({ className = "" }) => {
 

  return (
    <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Success
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Check your email for a reset link
        
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordSuccessPage;
function handleApi() {
  throw new Error("Function not implemented.");
}
