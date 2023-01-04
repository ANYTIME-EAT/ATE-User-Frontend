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
                    type="month"
                    defaultValue="2022-12"
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Choose Date"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex space-x-5  ">
                <div className="flex-1 space-y-1">
                  <Input
                    type="month"
                    defaultValue="2022-12"
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="Start time"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <Input
                    type="number"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="End time"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                placeholder="Enter the name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required={true}
              />
            </div>
            <div className="mt-4">
              
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                placeholder="Enter the email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required={true}
              />
            </div>
            <div className="mt-4">
              
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                placeholder="Enter the Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required={true}
              />
            </div>
            <div className="mt-8">
              <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                Next
              </button>
            </div>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            {/* <a href="/login" className="text-xs text-gray-500 uppercase">
              or sign in
            </a> */}
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableReservation;
