import React, { FC, useEffect, useState } from "react";
import Heading from "components/Heading/Heading";
import { deletePaymentCardApi, getAllPaymentAPI, paymentCardAPI } from "services/apiServices";
import Modal from "../components/Modal";
// import "react-credit-cards/es/styles-compiled.css";
import visaCard from "images/visaCard.png";
import masterCard from "images/mastercard.png";

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
  const [last4Number, setLast4Number] = useState("");
  const [cardType, setCardType] = useState("");
  const [showModelDelete, setShowModelDelete] = useState(false);
  const [customer_name, setCustomer_name] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  

  //get user payments
  const getAllPaymentData = async () => {
    const response = await getAllPaymentAPI(JSON.parse(localStorage.getItem("user-info") || "{}").id);
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
            last4Number:item.last_four_digits,
            cardType:item.card_type,
            
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
      // card_no: card_no,
      exp_month: expDate.split("-")[1],
      exp_year: expDate.split("-")[0],
      cvc:cvc,
      name:name,
      card_no:card_no,
      // last_four_digits:last4Number,
      card_type:cardType,
      // card_holder_name:customer_name,
      // email:email,
      type:type,
      // card_id:cardId,
      // primary_card:false
      
    };
    let temp = [...paymentCards, data];
    const response = await paymentCardAPI(data);
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

  const handleModalDelete = (val: boolean) => {
    setShowModelDelete(val);
  };

  const removePaymentHandler = async () => {
    const response = await deletePaymentCardApi(4);
    if (response.data) {
      if (response.data.response === "success") {
        handleModalDelete(false);
      } else {
        alert("Not deleted");
      }
    }
  };

  return (
    <div className={`nc-SectionStatistic relative ${className}`} >
      <div className="grid grid-cols-12">
      <h1 className="font-semibold pb-8 text-xl grid xl:col-span-11 col-span-9">Payment</h1>
      <button
        className="px-4 w-16 h-10 block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        type="button"
        data-modal-toggle="authentication-modal"
        onClick={() => {
          setShowModel(true);
        }}
      >
        Add
      </button>
      </div>
      <Modal isVisible={showModel} closeModal={handleModal}>
        {/* onClose={handleModal} */}
        <div className="px-6 py-6 lg:px-8">
         
      <form className="space-y-6" action="#" onSubmit={handleSubmit}>
          <div x-show="card">
            <div className="space-y-4">
              {/* <div>
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
              </div> */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="card-expiry"
                  >
                    Card Type <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="card-expiry"
                    className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                    type="text"
                    placeholder="MASTER/VISA CARD"
                    onChange={(e) => setCardType(e.target.value)}
                    value={cardType}
                    
                  />
                </div>
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

              <div className="text-center">
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
            </div>
          </div>
          </form>
        </div>
      </Modal>

      <Modal isVisible={showModelDelete} closeModal={handleModalDelete}>
        <div className="px-6 py-6 lg:px-8">
          <div className="relative w-full h-full max-w-md md:h-auto">
            <div className="p-6 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this Address?
              </h3>
              <button
                onClick={removePaymentHandler}
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                onClick={()=>{setShowModelDelete(false)}}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="grid md:grid-cols-3 gap-6 lg:grid-cols-3 xl:gap-8 px-1 py-2">
        {paymentCards.map((item: any) => (
          <div
            key={item.card_id}
            className="p-6 bg-slate-100 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800 columns-2 grid grid-rows-3 grid-flow-col"
          >
            <div className="mb-4 row-start-1 row-end-4 ">
              {item.card_type=="mastercard" ? (
                <img src={masterCard} className="max-w-full h-auto rounded-lg" alt=""/>
              ): item.card_type=="visacard" ? (
                <img src={visaCard} className="max-w-full h-auto rounded-lg" alt=""/>
              ):(
                <img src={visaCard} className="max-w-full h-auto rounded-lg" alt=""/>
              )
            }
            </div>
            <h3 className="not-italic text-xs row-end-2 row-span-1 font-bold">{"xxxx-xxxxxxxx-"}{item.last_four_digits}</h3>
            <span className="not-italic text-xs font-normal row-start-2 row-span-1 ">
              {"VALID TILL "}
              {item.exp_month}
              {"/"}
              {item.exp_year}
            </span>
            <div className="row-start-1 row-span-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="w-6 h-6 "
              onClick={() => {
                setShowModelDelete(true);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSectionStatistic;
