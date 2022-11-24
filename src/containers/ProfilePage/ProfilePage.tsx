import React, { FC, Fragment, useState, useEffect } from "react";

import { Helmet } from "react-helmet";
import SectionHero2 from "./components/SectionHero2";
import { getRestaurantCategory,getRestaurant,getProduct } from "services/apiServices";
import RestraurantPage from "./RestraurantPage";
import SectionGridFilterCard from "./components/SectionGridFilterCard";


export interface AuthorPageProps {
  className?: string;
}


const ProfilePage: FC<AuthorPageProps> = ({ className = "" }) => {
  // let [categories] = useState(["Stays", "Experiences", "Car for rent"]);

  const [restraurantCategory, setrestraurantCategory] = useState<any>([])
  const [restaurant, setresturant] = useState<any>([])
  const [product, setProduct] = useState<any>([])

  const renderSidebar = () => {
    
      return (
        <RestraurantPage />
      );
    
  };

  const renderSection1 = () => {
    return (
     
      <div className=" flex-1 p-7">
        {product.length > 0 &&
        <SectionGridFilterCard productData={product}  className="py-14 lg:py-10" />
         } 
      </div>
      
    );
  };

  const heroSection = () => {
      return(
        <SectionHero2 data={restaurant} />
      );
  }


  return (

    <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">

      <div>{heroSection()}</div>
      
      <Helmet>
        <title>Restraunt || ATE</title>
      </Helmet>
      <main className="flex flex-row ">

        <div className="">{renderSidebar()}</div>

        <div className="w-full  space-y-4 lg:space-y-10 lg:pl-1 flex-shrink  ">
          {renderSection1()}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
