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
import { checkoutApi1,checkoutApi2 } from "services/apiServices";
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
const [last4Number, setLast4Number]=useState("");
const [exp_month,setExp_month]=useState("");
const [exp_year,setExp_year]=useState("");
const [admin_id, setAdmin_id]=useState("");
const [amount, setAmount]=useState("");
const [currency, setCurrency]=useState("");
const [type, setType]=useState("");
const [card_no, setCard_no]=useState("");
const [cvc, setCvc]=useState("");
const [tracking_number, setTracking_number]=useState("");
const [country_code, setCountry_code]=useState("");
const [postal_code, set]=useState("");
const navigate = useNavigate();


useEffect(() => {
  console.log(cardExpiryFormat("34","month"))
},[])

var _ = require('lodash');

console.log(_.uniqueId('id_'));
console.log(_.uniqueId());

//handle contact details
  const handleSubmit1 = async () => {
    var data ={
    "customer_name":JSON.parse(localStorage.getItem("user-info")|| "{}").username,
    "name": name, 
    "email":JSON.parse(localStorage.getItem("user-info")|| "{}").email,
    "type": type,
    "card_no": card_no,
    "exp_month": exp_month,
    "exp_year": exp_year,
    "cvc": cvc,
    "cardId":card_id,
    "last4Number":last4Number,
    "cardType": type,
    "primary_card": "false"

    };
    const response=await checkoutApi1(data);
    if(response.data){
      console.log(response.data);
        // navigate('/');
      }else{
        toast.error(response.data.message,{
          position:toast.POSITION.TOP_CENTER
        });
      }
  }
    const handleSubmit3= async () => {
      var data1 ={
      "customer_name":JSON.parse(localStorage.getItem("user-info")|| "{}").username,
      "name": name, 
      "email":JSON.parse(localStorage.getItem("user-info")|| "{}").email,
      "type": type,
      "card_no": card_no,
      "exp_month": exp_month,
      "exp_year": exp_year,
      "cvc": cvc,
      "cardId":card_id,
      "last4Number":last4Number,
      "cardType": type,
      "primary_card": "false"
  
      };
     
      const handleSubmit2 = async () => {
        var data2 ={
        "admin_id":admin_id,
        "amount": amount, 
        "card_id":card_id,
        "currency": currency,
        "receipt_email":JSON.parse(localStorage.getItem("user-info")|| "{}").email,
        "name": name,
        "phone": phone,
        "tracking_number": tracking_number,
        "city":city,
        "country_code":country_code,
        "state": state,
        "postal_code":postal_code
       };
       const response=await checkoutApi2(data1);
       if(response.data1){
         console.log(response.data1);
           // navigate('/');
         }else{
           toast.error(response.data.message,{
             position:toast.POSITION.TOP_CENTER
           });
         }
    }

    const response=await checkoutApi2(data1);
    if(response.data){
      console.log(response.data);
        // navigate('/');
      }else{
        toast.error(response.data.message,{
          position:toast.POSITION.TOP_CENTER
        });
      }
    }

  // const renderContactDetails = () => {
  //   return (
  //     <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
  //   <ToastContainer/>
  //       <div>
  //         <h3 className="text-2xl font-semibold">Contact details</h3>
  //         {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div> */}

  //         <div className="mt-6">
  //           <Tab.Group>
        
  //             <Tab.Panels>
                
  //               <Tab.Panel className="space-y-5">
  //               <div className="flex space-x-5  ">
  //                   <div className="flex-1 space-y-1">
  //                     <Label>Name </Label>
  //                     <Input type="text" defaultValue="name" />
  //                   </div>
  //                   <div className="flex-1 space-y-1">
  //                     <Label>Phone number</Label>
  //                     <Input />
  //                   </div>
  //                 </div>
  //                 <div className="space-y-1">
  //                   <Label>Address </Label>
  //                   <Input type="text" defaultValue="123 Avenue Street" />
  //                 </div>
  //                 <div className="space-y-1">
  //                   <Label>Landmark </Label>
  //                   <Input type="text" defaultValue="***" />
  //                 </div>

  //                 <div className="block">
  //                   <span className="text-gray-700">Address Label (Optional)</span>
  //                   <div className="mt-2">
  //                     <div>
  //                       <label className="inline-flex items-center">
  //                       <input type="checkbox" className="form-checkbox" />
  //                         <span className="ml-2">Home</span>
  //                       </label>
  //                     </div>
  //                     <div>
  //                       <label className="inline-flex items-center">
  //                         <input type="checkbox" className="form-checkbox"/>
  //                         <span className="ml-2">Work</span>
  //                       </label>
  //                     </div>
  //                 </div>
  //               </div>
  //               <div className="block">
  //                   <span className="text-gray-700">Deliver to</span>
  //                   <div className="mt-2">
  //                     <div>
  //                       <label className="inline-flex items-center">
  //                       <input type="checkbox" className="form-checkbox" />
  //                         <span className="ml-2">Deliver to door</span>
  //                       </label>
  //                     </div>
  //                     <div>
  //                       <label className="inline-flex items-center">
  //                         <input type="checkbox" className="form-checkbox"/>
  //                         <span className="ml-2">Pickup outside</span>
  //                       </label>
  //                     </div>   
  //                 </div>
  //               </div>

  //               </Tab.Panel>
  //             </Tab.Panels>
  //           </Tab.Group>
  //           <div className="pt-8">
  //             <ButtonPrimary href={"/pay-done"}>Confirm</ButtonPrimary>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
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
        <div>Michael 123 Avenue Street</div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <NcImage src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            
            <div>
              {/* <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                Hotel room in Tokyo, Jappan
              </span> */}
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
        {/* <div className="mt-6 sm:flex-row ">
          <Label>Address</Label>
            <div className="space-y-1 px-1 grid gap-4 grid-cols-3">
              <Input
                type="text"
                placeholder="country"
                className="mt-1"
                onChange={(e) => setCountry(e.target.value)} />
              <Input type="text"
                placeholder="city"
                className="mt-1"
                onChange={(e) => setCity(e.target.value)} />
              <Input type="text"
                placeholder="state"
                className="mt-1"
                onChange={(e) => setState(e.target.value)}/>
            </div>
            </div> */}
            {/* <div className="space-y-1 px-1 col-span-3">
              <Label>Country</Label>
              <Input defaultValue="" />
            </div> */}
          
          {/* <div className="mt-6   sm:flex-row ">
            <div className="space-y-1 px-1">
              <Label>Landmark</Label>
              <Input defaultValue="" />
            </div>
          </div> */}

          {/* address label  */}
          <div>
            <p className="text-base mt-6">Address Label (Optional)</p>
          </div>
          {/* <div className="mt-6  flex flex-row ">
            <div className="space-y-1">
            <Label>Home</Label>
            <Checkbox name="Home"/> 
          </div>
            <div className="space-y-1 px-9">
              <Label>Work</Label>
              <Checkbox name="Work"/>
            </div>
          </div> */}

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
                  <ButtonPrimary href={"/pay-done"} onClick={handleSubmit1}>Confirm and pay</ButtonPrimary>
                </Tab.Panel>
                <Tab.Panel className="space-y-5">
                  <ButtonPrimary href={"/pay-done"} onClick={handleSubmit3}>Confirm</ButtonPrimary>
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