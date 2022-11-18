import React, { FC } from "react";
import imagePng from "images/hero-right-3.png";
import HeroRealEstateSearchForm from "components/HeroSearchForm/HeroRealEstateSearchForm";
import img from "../../images/placeholder-small.png"
import Heading from "shared/Heading/Heading";
import StartRating from "components/StartRating/StartRating";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";

export interface SectionHero2Props {
  className?: string;
  children?: React.ReactNode;
}


const SectionHero2: FC<SectionHero2Props> = ({ 
  className = "",
   children 
  // reviewStart,
    // reviewCount,
  }) => {
  return (
    // < !--component -- >
    <div>

      <section className="text-gray-100 body-font h-50 flex bg-slate-100 dark:bg-slate-900 border-round-lg">
        <div className="container px-5 py-10 mx-auto ">
          <div className="p-5 flex items-center mx-auto   mb-1 rounded-lg sm:flex-row flex-col shadow-lg">
            <div className="sm:w-48 sm:h-48 h-50 w-50 sm:mr-10 inline-flex items-center justify-center flex-shrink-1">
              <img
                src={imagePng} 
                className="border-round-lg"
                />
            </div>
            <div className="flex-grow sm:text-left text-center mt-1 sm:mt-0">
              {/* <h1 className="text-black text-2xl title-font font-bold mb-2">Mc'Donalds</h1> */}
              <Heading
                children="Mc'Donalds"
                desc="Mc'Donalds"
                className="text-black dark:text-white"
              />
              <p className="text-black dark:text-white">address</p>
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
