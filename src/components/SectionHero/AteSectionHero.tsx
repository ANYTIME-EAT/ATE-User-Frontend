import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import imagePng from "images/hero-right.png";
import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";
import "./hero.css"

export interface AteSectionHeroProps {
  className?: string;
}

const AteSectionHero: FC<AteSectionHeroProps> = ({ className = "" }) => {
  return (
    <div className="bg-hero">
      <div
        className={`flex lg:flex-col relative text-white ${className}`}
      >
        <div className="flex flex-col lg:flex-row ">
          <div className="flex flex-col items-center space-y-4 sm:space-y-10 pb-12 lg:pb-64 md:ml-40">
            <h2 className="font-medium text-xl ml-6 md:text-5xl xl:text-7xl">
              Discover the best Food & Drinks
            </h2>


          </div>
          {/* <div className="flex">
          <img className="w-full" src={imagePng} alt="hero" />
        </div> */}
        </div>

        <div className="hidden lg:block z-10 mb-8 lg:mb-0 lg:-mt-40 w-full">
          <HeroSearchForm className="mx-32" />
        </div>
      </div>
    </div>
  );
};

export default AteSectionHero;
