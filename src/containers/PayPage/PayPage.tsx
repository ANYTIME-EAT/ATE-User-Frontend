import StartRating from "components/StartRating/StartRating";
import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import { getAvatar } from "services/apiServices";
import { stat } from "fs";

export interface PayPageProps {
  className?: string;
}

const PayPage: FC<PayPageProps> = ({ className = "" }) => {
  const { state } = useLocation();

  const [images, setImages] = useState<any>([]);
  const [total_amount, setTotal] = useState<number>(0)

  const getProfile = (list:any) => {
    list.map(async(item:any,key:number) => {
        let file = await getAvatar(item.image)
        setImages((s:any) => {
            return[
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
    if(state?.data){
      getProfile(state.data)
    }   
  },[])

  const renderContent = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Congratulation 🎉 
        </h2>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* ------------------------ */}

        <div className="flex flex-col max-w-2xl p-1 dark:bg-inherit dark:text-gray-100  sm:rounded-2xl  space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
          <h3 className="text-2xl font-semibold">View Cart</h3>
          <div className="flex flex-col ">
            {state?.data && state.data.map((item: any, key: number) => {
              return [
                <div className="flex w-full space-x-2 sm:space-x-4 mb-3">
                  <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent  rounded-2xl overflow-hidden" src={getProductImg(item.id, item.author)} loading="lazy" />
                  <div className="flex lex-row justify-between w-full pb-4 ml-11">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                      <div className="space-y-1">
                        <div className="py-5 sm:px-5 space-y-3">
                          <div>
                            <span className="text-base font-medium mt-1 block">
                              {item.name}
                            </span>
                          </div>
                          <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                            Quantity : {item.quantity}
                          </span>
                          <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                            Price : {item.price}
                          </span>
                          {/* <div className="text-center f">
                            <p className="text-center">{item.price * item.quantity} €</p>
                          </div> */}
                          <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ]
            })}


          </div>
        </div>

        {/* ------------------------ */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Order detail</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Order code</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                #222-333-111
              </span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Date</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {new Date().toLocaleString()}
              </span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Total</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {state?.total_amount} €
              </span>
            </div>
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Payment method</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                Credit card
              </span>
            </div>
          </div>
        </div>
        <div>
          <ButtonPrimary href="/">Find more Food</ButtonPrimary>
        </div>
      </div>
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
