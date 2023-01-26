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
import { useForm } from "react-hook-form";

export interface TableReservationProps {
  className?: string;
  
}

const TableReservation: FC<TableReservationProps> = ({ className = "" }) => {
  const [name, setName] = useState<string>("");
  const { id } = useParams();
  const [email, setEmail] = useState<string>("");
  const [tableIds, setTableIds] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [reservationDate, setReservationDate] = useState<string>("");
  const [reservationTo, setReservationTo] = useState<string>("");
  const [reservationFrom, setReservationFrom] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [guestsCount, setGuestsCount] = useState<string>("");
  const [items, setItems] = useState<any>([])
  const [formErrors, setFormErrors] = useState("")

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleConfirm = async () => {
    const data = await{
      reservation_date: date,
      reservation_from: startTime,
      reservation_to: endTime,
      // note:note
    };

    for(const[key,value] of Object.entries(data)){
      if(value===''){
        setFormErrors("undefined")
        return undefined
      }
    }
    navigate("/reserved/2", {state: {data: data}});
    // setItems(data)
    // setFormErrors(validate(items));
    console.log("reservation333333333333333",data)
  };
  

  const validate = (values: { date: any; startTime: any; endTime: any; }) => {
    const errors = {date,startTime,endTime};
    if (!values.date) {
      errors.date= "date is required!";
    }
    if (!values.startTime) {
      errors.startTime = "startTime is required!";
    }
    if (!values.endTime) {
      errors.endTime = "endTime is required!";
    }
    return errors;
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
              handleConfirm();
            }}
          >
            <div className="mt-4 pt-6">
              <div className="flex space-x-5  ">
                <div className="flex-1 space-y-1">
                  <Input
                    type="date"
                    // {...register('date', { required: true})}
                    defaultValue="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Choose Date"
                    className="block w-full border-red-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 bg-white dark:border-red-700 dark:focus:ring-red-6000 dark:focus:ring-opacity-25 dark:bg-red-900"
                    // ref={register({required:"this field is required"})}
                    // ref={register({ required: true })}
              />

                {/* <span className="inline-flex text-sm text-red-600"></span> */}
                {/* <p className="text-red-900">{formErrors.reservation_date}</p> */}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex space-x-5  ">
                <div className="flex-1 space-y-1">
                  <Input
                    type="datetime-local"
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="Start time"
                    value={startTime}
                    className="block w-full border-red-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 bg-white dark:border-red-700 dark:focus:ring-red-6000 dark:focus:ring-opacity-25 dark:bg-red-900"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex space-x-5  ">
                <div className="flex-1 space-y-1">
                  <Input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="End time"
                    className="block w-full border-red-200 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 bg-white dark:border-red-700 dark:focus:ring-red-6000 dark:focus:ring-opacity-25 dark:bg-red-900"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 mr-2">
            {formErrors}
              <button
                type="button"
                onClick={handleConfirm}
                className="bg-red-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3 text-center"
              >
                <div className="flex flex-row align-middle">
                  
                  <span className="mr-2">Next</span>
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
