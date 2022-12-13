import React, { FC, useState, useEffect } from "react";
import imagePng from "images/hero-right-3.png";
import HeroRealEstateSearchForm from "components/HeroSearchForm/HeroRealEstateSearchForm";
import img from "../../images/placeholder-small.png"
import Heading from "shared/Heading/Heading";
import StartRating from "components/StartRating/StartRating";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SearchItem from "./SearchItem";



export interface SectionHero2Props {
  className?: string;
  children?: React.ReactNode;
  name?:string;
  description?:string;
  address?:string;
  data?:any;
  img?:any;
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
 
  

  return (
    
    <div>

      <section className="text-gray-100 body-font h-50 flex bg-slate-500 dark:bg-slate-900 border-round-lg">
        <div className="container px-5 py-10 mx-auto ">
          <div className="p-5 flex items-center mx-auto bg-white dark:bg-slate-800 mb-1 rounded-lg sm:flex-row flex-col shadow-lg">
            <div className="sm:w-48 sm:h-48 h-50 w-50 sm:mr-10 inline-flex items-center justify-center flex-shrink-1">
              <img
                src={img} 
                className="border-round-lg rounded"
                />
                {/* <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-20 sm:h-20 dark:bg-gray-500" src={img} alt={data.name} loading="lazy"/> */}
            </div>
            <div className="flex-grow sm:text-left text-center mt-1 sm:mt-0">
              {/* <h1 className="text-black text-2xl title-font font-bold mb-2">Mc'Donalds</h1> */}
              <Heading
                children={data.name}
                desc={data.description}
                className="text-black dark:text-white"
              />
              <p className="text-black dark:text-white">{address}</p>
              <StartRating
                className="mt-4"
              />
              

            </div>            
          </div>

        </div>
      </section>

    </div>

  );
};

export default SectionHero2; 
