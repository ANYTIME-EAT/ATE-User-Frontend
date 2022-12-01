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
import CustomInupt from "containers/ShoppingCart/components/CustomInupt";
import moment from "moment";
import { DateRage } from "components/HeroSearchForm/StaySearchForm";
import converSelectedDateToString from "utils/converSelectedDateToString";
import ModalSelectGuests from "components/ModalSelectGuests";
import { GuestsObject } from "components/HeroSearchForm2Mobile/GuestsInput";
import { COUNTRIES } from "data/countryCodeList"

export interface CheckOutPageProps {
  className?: string;
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

  const [items, setItems] = useState<any>([])

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [line1, setLine1] = useState<string>("");
  const [line2, setLine2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postal_code, setPostalCode] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("AF");

  useEffect(() => {
    console.log(countryCode)
  }, [countryCode])

  const renderSidebar = () => {
    return (
      <div className="flex flex-col max-w-2xl p-1 dark:bg-inherit dark:text-gray-100  sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <h3 className="text-2xl font-semibold">Summary</h3>
        <div className="flex flex-col  ">
          {/* <div className="flex-shrink-0 w-full sm:w-40">
            <div className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent  rounded-2xl overflow-hidden">
              <NcImage src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />             
            </div>
            <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-base font-medium mt-1 block">
                The Lounge & Bar
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              2 beds · 2 baths
            </span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
           
          </div>
          </div> */}
          <div className="flex w-full space-x-2 sm:space-x-4">
            <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-20 sm:h-20 dark:bg-gray-500" src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Polaroid camera"
            />
            <div className="flex flex-col justify-between w-full pb-4">
              <div className="flex justify-between w-full pb-2 space-x-2">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold leading-snug sm:pr-8">name</h3>
                  <p className="text-sm dark:text-gray-400">04</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">2.33$</p>
                  {/* <p className="text-sm line-through dark:text-gray-600">75.50€</p> */}
                </div>
              </div>
              <div className="flex text-sm mt-3">

                <div className="flex items-right px-2 py-1 pl-0 space-x-1">
                  <CustomInupt className="mr-2"  />
                  {/* defaultValue={item.quantity} onChange={(e) => { editQuantity(item.id, item.type, e); setNewProduct(true); }} */}
                </div>
                <button type="button" className="flex items-center px-1 py-1 pl-0 space-x-1 fill-red-600" >
                {/* onClick={() => { removeCart(item.id, item.type); setNewProduct(true); }} */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-3 h-3 ">
                    <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                    <rect width="32" height="200" x="168" y="216"></rect>
                    <rect width="32" height="200" x="240" y="216"></rect>
                    <rect width="32" height="200" x="312" y="216"></rect>
                    <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                  </svg>
                  <span className="text-red-700">Remove</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-full space-x-2 sm:space-x-4 mt-5">
            <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-20 sm:h-20 dark:bg-gray-500" src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Polaroid camera"
            />
            <div className="flex flex-col justify-between w-full pb-4">
              <div className="flex justify-between w-full pb-2 space-x-2">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold leading-snug sm:pr-8">name</h3>
                  <p className="text-sm dark:text-gray-400">04</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">2.33$</p>
                
                </div>
              </div>
              <div className="flex text-sm ">

               
              </div>
            </div>
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
        <h2 className="text-3xl lg:text-4xl font-semibold mt-11">
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
              <Input type="text" placeholder="Name" />
            </div>
            <div className="space-y-1 mb-4">
              <Label>Recipient Email </Label>
              <Input type="email" placeholder="Email" />
            </div>
            <div className="space-y-1 mb-4">
              <Label>Phone No </Label>
              <Input type="number" placeholder="Phone" />
            </div>
            <div className="space-y-1 mb-4">
              <h4 className="text-1x1 font-semibold">Address</h4>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
              <div className="space-y-1 mb-4">
                <input type="text" placeholder="Address Line 1" />
              </div>
              <div className="space-y-1 mb-4">
                <input type="text" placeholder="Address Line 2" />
              </div>
              <div className="space-y-1 mb-4">
                <input type="text" placeholder="City" />
              </div>
              <div className="space-y-1 mb-4">
                <input type="number" placeholder="Postal Code" />
              </div>
              <div className="space-y-1 mb-4">
                <select onChange={(e) => setCountryCode(e.target.value)}>
                  {COUNTRIES.map((item: any, key: number) => {
                    return [
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
                    <Input defaultValue="111 112 222 999" />
                  </div>
                  <div className="space-y-1">
                    <Label>Card holder </Label>
                    <Input defaultValue="JOHN DOE" />
                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Expiration date </Label>
                      <Input type="month" defaultValue="2022-12" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>CVC </Label>
                      <Input />
                    </div>
                  </div>
                  <ButtonPrimary href={"/pay-done"}>Confirm and pay</ButtonPrimary>
                </Tab.Panel>
                <Tab.Panel className="space-y-5">
                  <ButtonPrimary href={"/pay-done"}>Confirm</ButtonPrimary>
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
        <div className=" flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPage;
