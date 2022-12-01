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
import Checkbox from "shared/Checkbox/Checkbox";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import { useNavigate } from 'react-router-dom';
import { checkoutApi1,getAllCartCheckout } from "services/apiServices";
import { ToastContainer,toast } from "react-toastify";
import { userInfo } from "os";
import _ from 'lodash';

export interface CheckOutPageProps {
  className?: string;
}

const limit = (val:any, max:any) => {
	if (val.length === 1 && val[0] > max[0]) {
		val = '0' + val
	}

	if (val.length === 2) {
		if (Number(val) === 0) {
			val = '01'
		} else if (val > max) {
			val = max
		}
	}

	return val
}

const cardExpiryFormat = (val:any, type: string = "year") => {
  if(type === "month"){
    let month = limit(val.substring(0, 2), '12')
    return month
  }else{
    let year = limit(val.substring(2, 4), '99')
    return year
  }
}

const CheckOutPage: FC<CheckOutPageProps> = ({ className = "" }) => {
  const [rangeDates, setRangeDates] = useState<DateRage>({
    startDate: moment().add(1, "day"),
    endDate: moment().add(5, "days"),
  });
  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: 2,
    guestChildren: 1,
    guestInfants: 1,
  });
  
const [customer_name, setCustomer_name]=useState("");
const [phone, setPhone]=useState("");
const [city, setCity]=useState("");
const [country, setCountry]=useState("");
const [state, setState]=useState("");
const [address_lable, setAddress_lable]=useState("");
const [card_id, setCard_id]=useState("");
const [name, setName]=useState("");
const [exp_month,setExp_month]=useState("");
const [exp_year,setExp_year]=useState("");
const [admin_id, setAdmin_id]=useState("");
const [amount, setAmount]=useState("");
const [currency, setCurrency]=useState("");
const [type, setType]=useState("card");
const [card_no, setCard_no]=useState("");
const [cvc, setCvc]=useState("");
const [tracking_number, setTracking_number]=useState("");
const [country_code, setCountry_code]=useState("");
const [postal_code, set]=useState("");
const [viewCartData, setViewCartData]=useState("");

const [id,setId]=useState("");
const navigate = useNavigate();


var _ = require('lodash');

useEffect(() => {
  setCard_id(_.uniqueId(`cc-${Date.now()}-`))
  console.log(cardExpiryFormat("34","month"))
},[])


