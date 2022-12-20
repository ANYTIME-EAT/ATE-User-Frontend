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
const ForgotPasswordPage: FC<ForgotPasswordProps> = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [forgotPassword, setForgotPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    var data = {
      email: email,
    };
    const response = await forgotPasswordApi(data);
    console.log(response);
    if (response.data) {
      if (response.data === "success") {
        console.log(response.data);
        // setForgotPassword(data)

        navigate("/");
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    console.log(response.data);
  };

  return (
    <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <a
                className="text-blue-600 decoration-2 hover:underline font-medium"
                href="#"
              >
                Login here
              </a>
            </p>
          </div>

          <div className="mt-5">
            <form  onSubmit={(e) => {
              e.preventDefault();
             handleSubmit()
            }}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      aria-describedby="email-error"
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                    />
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                <button
                  type="submit"
                  
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
function handleApi() {
  throw new Error("Function not implemented.");
}
