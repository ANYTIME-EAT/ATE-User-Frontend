import React, { FC } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import Pagination from "shared/Pagination/Pagination";
import Heading2 from "components/Heading/Heading2";
import PropertyCardMyOrder from "components/PropertyCardMyOrder/PropertyCardMyOrder";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: StayDataType[];
}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const SectionGridFilterCardMyOrders: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      {/* <Heading2 className="px-10 py-10"
        heading="MyOrders"
       
      /> */}
      <div className="grid grid-cols-1 gap-3 md:gap-8 xl:grid-cols-1 px-10 ">
        {data.map((stay) => (
          <PropertyCardMyOrder key={stay.id} data={stay} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        {/* <Pagination /> */}
      </div>
    </div>
  );
};

export default SectionGridFilterCardMyOrders;
