import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "../HeaderFilter";
import StayCard from "../StayCard";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface AllRestMenuProps {
  combo_MenuData?:any;
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  setNewProduct(val:boolean): void;
}

const AllRestMenu: FC<AllRestMenuProps> = ({
  combo_MenuData,
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "All Rest Menu",
  subHeading = "Good Food Is Always Cooking! Order Some Yummy Items From The Menu",
  headingIsCenter,
  tabs = [],
  setNewProduct
}) => {
  const renderCard = (data:any) => {
    // console.log(data)
    return <StayCard key={data.id} comboMenuData={data} setNewProduct={setNewProduct}/>;
  };

  return (
    <div className="nc-AllRestMenu relative">
      <HeaderFilter
        tabActive={""}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
        onClickTab={() => {}}
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {combo_MenuData.map((data: any) => renderCard(data))}
      </div>
      
      
    </div>
  );
};

export default AllRestMenu;
