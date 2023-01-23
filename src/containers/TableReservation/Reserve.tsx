import React, { FC, useState, useEffect } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link, useParams } from "react-router-dom";
import { userRegister } from "services/authServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgLogin from "images/bgLogin1.png";
import { useNavigate } from "react-router-dom";
import { tableReservationAPI } from "services/apiServices";
import { useLocation } from "react-router-dom";
import Select from "react-tailwindcss-select";

export interface TableReservationProps {
  className?: string;
}

const Reserve: FC<TableReservationProps> = ({ className = "" }) => {
  const [tableIds, setTableIds] = useState<any>([]);
  const [guestsCount, setGuestsCount] = useState<number>(0);
  const [animal, setAnimal] = useState<any>([]);
  const [userId, setUserId] = useState<string>("");
  const [note, setNote] = useState<string>("");

  // const [guestsCount, setGuestsCount] = useState<any>("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const options: {
    value: string;
    label: string;
  }[] = [
    { value: "table_id", label: "1" },
    { value: "table_id1", label: "4" },
    { value: "table_id2", label: "5" },
  ];

  const handleChange = (value: any) => {
    console.log("value:", value);
    setAnimal(value);
  };

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

  const routeChange = () => {
    let path = "/tableReservation";
    navigate(path);
  };
  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("user-info") || "{}").id);
    console.log(userId);
  }, []);

  useEffect(() => {
    if (state?.data) {
      console.log("state data88888888888", state?.data);
      handleReservation();
    }
  }, []);

  const handleReservation = async () => {
    const data = {
      reservation_date: state.data.reservation_date,
      reservation_from: state.data.reservation_from,
      reservation_to: state.data.reservation_to,
      table_ids: animal,
      guests_count: guestsCount as Number,
      user_id: userId,
      note:note
    };
    console.log("777777777777777777777", id);
    const response = await tableReservationAPI(data, id);
    console.log("table reservation data", response);
    if (response.data) {
      if (response.data.response === "success") {
        console.log("REservation done pass data", data);
        navigate("/reservationDone", { state: { data: data } });
      } else {
        console.log("Reservation failure");
      }
    }
  };

  const handleNumber = (event: { target: { value: number } }) => {
    const result = Number(event.target.value);
    setGuestsCount(result);
    console.log("6666666666666666666", Number(guestsCount));
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
            }}
          >
            <div className="mt-4">
              <div className="flex space-x-5  ">
                <div className="flex-1 space-y-1">
                  <Input
                    type="number"
                    defaultValue="set guests"
                    value={guestsCount}
                    onChange={(e) => {
                      setGuestsCount(Number(e.target.value));
                    }}
                    className="block w-full border-red-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 bg-white dark:border-red-700 dark:focus:ring-red-6000 dark:focus:ring-opacity-25 dark:bg-red-900"
                    placeholder="Choose Guests"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex space-x-5 border-red-200 focus:border-red-300 ">
                <div className="flex-1 space-y-1">
                  <Select
                    value={animal}
                    onChange={handleChange}
                    options={options}
                    isMultiple={true}
                    primaryColor="red"
                    classNames={{
                      menuButton: ({ isDisabled }) =>
                        `flex text-sm text-red-500 border border-red-300 shadow-sm transition-all duration-300 focus:outline-none 
                          rounded-2xl h-11 px-4
                          ${
                            isDisabled
                              ? "bg-gray-200"
                              : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                          }`,
                      menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                      listItem: ({ isSelected }) =>
                        `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                          isSelected
                            ? `text-white bg-blue-500`
                            : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                        }`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex space-x-5 border-red-200 focus:border-red-300 ">
                <div className="flex-1 space-y-1">
                  <textarea className="leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-500 focus:outline-none focus:bg-white
                    flex text-sm text-grey-500 border border-red-300 shadow-sm transition-all duration-300 rounded-2xl"
                    name="body"
                    placeholder="Write your note here"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* <div className="w-full md:w-full px-3 mb-2 mt-2">
            <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required></textarea>
            </div> */}

            <div className="mt-4 ml-2 mr-0 md:ml-4 xs:ml-0">
              <button
                type="button"
                onClick={routeChange}
                className="bg-red-800 text-white rounded-l-md border-r border-red-100 py-2
                 hover:bg-red-700 hover:text-white"
              >
                <div className="flex flex-row align-middle">
                  <svg
                    className="w-5 mr-2 ml-1"
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
                  <p className="ml-1 pr-2">Previous</p>
                </div>
              </button>

              <button
                type="button"
                onClick={handleReservation}
                className="bg-red-800 text-white rounded-r-md border-l border-red-100 py-2
                 hover:bg-red-700 hover:text-white ml-20 xs:ml-10 md:ml-26"
              >
                <div className="flex flex-row align-middle">
                  <svg
                    className="w-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <p className="ml-1 pr-2">Reserve</p>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
