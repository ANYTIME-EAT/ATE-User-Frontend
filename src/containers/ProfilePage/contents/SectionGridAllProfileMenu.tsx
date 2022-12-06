import React, { FC, ReactNode, useEffect, useState } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import StayCard from "components/StayCard/StayCard";
import HeaderFilter from "containers/PageHome/HeaderFilter";
import { getAllFavouritesAPI } from "services/apiServices";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridAllMenuProps {
  favourites_Data?:any;
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridAllprofileMenu: FC<SectionGridAllMenuProps> = ({
  favourites_Data,
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "",
  subHeading = "",
  headingIsCenter,
  tabs = [],
}) => {
  const renderCard = (data: any) => {
    console.log(data)
    return <StayCard key={data.id} favouritesData={data} />;
  };

//get all favourites

const [allFavouritesData,setAllFavouritesData]=useState<any>([]);

const getAllFavouritesData=async()=>{
    const response=await getAllFavouritesAPI(1);
    if(response.data){
      console.log(response.data.products)
      let tempData:any=[]
      if(response.data.response==="success"){
        response.data.products.map((item:any,key: number)=>{
            tempData[key]={
              id:item.id,
              name:item.name,
              description:item.description,
              category_id:item.category_id,
              restaurant_id: item.restaurant_id,
              food_type:item.food_type,
              combo_menu_id:item.combo_menu_id,
              is_availability:item.is_availability,
              price: item.price,
              quantity:item.quantity,
              is_addons:item.is_addons,
              offer:item.offer,
              product_avatar: item.product_avatar,
              is_deleted:item.is_deleted,
              createdAt:item.createdAt,
              updatedAt:item.updatedAt,
        }})
        setAllFavouritesData(tempData);
        console.log(tempData)
      }
    }
}

useEffect(()=>{
  getAllFavouritesData()
},[])

  return (
    <div className="nc-SectionGridAllMenu relative">
      {/* <HeaderFilter
        tabActive={""}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
        onClickTab={() => {}}
      /> */}
      <h1 className="font-semibold text-xl pb-10">Favourites</h1>
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        
        {/* {DEMO_DATA.map((stay) => renderCard(stay))} */}
        {/* favouritesData */}
        {allFavouritesData.map((data: any) => renderCard(data))}
      </div>
      
      
    </div>
  );
};

export default SectionGridAllprofileMenu;
