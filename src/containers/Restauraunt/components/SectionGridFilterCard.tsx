import React, { FC } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import Heading2 from "./Heading2";
import ProductCard from "./ProductCard";


export interface SectionGridFilterCardProps {
  className?: string;
  data?: StayDataType[];
  productData?: any;
  crrAuthor?:any;
  setNewProduct(val:boolean): void;
}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = DEMO_DATA,
  productData,
  crrAuthor,
  setNewProduct
}) => {
  return (
    <div
      className={`nc-SectionGridFilterCard   ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2
        heading={""}
        //crrAuthor?.title
      />
      
      <div className="grid grid-cols-1 gap-6 md:gap-3 ">
        {productData.map((item:any, key:number) => (        
          <ProductCard key={key} productData={item} setNewProduct={setNewProduct} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center ">
        {/* <Pagination /> */}
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
