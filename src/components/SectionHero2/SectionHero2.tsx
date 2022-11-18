import React, { FC } from "react";
import imagePng from "images/hero-right-3.png";
import HeroRealEstateSearchForm from "components/HeroSearchForm/HeroRealEstateSearchForm";

export interface SectionHero2Props {
  className?: string;
  children?: React.ReactNode;
}

const SectionHero2: FC<SectionHero2Props> = ({ className = "", children }) => {
  return (
    <div
      className={`nc-SectionHero2 relative h-64 bg-red-400 ${className}`}
      data-nc-id="SectionHero2"
    >
      
      <h2 className="font-semibold text-4xl md:text-5xl xl:text-7xl !leading-[110%]">
                Find Your Best
              </h2>
      {/* <div className="absolute inset-y-0 w-5/6 xl:w-3/4 left-0 flex-grow">
        <img
          className="absolute inset-0 object-cover w-full h-full"
          src={imagePng}
          alt="hero"
        />
      </div> */}
      <div className="relative py-14 lg:py-20">
        
        </div>
        
      </div>
    
  );
};

export default SectionHero2;
