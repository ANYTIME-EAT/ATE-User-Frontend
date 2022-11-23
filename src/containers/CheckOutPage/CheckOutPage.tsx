import { Tab } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useState } from "react";
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
<<<<<<< HEAD
=======
import Checkbox from "shared/Checkbox/Checkbox";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
>>>>>>> e24f4beabd6b2f922a2843915f0147ca7051e95f

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

  const renderContactDetails = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
    
        <div>
          <h3 className="text-2xl font-semibold">Contact details</h3>
          {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div> */}

          <div className="mt-6">
            <Tab.Group>
        
              <Tab.Panels>
                
                <Tab.Panel className="space-y-5">
                <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Name </Label>
                      <Input type="text" defaultValue="name" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>Phone number</Label>
                      <Input />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Address </Label>
                    <Input type="text" defaultValue="123 Avenue Street" />
                  </div>
                  <div className="space-y-1">
                    <Label>Landmark </Label>
                    <Input type="text" defaultValue="***" />
                  </div>

                  <div className="block">
                    <span className="text-gray-700">Address Label (Optional)</span>
                    <div className="mt-2">
                      <div>
                        <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox" />
                          <span className="ml-2">Home</span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox"/>
                          <span className="ml-2">Work</span>
                        </label>
                      </div>
                  </div>
                </div>
                <div className="block">
                    <span className="text-gray-700">Deliver to</span>
                    <div className="mt-2">
                      <div>
                        <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox" />
                          <span className="ml-2">Deliver to door</span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox"/>
                          <span className="ml-2">Pickup outside</span>
                        </label>
                      </div>   
                  </div>
                </div>

                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <div className="pt-8">
              <ButtonPrimary href={"/pay-done"}>Confirm</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <h3 className="text-2xl font-semibold">View Cart</h3>
        <div className="">For Self Pickup, No delivery charge</div>
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
<<<<<<< HEAD
      <div>
          <h3 className="text-2xl font-semibold">Choose Payment Method</h3>
=======
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Confirm and payment
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="relative">
          <div>
            <h3 className="text-2xl font-semibold">Contact Information</h3>

          </div>
          <div className="mt-6  flex flex-col sm:flex-row ">
            <div className="space-y-1 px-1">

              <Label>Name</Label>
              <Input
                sizeClass="w-80"
              />
            </div>
            <div className="space-y-1 pl-12">
              <Label>Contact number </Label>
              <Input
                sizeClass="w-80"
                defaultValue="111 112 222 999" />
            </div>
          </div>
          <div className="mt-6   sm:flex-row ">
            <div className="space-y-1 px-1">
              <Label>Address</Label>
              <Input defaultValue="" />
            </div>
          </div>
          <div className="mt-6   sm:flex-row ">
            <div className="space-y-1 px-1">
              <Label>Landmark</Label>
              <Input defaultValue="" />
            </div>
          </div>

          {/* address label  */}
          <div>
            <p className="text-2xl mt-6">Contact Information</p>
          </div>
          <div className="mt-6  flex flex-row ">

            <div className="space-y-1 px-9">

              <Label>Home</Label>
              <Checkbox
                name="Home"
              />
            </div>

            <div className="space-y-1 px-9">

              <Label>Home</Label>
              <Checkbox
                name="Home"
              />
            </div>


          </div>
          <ButtonPrimary className="fixed top-0 left-0 right-0 mt-6" href={"/pay-done"}>Confirm</ButtonPrimary>
        </div>


        <div>
          <h3 className="text-2xl font-semibold">Pay with</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
>>>>>>> e24f4beabd6b2f922a2843915f0147ca7051e95f

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
                      <Input type="date" defaultValue="MM/YY" />
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
<<<<<<< HEAD
      
=======
            <div className="pt-8">

            </div>
>>>>>>> e24f4beabd6b2f922a2843915f0147ca7051e95f
          </div>
        </div>
      </div>
    );
  };

  // return (
  //   <div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
  //     <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
  //       {/* <div className="hidden lg:block flex-grow w-6/12">{renderContactDetails()}</div>
  //       <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 w-6/12">{renderMain()}</div>
  //       <div className="hidden lg:block flex-grow w-6/12">{renderSidebar()}</div> */}
        
  //       <div className="grid grid-cols-2 gap-4 w-screen ">
          
  //       <div className="w-3/5 lg:w-9/12 xl:w-9/12 lg:pr-10">{renderContactDetails()}</div>
  //       <div className="w-2/5 lg:w-9/12 xl:w-9/12 lg:pr-10">{renderSidebar()}</div>
  //       <div className="w-1/2 lg:w-9/12 xl:w-9/12 lg:pr-10">{renderMain()}</div>
  //       </div>
  //     </main>
  //   </div>
  // );
  return (
    <div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
<<<<<<< HEAD
        
        <div className="w-full lg:w-w-4/6 xl:w-w-4/6 lg:pr-10">{renderContactDetails()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
=======
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className=" lg:block flex-grow">{renderSidebar()}</div>
>>>>>>> e24f4beabd6b2f922a2843915f0147ca7051e95f
      </main>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
      <div className="lg:w-w-4/6 xl:w-w-4/6 lg:pr-10">{renderMain()}</div>
      </main>
    </div>
  );
};

export default CheckOutPage;