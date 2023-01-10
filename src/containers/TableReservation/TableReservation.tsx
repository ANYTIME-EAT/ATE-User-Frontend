import React, { FC, useState, useEffect } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import { userRegister } from "services/authServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgLogin from "images/bgLogin1.png";
import { useNavigate } from "react-router-dom";

export interface TableReservationProps {
  className?: string;
}

const TableReservation: FC<TableReservationProps> = ({ className = "" }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
 

  const navigate = useNavigate();

  const handleApi = async () => {
    const isValidPassword = passwordValidation(password, confirmPassword);
    if (isValidPassword) {
      const data = {
        name: name,
        address: address,
        authority: { role: ["user"] },
        phone_no: phone,
        email: email,
        password: password,
        signedIn: false,
      };

      const response = await userRegister(data);
      if (response.data) {
        if (response.data.response === "success") {
          toast.success("Sign Up Success", {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate("/login");
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    } else {
      toast.error("Password and confirm password not matching", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const passwordValidation = (password: string, confirmPassword: string) => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const routeChange = () => {
    let path = "/reserved";
    navigate(path);
  };

  return (
    <div className="py-6">
      <ToastContainer />
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="hidden lg:block lg:w-1/2 bg-cover bg-reservation"></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-black-500 text-center">
            MAKE A RESERVATION
          </h2>
          <p className="text-xs text-center">
            HOW FURTHER QUESTIONS,PLEASE CALL
          </p>
          <h6 className="text-lg pt-8 font-semibold text-black-500">
            S & L Dinner
          </h6>
          <p className="text-xs">189, Avenue Streat, Edinburg</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleApi();
            }}
          >
            <div className="mt-4 pt-6">
              <div className="flex space-x-5  ">
                <div className="flex-1 space-y-1">
                  <Input
                    type="date"
                    defaultValue="date"
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Choose Date"
                    className="block w-full border-red-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 bg-white dark:border-red-700 dark:focus:ring-red-6000 dark:focus:ring-opacity-25 dark:bg-red-900"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex space-x-5  ">
                <div className="flex-1 space-y-1">
                  <Input
                    type="time"
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="Start time"
                    className="block w-full border-red-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 bg-white dark:border-red-700 dark:focus:ring-red-6000 dark:focus:ring-opacity-25 dark:bg-red-900"
                  
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="End time"
                    className="block w-full border-red-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 bg-white dark:border-red-700 dark:focus:ring-red-6000 dark:focus:ring-opacity-25 dark:bg-red-900"
                  
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex space-x-5  ">
                <div className="flex-1 space-y-1">
                  <Input
                    type="text"
                    className="block w-full border-red-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 bg-white dark:border-red-700 dark:focus:ring-red-6000 dark:focus:ring-opacity-25 dark:bg-red-900"
                    placeholder="Enter the name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required={true}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 ">
              <div className="flex space-x-5  ">
                <div className="flex-1 space-y-1">
                  <Input
                    type="email"
                    className="block w-full border-red-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 bg-white dark:border-red-700 dark:focus:ring-red-6000 dark:focus:ring-opacity-25 dark:bg-red-900"
                  
                    placeholder="Enter the email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required={true}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 ">
              <div className="flex space-x-5  ">
                <div className="flex-1 space-y-1">
                  <Input
                    type="text"
                    className="block w-full border-red-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 bg-white dark:border-red-700 dark:focus:ring-red-6000 dark:focus:ring-opacity-25 dark:bg-red-900"
                  
                    placeholder="Enter the Address"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    required={true}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 mr-2">
            <button type="button" onClick={routeChange} className="bg-red-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3 text-center">
              <div className="flex flex-row align-middle">
                <span className="mr-2">Next</span>
                <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default TableReservation;
