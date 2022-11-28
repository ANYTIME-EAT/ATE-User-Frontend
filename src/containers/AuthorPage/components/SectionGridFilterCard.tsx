import React, { FC } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
// import Pagination from "shared/Pagination/Pagination";
// import PropertyCardH from "components/PropertyCardH copy/PropertyCardH";
import Heading2 from "./Heading2";
// import Heading2 from "components/Heading/Heading2";
// import ProductCard from "components/PrductCard/ProductCard";
import ProductCard from "./ProductCard";


export interface SectionGridFilterCardProps {
  className?: string;
  data?: StayDataType[];
  productData?: any;
  crrAuthor?:any;
}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = DEMO_DATA,
  productData,
  crrAuthor
}) => {
  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2
        heading={crrAuthor.title}
      />

      
      <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2 ">
        {productData.map((item:any, key:number) => (
          <ProductCard key={key} productData={item} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        {/* <Pagination /> */}
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
