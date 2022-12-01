import React, { FC, useEffect, useState } from "react";
import Heading from "components/Heading/Heading";
import { getAllUserAddress } from "services/apiServices";
// import {BiHome} from "react-icons/bi";
// import {FaBusinessTime} from "react-icons/fa";

export interface Statistic {
  id: string;
  heading: string;
  address: string;
  icon:any;
}
export interface ManageAddressProps {
  className?: string;
}

  const ManageAddress: FC<ManageAddressProps> = ({ className = "" }) => {
    const [userAddress,setUserAddress] = useState<any>([])

    //get user address
    const getAllAddressData =async () => {
    const response = await getAllUserAddress(1)
    if(response.data){
      let tempData : any  = [];
      if(response.data.response === "success"){
        response.data.data.map((item: any, key: number) => {
          tempData[key] = {
            id: item.id,
            addressType:item.type,
            address: item.address,
        }      
        })
        setUserAddress(tempData)
      }
      
    }
  }
  useEffect(()=>{
    getAllAddressData();
  },[])
  
    return (
      <div className={`nc-ManageAddress relative ${className}`}>
        <h1 className="font-semibold pb-8 text-xl ">Manage Address</h1>
        <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-8 bg-neutral-50 px-10 py-10">
          {userAddress.map((item:any) => (
            <div
              key={item.id}
              className="p-6 bg-slate-100  dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
            >
              <div className="columns-8 ">
              {/* {item.addressType=="Home"?<BiHome/>:item.addressType=="Business"?<FaBusinessTime/>:""} */}
              <h3 className="font-semibold leading-none text-neutral-900 md:text-lg dark:text-neutral-200">
              {item.addressType}
              </h3>
              </div>
              <span className="block text-sm text-neutral-500 mt-3 sm:text-sm dark:text-neutral-400 px-12">
                {item.address}
              </span>
            </div>
          ))}
  
        </div>
      </div>
    );
  };
export default ManageAddress;
