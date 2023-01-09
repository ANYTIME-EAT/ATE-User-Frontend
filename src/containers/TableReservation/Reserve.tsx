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

const Reserve: FC<TableReservationProps> = ({ className = "" }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [guests, setGuests] = useState<string>("");
  const [chooseSlots, setChooseSlots] = useState<string>("");
  const [chooseSeats, setChooseSeats] = useState<string>("");
  

  const navigate = useNavigate();

  const SLOTS = [
    {
      tableNo: 1,
      totlalSeats: 4,
      type: "round",
      bookingSeats: 2,
    },
    {
      tableNo: 2,
      totlalSeats: 5,
      type: "round",
      bookingSeats: 2,
    },
    {
      tableNo: 3,
      totlalSeats: 6,
      type: "square",
      bookingSeats: 5,
    },
    {
      tableNo: 4,
      totlalSeats: 4,
      type: "square",
      bookingSeats: 3,
    },
    {
      tableNo: 5,
      totlalSeats: 4,
      type: "round",
      bookingSeats: 3,
    },
  ];

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
    let path = "/tableReservation";
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
            <div className="mt-4">
              <div className="flex space-x-5  ">
                <div className="flex-1 space-y-1">
                  <Input
                    type="number"
                    defaultValue="set guests"
                    onChange={(e) => setGuests(e.target.value)}
                    className="block w-full border-red-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 bg-white dark:border-red-700 dark:focus:ring-red-6000 dark:focus:ring-opacity-25 dark:bg-red-900"
                    placeholder="Choose Guests"
                  />
                </div>
              </div>
            </div>
            {/* <div className="mt-4">
              <div className="flex space-x-5  ">
                <div className="flex-1 space-y-1">
                  <select
                    defaultValue="chooseSlots"
                    className="block w-full border-red-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 bg-white dark:border-red-700 dark:focus:ring-red-6000 dark:focus:ring-opacity-25 dark:bg-red-900"
                    value={chooseSlots}
                    onChange={(e) => setChooseSlots(e.target.value)}
                  >
                    {SLOTS.map((item: any, key: number) => {
                      return [
                        <option value={item.No}>
                          {item.totlalSeats}
                          {" Person Table"}
                        </option>, 
                      ];
                    })}
                    <select
                    defaultValue="choose seats"
                    className="block w-full border-red-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 bg-white dark:border-red-700 dark:focus:ring-red-6000 dark:focus:ring-opacity-25 dark:bg-red-900"
                    value={chooseSeats}
                    onChange={(e) => setChooseSeats(e.target.value)}
                  >
                    {SLOTS.map((item: any, key: number) => {
                      return [
                        <option value={item.No}>
                          {item.bookingSeats}
                          {" Seats"}
                        </option>,
                      ];
                    })}
                  </select>
                  </select>
                </div>
              </div>
            </div> */}
            
            {/* <div className="mt-4">
              <div className="flex space-x-5  ">
                <div className="flex-1 space-y-1">
                  <ul className="dropdown-content absolute hidden text-gray-700 pt-1">
                    <li>
                      {SLOTS.map((item: any, key: number) => {
                        return [
                          <option value={item.No}>
                            {item.totlalSeats}
                            {" Person Table"}
                          </option>,
                        ];
                      })}
                      <ul className="dropdown-content absolute hidden text-gray-700 pl-5 ml-24 -mt-10">
                        <li>
                          {SLOTS.map((item: any, key: number) => {
                            return [
                              <option value={item.No}>
                                {item.bookingSeats}
                                {" seats"}
                              </option>,
                            ];
                          })}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}

            
<button id="multiLevelDropdownButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>

<div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="multiLevelDropdownButton">
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <button id="doubleDropdownButton" data-dropdown-toggle="doubleDropdown" data-dropdown-placement="right-start" type="button" className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dropdown<svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></button>
          <div id="doubleDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Overview</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My downloads</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Billing</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Rewards</a>
              </li>
            </ul>
        </div>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
      </li>
    </ul>
</div>


            <div className="mt-4">
              <button
                type="button"
                onClick={routeChange}
                className="bg-red-800 text-white rounded-l-md border-r border-red-100 py-2 hover:bg-red-700 hover:text-white px-3"
              >
                <div className="flex flex-row align-middle">
                  <svg
                    className="w-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <p className="ml-2">Previous</p>
                </div>
              </button>
              <button
                type="button"
                onClick={routeChange}
                className="bg-red-800 text-white rounded-l-md border-r border-red-100 py-2 hover:bg-red-700 hover:text-white px-3 ml-20"
              >
                <div className="flex flex-row align-middle">
                  <svg
                    className="w-2 mr-2"
                    // fill="currentColor"
                    viewBox="0 0 20 20"
                    // xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* <path
                      fill-rule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clip-rule="evenodd"
                    ></path> */}
                  </svg>
                  <p className="ml-2">Reserve Now</p>
                </div>
              </button>
              {/* <button
                type="button"
                className="bg-red-800 text-white rounded-r-md py-2 border-l border-red-200 hover:bg-red-700 hover:text-white px-2 text-center ml-20 mr-2 mt-0"
              >
                <div className="flex flex-row align-middle">
                  <span className="ml-10">Reserve Now</span>
                </div>
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
