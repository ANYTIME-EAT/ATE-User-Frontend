import React, { FC, useState, useEffect } from "react";
import imagePng from "images/hero-right-3.png";
import HeroRealEstateSearchForm from "components/HeroSearchForm/HeroRealEstateSearchForm";
import Heading from "shared/Heading/Heading";
import StartRating from "./StarRating";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SquareIcon from "./SquareIcon";
import img from "images/bbq.png"
import { getAvatar } from 'services/apiServices'



export interface SectionHero2Props {
  className?: string;
  children?: React.ReactNode;
  name?: string;
  description?: string;
  address?: string;
  data?: any;
  img?: any;
}


const SectionHero2: FC<SectionHero2Props> = ({
  className = "",
  name,
  description,
  address,
  data,
  img
  // reviewStart,
  // reviewCount,
}) => {

  const [restAvatar, setRestAvatar] = useState<any>();

  const getRestaurantAvatar = async(img: any) => {
    const file = await getAvatar(img);
    setRestAvatar(URL.createObjectURL(file))
  }

useEffect(() => {
  getRestaurantAvatar(data.restaurant_avatar)
},[data])

  return (

    <div>

      <section className="text-gray-100 body-font h-50 flex bg-red-800 dark:bg-slate-900 rounded-lg">
        <div className="container px-5 py-10 mx-auto ">
          <div className="p-5 flex items-center mx-auto bg-red-900 dark:bg-slate-800 mb-1 rounded-lg sm:flex-row flex-col shadow-xl">
            <div className="sm:w-48 sm:h-48 h-50 w-50 sm:mr-10 inline-flex items-center justify-center flex-shrink-1">
              <img
                src={restAvatar}
                className="border-round-lg rounded visible"
              />
              {/* <img className="flex-shrink-0 object-cover w-40 h-40 dark:border-transparent rounded outline-none sm:w-40 sm:h-40 dark:bg-gray-500" src={restAvatar} alt={data.name} loading="lazy" /> */}
            </div>
            <div className="flex-grow text-center  mt-5">
              {/* <h1 className="text-black text-2xl title-font font-bold mb-2">Mc'Donalds</h1> */}
              <Heading
                children={data.name}
                desc={data.description}
                className=" dark:text-white "
              />
              <Heading
                children={data.address}
                desc=""
                className=" dark:text-white "
              />


              <div className="grid grid-cols-12 right-0 items-center dark:text-white  ">
                <StartRating
                  className="mt-4 text-white "
                />
                <p className="mt-4 text-xs mx-16 lg:mx-0">23 mins <br /> <span>Delivery Time</span></p>
              </div>

              <div className="flex flex-col lg:flex-row  gap-6 mt-5 ">
                <div className="relative text-gray-600 focus-within:text-gray-400 mb-3">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                  </span>
                  <input type="search" name="q" className="py-2 text-sm text-white bg-red-300 border-red-300 dark:bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-red-300  focus:text-gray-900" placeholder="Search For Dishes" />
                </div>
                <div className="relative text-gray-600 focus-within:text-gray-400 mb-3 ">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="button" className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center   mr-2 mb-2">
                      <SquareIcon
                        className="mx-2 fill-red-600"
                        colorClass="" />
                      VegOnly
                    </button>
                  </div>
                </div>

                <div className="relative text-gray-600 focus-within:text-gray-400 lg:mx-24 mb-3">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="button" className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center   mr-2 mb-2">
                      <BtnLikeIcon
                        className="mx-2" />
                      Favourite
                    </button>
                  </div>
                </div>

                {/* <div className="relative text-gray-600 focus-within:text-gray-400 ">
                  <div className="relative inset-y-0 left-0 flex items-center pl-2">
                    <button  className="p-1 focus:outline-none focus:shadow-outline">
                      <BtnLikeIcon />
                    </button>
                  </div>

                </div> */}

              </div>




            </div>

          </div>

        </div>
      </section>

    </div>

  );
};

export default SectionHero2; 
