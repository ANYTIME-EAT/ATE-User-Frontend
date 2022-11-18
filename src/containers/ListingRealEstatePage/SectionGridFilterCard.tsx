import React, { FC } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import PropertyCardH from "components/PropertyCardH/PropertyCardH";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: StayDataType[];
}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2
        heading="Recomended"
       
      />

      
      <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2 ">
        {data.map((stay) => (
          <PropertyCardH key={stay.id} data={stay} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        {/* <Pagination /> */}
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