//handle contact details
  const handleSubmit = async () => {
    var data ={
    "customer_name":customer_name,
    "name": name, 
    "email":JSON.parse(localStorage.getItem("user-info")|| "{}").email,
    "type": type,
    "card_no": card_no,
    "exp_month": exp_month.split("-")[1],
    "exp_year": exp_month.split("-")[0],
    "cvc": cvc,
    "cardId":card_id,
    "cardType": type,
    "primary_card": false

    };
    console.log(data)
    const response=await checkoutApi1(data);
    if(response.data){
      console.log(response.data);
      }else{
        toast.error(response.data.message,{
          position:toast.POSITION.TOP_CENTER
        });
      }
  }

  const handleSubmitCart = async () => {
    var dataCart ={
    "admin_id":JSON.parse(localStorage.getItem("user-info")|| "{}").id,
    "amount": "20" ,
    // "email":JSON.parse(localStorage.getItem("cart-items")|| "{}").email,
    "card_id": "cc-2826453728",
    "currency": "eur",
    "name": "dsfdsg",
    "phone":phone,
    // "tracking_number": tracking_number,
    "city":city,
    "country_code": "IT",
    "postal_code": postal_code,
    "state":state
    };
    // var dataCart ={
    //   "admin_id":"5",
    //   "amount":20,
    //   "receipt_email":"vjvfc2k16@gmail.com",
    //   "card_id": "cc-1669816162263-4",
    //   "currency": "eur",
    //   "name": "Alex",
    //   "phone":"0123456789",
    //   "tracking_number": "TR-123456",
    //   "city":"Milan",
    //   "country_code": "IT",
    //   "line1":"Test street",
    //   "line2":"",
    //   "postal_code": "20019",
    //   "state":"Milano"
    //   };
    console.log(dataCart);
    const response=await getAllCartCheckout(dataCart);
    if(response.data.length>0){
      setViewCartData(response.data);
      // response.data.map(async(item, key)=>{        
        
      // })
      console.log(response.data);
      }else{
        toast.error(response.data.message,{
          position:toast.POSITION.TOP_CENTER
        });
      }
  }
  // const getAllCartData =async () => {
  //   const response = await getAllCartCheckout()

  //   if(response.data){
  //     let tempData : any  = [];
  //     if(response.data.response === "success"){
  //       console.log(response.data);
  //       response.data.restaurant.map((item: any, key: number) => {
  //         tempData[key] = {
  //           id: item.id,
  //           href: "#",
  //           name: item.name,
  //           taxonomy: "category",
  //           count: 188288,
  //           // thumbnail:kfc,
  //       }      
  //       })
  //       setViewCartData(tempData)
  //     }
      
  //   }
  // }

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        {/* {viewCartData.map((item,key)=>{

        })} */}
        <h3 className="text-xl font-semibold">View Cart</h3>
        <div className="align-middle">For Self Pickup, No delivery charge</div>
        <Tab.Group>
        <Tab.List className="flex my-5">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-300 text-white dark:text-neutral-900"
                          : "text-neutral-6000 dark:text-neutral-400"
                      }`}
                    >
                      Pickup
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-300 text-white dark:text-neutral-900"
                          : " text-neutral-6000 dark:text-neutral-400"
                      }`}
                    >
                      <span className="mr-2.5">Delivery</span>
                
                    </button>
                  )}
                </Tab>
        </Tab.List>
        </Tab.Group>

        <div className="font-semibold">Deliver to</div>
        <div></div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <NcImage src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            
            <div>
              <span className="text-base font-medium mt-1 block">
                McDonald's
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              American Fast Food
            </span>
            {/* <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            <StartRating /> */}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {/* <h3 className="text-2xl font-semibold">Price detail</h3> */}
          <h6 className="text-2xl font-semibold">6 Pc Nuggets+McChicken+Coke(M)</h6>
          <div>Do you want to add instructions</div>

          <h3 className="text-2xl font-semibold">Apply Coupon</h3>

          {/* <h3 className="text-2xl font-semibold">Price detail</h3> */}
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Subtotal(1 item)</span>
            <span>$250</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Ship Fee(1.5km)</span>
            <span>$10</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$260</span>
          </div>
        </div>
        <div className="pt-8">
              <ButtonPrimary href={"/pay-done"}>Make Payment</ButtonPrimary>
            </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-xl lg:text-4xl font-semibold">
         payment Details
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="relative">
          <div>
            <h3 className="text-xl font-semibold">Contact Information</h3>

          </div>
          <div className="mt-6  flex flex-col sm:flex-row ">
            <div className="space-y-1 px-1">

              <Label>Name</Label>
              <Input
                sizeClass="w-80"
                type="text"
                placeholder="name"
                className="mt-1"
                onChange={(e) => setCustomer_name(e.target.value)}
              />
            </div>
            <div className="space-y-1 pl-12">
              <Label>Contact number </Label>
              <Input
                sizeClass="w-80"
                type="text"
                placeholder="Contact Number"
                className="mt-1"
                onChange={(e) => setPhone(e.target.value)}
                 />
            </div>
          </div>
          <div  className="mt-6">
          <Label>Address </Label>
          </div>
          <div className="flex space-x-5">
                    <div className="flex-1 space-y-1">
                      <Input
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="country"/>
                    </div>
                    <div className="flex-1 space-y-1">
                      
                      <Input
                      placeholder="city" 
                      onChange={(e) => setCity(e.target.value)}/>
                    </div>
                    <div className="flex-1 space-y-1">
                  
                      <Input
                      placeholder="state"
                      onChange={(e) => setState(e.target.value)}/>
                    </div>
                  </div>
       
          <div>
            <p className="text-base mt-6">Address Label (Optional)</p>
          </div>
          

      <div className="flex items-center mb-4">
          <input id="default-radio-1" type="radio" value="" name="address_lable" 
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={address_lable === "Home"}
          onChange={(e) => setAddress_lable(e.target.value)}
          />
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Home</label>
      </div>
      <div className="flex items-center">
          <input id="default-radio-2" 
          checked={address_lable === "Work"}
          onChange={(e) => setAddress_lable(e.target.value)}
          type="radio" value="" name="address_lable" 
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Work</label>
      </div>
      <div className="flex items-center">
          <input id="default-radio-2"
          checked={address_lable === "Other"} 
          onChange={(e) => setAddress_lable(e.target.value)}
          type="radio" value="" name="address_lable" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Other</label>
      </div>
  </div>
        <div>
          <h3 className="text-xl font-semibold">Pay with</h3>
          <div className="border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

          <div className="mt-6">
          <Tab.Group>
              <Tab.List className="flex my-5">

                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${selected ? "bg-neutral-800 dark:bg-neutral-300 text-white dark:text-neutral-900"
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
                    <Input defaultValue="111 112 222 999" 
                    onChange={(e) => setCard_no(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Card holder </Label>
                    <Input defaultValue="JOHN DOE" 
                    onChange={(e) => setName(e.target.value)}/>
                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Expiration date </Label>
                      {/* <Input type="month" 
                      defaultValue="MM/YY" 
                      onChange={(e) => setExp_month(e.target.value)}/> */}
                      <input type="month" id="start" name="start" min="2018-03"
                      onChange={(e) => setExp_month(e.target.value)}/>
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>CVC </Label>
                      <Input
                      defaultValue="1234" 
                      onChange={(e) => setCvc(e.target.value)}/>
                    </div>
                  </div>
                  <ButtonPrimary href={"/pay-done"} onClick={handleSubmit}>Confirm and pay</ButtonPrimary>
                </Tab.Panel>
                <Tab.Panel className="space-y-5">
                  <ButtonPrimary href={"/pay-done"} onClick={handleSubmit}>Confirm</ButtonPrimary>
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
        <div className=" lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};
export default CheckOutPage;