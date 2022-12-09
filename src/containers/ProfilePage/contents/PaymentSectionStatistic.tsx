import React, { FC, useEffect, useState } from "react";
import Heading from "components/Heading/Heading";
import { getAllPaymentAPI, paymentCardAPI } from "services/apiServices";
import Modal from "../components/Modal";
import "react-credit-cards/es/styles-compiled.css";

export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

export interface SectionStatisticProps {
  className?: string;
}

const PaymentSectionStatistic: FC<SectionStatisticProps> = ({
  className = "",
}) => {
  const [paymentCards, setPaymentCards] = useState<any>([]);
  const [showModel, setShowModel] = useState(false);
  const [cardId, setCardId] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [name, setName] = useState("");
  const [cvc, setCvc] = useState("");
  const [expDate, setExpDate] = useState("");
  const [card_no, setCard_no] = useState("");
  

  //get user payments
  const getAllPaymentData = async () => {
    const response = await getAllPaymentAPI(4);
    console.log(response.data.cards);
    if (response.data) {
      if (response.data.cards.length > 0) {
        let cardsArr = response.data.cards;
        let tempData: any = [];
        cardsArr.map((item: any, key: number) => {
          tempData[key] = {
            card_id: item.card_id,
            exp_month: item.exp_month,
            exp_year: item.exp_year,
            
          };
        });
        console.log(tempData);
        setPaymentCards(cardsArr);
      }
    }
  };

  useEffect(() => {
    getAllPaymentData();
  }, []);

  const handleModal = (val: boolean) => {
    setShowModel(val);
  };

  const handleSubmit = () => {};

  const handlePaymentCardCreate = async () => {
    const data = {
      card_no: card_no,
      exp_month: expDate.split("-")[1],
      exp_year: expDate.split("-")[0],
      cvc:cvc,
      name:name,
    };
    let temp = [...paymentCards, data];
    const response = await paymentCardAPI({ payment: temp });
    console.log(response);
    if (response.data) {
      if (response.data === "success") {
        setPaymentCards(temp);
        handleModal(false);
      } else {
        console.log("cannot add payment cards");
      }
    }
  };

  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <h1 className="font-semibold pb-8 text-xl">Payment</h1>
      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        data-modal-toggle="authentication-modal"
        onClick={() => {
          setShowModel(true);
        }}
      >
        Add
      </button>
      <Modal isVisible={showModel} closeModal={handleModal}>
        {/* onClose={handleModal} */}
        <div className="px-6 py-6 lg:px-8">
          {/* <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            create payment cards
          </h3> */}
          {/* <form className="space-y-6" action="#" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your card no
              </label>
              <input
                type="address"
                name="address"
                id="address"
                onChange={(e) => setCardId(e.target.value)}
                value={cardId}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                expiryDate
              </label>
              <input
                type="address"
                name="address"
                id="address"
                onChange={(e) => setExpMonth(e.target.value)}
                value={expMonth}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            <div className="p-6 text-center">
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ml-2"
                onClick={handlePaymentCardCreate}
              >
                Add
              </button>
            </div>
          </form> */}

      <form className="space-y-6" action="#" onSubmit={handleSubmit}>
          <div x-show="card">
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="card-nr"
                >
                  Card Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="card-nr"
                  className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                  type="text"
                  placeholder="1234 1234 1234 1234"
                onChange={(e) => setCard_no(e.target.value)}
                value={card_no}
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="card-expiry"
                  >
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="card-expiry"
                    className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                    type="month"
                    placeholder="MM/YY"
                    onChange={(e) => setExpDate(e.target.value)}
                    value={expDate}
                    
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="card-cvc"
                  >
                    CVC <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="card-cvc"
                    className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                    type="text"
                    placeholder="CVC"
                    onChange={(e) => setCvc(e.target.value)}
                    value={cvc}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="card-name"
                >
                  Name on Card <span className="text-red-500">*</span>
                </label>
                <input
                  id="card-name"
                  className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                  type="text"
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                value={name}
                />
              </div>

              <div className="p-6 text-center">
              <button
                data-modal-toggle="popup-modal"
                type="button"
                onClick={()=>{setShowModel(false)}}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none
                 focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5
                  hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 
                  dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ml-2"
                onClick={handlePaymentCardCreate}
              >
                Add
              </button>
            </div>
              {/* <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="card-email"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="card-email"
                  className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                  type="email"
                  placeholder="john@company.com"
                />
              </div> */}
            </div>
          </div>
          </form>
        </div>
      </Modal>
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-8 bg-neutral-50 px-20 py-10">
        {paymentCards.map((item: any) => (
          <div
            key={item.card_id}
            className="p-6 bg-slate-100  dark:bg-neutral-800 rounded-2xl dark:border-neutral-800 columns-2"
          >
            <h3 className="not-italic text-xs font-normal">{item.card_id}</h3>
            <span className="not-italic text-xs font-normal">
              {item.exp_year}
              {"/"}
              {item.exp_month}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSectionStatistic;
