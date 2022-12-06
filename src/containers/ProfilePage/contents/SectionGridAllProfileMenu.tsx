import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import StayCard from "components/StayCard/StayCard";
import HeaderFilter from "containers/PageHome/HeaderFilter";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridAllMenuProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridAllprofileMenu: FC<SectionGridAllMenuProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "",
  subHeading = "",
  headingIsCenter,
  tabs = [],
}) => {
  const renderCard = (stay: StayDataType) => {
    console.log(stay)
    return <StayCard key={stay.id} data={stay} />;
  };

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
        
        {DEMO_DATA.map((stay) => renderCard(stay))}
      </div>
      
      
    </div>
  );
};

export default SectionGridAllprofileMenu;
