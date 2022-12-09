import React, { FC, useEffect, useState } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import Pagination from "shared/Pagination/Pagination";
import Heading2 from "components/Heading/Heading2";
import ProductCard from "../components/ProductCard";
import { getAllOrdersAPI } from "services/apiServices";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: StayDataType[];
  ordersData?:any
}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const SectionGridFilterCardMyOrders: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = DEMO_DATA,
  ordersData
}) => {
  
  const [allOrdersData,setAllOrdersData]=useState<any>([]);

  const getAllOrdersData=async()=>{
    const response=await getAllOrdersAPI(1);
    if(response.data){
      console.log(response.data.orders)
      let tempData:any=[]
      if(response.data.response==="success"){
        response.data.orders.map((item:any,key: number)=>{
            tempData[key]={
              id:item.id,
              user_id:item.user_id,
              order_date:item.order_date,
              order_time:item.order_time,
              delivery_fee: item.delivery_fee,
              total_amount:item.total_amount,
              status:item.status,
              is_deleted: item.is_deleted,
             
        }})
        setAllOrdersData(tempData);
        console.log(tempData)
      }
    }
}

useEffect(()=>{
  getAllOrdersData()
},[])

  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      {/* <Heading2 className="px-10 py-10"
        heading="MyOrders"
       
      /> */}
      <h1 className="font-semibold text-xl pb-10">My Orders</h1>
      <div className="grid grid-cols-1 gap-3 md:gap-8 xl:grid-cols-1">
      
        {/* {data.map((stay) => (
          <ProductCard key={stay.id} data={stay} />
        ))} */}

        {ordersData.map((item:any, key:number) => (        
          <ProductCard key={key} ordersData={item}/>
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        {/* <Pagination /> */}
      </div>
    </div>
  );
};

export default SectionGridFilterCardMyOrders;
