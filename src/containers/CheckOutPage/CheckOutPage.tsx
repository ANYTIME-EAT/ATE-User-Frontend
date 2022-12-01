import { Tab } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useState, useEffect } from "react";
import visaPng from "images/vis.png";
import mastercardPng from "images/mastercard.svg";
import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import StartRating from "components/StartRating/StartRating";
import NcModal from "shared/NcModal/NcModal";
import ModalSelectDate from "components/ModalSelectDate";
import moment from "moment";
import { DateRage } from "components/HeroSearchForm/StaySearchForm";
import converSelectedDateToString from "utils/converSelectedDateToString";
import ModalSelectGuests from "components/ModalSelectGuests";
import { GuestsObject } from "components/HeroSearchForm2Mobile/GuestsInput";
import { COUNTRIES } from "data/countryCodeList"
import _ from "lodash";
import { getAvatar, attachCardApi, paymentApi } from 'services/apiServices'
import { useNavigate } from "react-router-dom";

export interface CheckOutPageProps {
  className?: string;
}

const SERIVICE_CHARGE = "20"

const generateRandomID = (size:number) => {
  let length = size,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

const CheckOutPage: FC<CheckOutPageProps> = ({ className = "" }) => {

    const navigate = useNavigate();
    const [items, setItems] = useState<any>([])

    const [id, setId] = useState<number>(-1)

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [line1, setLine1] = useState<string>("");
    const [line2, setLine2] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [postal_code, setPostalCode] = useState<string>("");
    const [countryCode, setCountryCode] = useState<string>("IT");

    const [total_amount, setTotal] = useState<string>(SERIVICE_CHARGE)

    //Card dets
    const [cardNo, setCardNo] = useState<string>("4242424242424242")
    const [card_id, setCard_id] = useState(_.uniqueId(`cc-${Date.now()}-${generateRandomID(6)}`));
    const [expDate, setExpDate] = useState<string>("2022-12")
    const [cardholderName, setCardholderName] = useState<string>("Mr X")
    const [cvv, setCvv] = useState<string>("123")


  useEffect(() => {
    if(localStorage.getItem("user-info")){
      let userid = JSON.parse(localStorage.getItem("user-info")|| "{}").id;
      console.log(userid)
      setId(userid)
    }
  },[])

  const handleConfirm = async(creditCardId: string = "") => {
    const shipping_dets= {
      name: name,
      phone: phone,
      tracking_number: "TR-123456",
      address: {
        city: city,
        country_code: countryCode,
        line1: line1,
        line2: line2,
        postal_code:postal_code,
        state: state
      }
    }
    const data = {
      admin_id: id,
      amount: total_amount,
      card_id: creditCardId,
      currency: "eur",
      receipt_email: email,
      shipping_dets: shipping_dets
    }

    if(creditCardId != ""){
      const response = await paymentApi(data);
      if(response.data){

        if(response.data.response === "success"){
          navigate("/pay-done", {state: {data: "abc"}});
        }
      }
    }else{
      console.log(data)
      console.log("Payment successfull.")
    }
  }

  const handlePayByCard = async() => {  
    const data = {
      customer_name: cardholderName,
      name: name,
      email: email,
      type: "card",
      card_no: cardNo,
      exp_month: expDate.split("-")[1],
      exp_year: expDate.split("-")[0],
      cvc: cvv,
      cardId: card_id,
      primary_card: false
    }
    const response = await attachCardApi(id,data)
    if(response.data){
      if(response.data.response === "success" || response.data.message === "This card is already exists."){
        console.log(card_id)
        handleConfirm(card_id)
      }else{
        console.log("Invalid card details")
      }
    }
  }

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <h3 className="text-2xl font-semibold">Price detail</h3>
        <div className="flex flex-col sm:flex-row sm:items-center">         
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <NcImage src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                Hotel room in Tokyo, Jappan
              </span>
              <span className="text-base font-medium mt-1 block">
                The Lounge & Bar
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              2 beds · 2 baths
            </span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            <StartRating point={3}/>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {/* <h3 className="text-2xl font-semibold">Price detail</h3> */}
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>$19 x 3 day</span>
            <span>$57</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>$0</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$57</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Confirm and Payment
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">Shipping Details</h3>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
          </div>
          
          <div>
            <div className="space-y-1 mb-4">
              <Label>Recipient Name </Label>
              <Input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="space-y-1 mb-4">
              <Label>Recipient Email </Label>
              <Input type="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="space-y-1 mb-4">
              <Label>Phone No </Label>
              <Input type="number" placeholder="Phone"  onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div className="space-y-1 mb-4">
              <h4 className="text-1x1 font-semibold">Address</h4>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
              <div className="space-y-1 mb-4">
                <input type="text" placeholder="Address Line 1"  onChange={(e) => setLine1(e.target.value)}/>
              </div>
              <div className="space-y-1 mb-4">
                <input type="text" placeholder="Address Line 2"  onChange={(e) => setLine2(e.target.value)}/>
              </div>
              <div className="space-y-1 mb-4">
                <input type="text" placeholder="City"  onChange={(e) => setCity(e.target.value)}/>
              </div>
              <div className="space-y-1 mb-4">
                <input type="text" placeholder="State/Province"  onChange={(e) => setState(e.target.value)}/>
              </div>
              <div className="space-y-1 mb-4">
                <input type="number" placeholder="Postal Code"  onChange={(e) => setPostalCode(e.target.value)}/>
              </div>
              <div className="space-y-1 mb-4">
                <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                  {COUNTRIES.map((item:any,key:number)=>{
                    return[
                      <option value={item.code}>{item.name}</option>
                    ]
                  })}
                </select>
                {/* <Input type="select" placeholder="Country" /> */}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Pay with</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

          <div className="mt-6">
            <Tab.Group>
              <Tab.List className="flex my-5">

                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${selected? "bg-neutral-800 dark:bg-neutral-300 text-white dark:text-neutral-900"
                          : " text-neutral-6000 dark:text-neutral-400"
                        }`}
                    >
                      <span className="mr-2.5">Card</span>
                      <img className="w-8" src={visaPng} alt="" />
                      /
                      <img className="w-8" src={mastercardPng} alt="" />
                    </button>

                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${selected
                          ? "bg-neutral-800 dark:bg-neutral-300 text-white dark:text-neutral-900"
                          : "text-neutral-6000 dark:text-neutral-400"
                        }`}
                    >
                      Cash On Delivery
                    </button>
                  )}
                </Tab>

              </Tab.List>

              <Tab.Panels>

                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Card number </Label>
                    <Input type="number" value={cardNo} onChange={(e) => {e.target.value.length <= 16 && setCardNo(e.target.value)}} />
                  </div>
                  <div className="space-y-1">
                    <Label>Card holder </Label>
                    <Input onChange={(e) => setCardholderName(e.target.value)} />
                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Expiration date </Label>
                      <Input type="month" defaultValue="2022-12" onChange={(e) => setExpDate(e.target.value)} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>CVV </Label>
                      <Input type="number" value={cvv} onChange={(e) => {e.target.value.length <= 4 && setCvv(e.target.value)}}/>
                    </div>
                  </div>
                  <ButtonPrimary onClick={handlePayByCard}>
                    Confirm and pay
                  </ButtonPrimary>
                  {/* href={"/pay-done"} */}
                </Tab.Panel>
                <Tab.Panel className="space-y-5">
                  <ButtonPrimary  onClick={handleConfirm}>Confirm</ButtonPrimary>
                  {/* href={"/pay-done"} */}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <div className="pt-8">

            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPage;
