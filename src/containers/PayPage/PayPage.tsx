import StartRating from "components/StartRating/StartRating";
import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import { getAvatar } from "services/apiServices";
import { stat } from "fs";
import tick from "images/checked.png"

export interface PayPageProps {
  className?: string;
}

const PayPage: FC<PayPageProps> = ({ className = "" }) => {
  const { state } = useLocation();

  const [images, setImages] = useState<any>([]);
  const [total_amount, setTotal] = useState<number>(0)

  const getProfile = (list: any) => {
    list.map(async (item: any, key: number) => {
      let file = await getAvatar(item.image)
      setImages((s: any) => {
        return [
          ...s, {
            id: item.id,
            author: item.author,
            image: URL.createObjectURL(file)
          }
        ]
      })
    })
  }

  const getProductImg = (id: number, author: string) => {
    let product_image = "";
    images && images.map((item: any) => {
      if (item.id == id && item.author == author) {
        product_image = item.image;
      }
    })
    return product_image;
  }

  useEffect(() => {
    if (state?.data) {
      getProfile(state.data)
    }
  }, [])

  const renderContent = () => {
    return (
      // <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
      //   <h2 className="text-3xl lg:text-4xl font-semibold">
      //     Congratulation 🎉 
      //   </h2>

      //   <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

      //   {/* ------------------------ */}

      //   <div className="flex flex-col max-w-2xl p-1 dark:bg-inherit dark:text-gray-100  sm:rounded-2xl  space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">

      //     <div className="flex flex-col ">
      //       {state?.data && state.data.map((item: any, key: number) => {
      //         return [
      //           <div className="flex w-full space-x-2 sm:space-x-4 mb-3">
      //             <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent  rounded-2xl overflow-hidden" src={getProductImg(item.id, item.author)} loading="lazy" />
      //             <div className="flex lex-row justify-between w-full pb-4 ml-11">
      //               <div className="flex justify-between w-full pb-2 space-x-2">
      //                 <div className="space-y-1">
      //                   <div className="py-5 sm:px-5 space-y-3">
      //                     <div>
      //                       <span className="text-base font-medium mt-1 block">
      //                         {item.name}
      //                       </span>
      //                     </div>
      //                     <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
      //                       Quantity : {item.quantity}
      //                     </span>
      //                     <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
      //                       Price : {item.price}
      //                     </span>
      //                     {/* <div className="text-center f">
      //                       <p className="text-center">{item.price * item.quantity} €</p>
      //                     </div> */}
      //                     <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>

      //                   </div>
      //                 </div>
      //               </div>

      //             </div>
      //           </div>
      //         ]
      //       })}


      //     </div>
      //   </div>

      //   {/* ------------------------ */}
      //   <div className="space-y-6">
      //     <h3 className="text-2xl font-semibold">Order detail</h3>
      //     <div className="flex flex-col space-y-4">
      //       <div className="flex text-neutral-6000 dark:text-neutral-300">
      //         <span className="flex-1">Order code</span>
      //         <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
      //           #222-333-111
      //         </span>
      //       </div>
      //       <div className="flex text-neutral-6000 dark:text-neutral-300">
      //         <span className="flex-1">Date</span>
      //         <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
      //           {new Date().toLocaleString()}
      //         </span>
      //       </div>
      //       <div className="flex text-neutral-6000 dark:text-neutral-300">
      //         <span className="flex-1">Total</span>
      //         <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
      //           {state?.total_amount} €
      //         </span>
      //       </div>
      //       <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
      //         <span className="flex-1">Payment method</span>
      //         <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
      //           Credit card
      //         </span>
      //       </div>
      //     </div>
      //   </div>
      //   <div>
      //     <ButtonPrimary href="/">Find more Food</ButtonPrimary>
      //   </div>
      // </div>
      <>

        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto rounded-2xl dark:bg-gray-800 bg-gray-100 shadow-2xl ">


          <div className="flex justify-start space-y-3 flex-col items-center ">
            <div>
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffff" className="w-40 h-40 fill-green-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg> */}
              <NcImage
                src={tick}
                className="object-cover" />

            </div>

            <h1 className="text-2xl dark:text-white lg:text-3xl font-semibold   text-gray-500">
              ThankYou for Your Order
            </h1>
            <h6 className="text-lg dark:text-white lg:text-2xl  text-gray-800 bg-green-200 px-7 rounded-lg gap-y-8">Order Number #13432</h6>
            <p className=" dark:text-gray-300 font-medium  text-gray-600">21st Mart 2021 at 10:34 PM</p>
            <p className=" dark:text-gray-300 font-medium  text-gray-600">Payment Method : Credit Card</p>
          </div>

          <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0 ">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start dark:bg-gray-800  bg-gray-100 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p className="text-lg md:text-xl dark:text-white font-semibold  text-gray-800">Order Summary</p>
                {state?.data && state.data.map((item: any, key: number) => {
                  return [
                    <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                      <div className="pb-4 md:pb-8 w-40">
                        <img className="flex-shrink-0 object-fill w-full h-full dark:border-transparent rounded-md" src={getProductImg(item.id, item.author)} loading="lazy" />

                      </div>
                      <div className=" border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-md dark:text-white xl:text-lg font-semibold leading-4 text-gray-800">{item.name}</h3>

                        </div>
                        <div className="flex justify-start items-start flex-col space-y-2  w-full">
                          <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-500 text-gray-400">Quantity: </span>{item.quantity}</p>
                          <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-500 text-gray-400">Price: </span>
                            {item.price * item.quantity} €</p>
                          <NcImage
                            src={tick}
                            className="w-5 h-5"
                          />
                        </div>
                      </div>
                    </div>
                  ]
                })}

              </div>
            </div>

          </div>


          <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-end  md:space-x-6 xl:space-x-8 w-full border-t border-dashed border-gray-400">
            <div className=" border-gray-200  flex-col  items-end w-full  md:space-y-0 my-5">
              <div className="flex justify-start items-end flex-col space-y-2  w-full">
                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-500 text-gray-400">Total: </span> {state?.total_amount} €</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={`nc-PayPage ${className}`} data-nc-id="PayPage">
      <main className="container mt-11 mb-24 lg:mb-32 ">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
};

export default PayPage;
