import { Popover, Transition } from "@headlessui/react";
import React, { FC, Fragment, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import Heading from "shared/Heading/Heading";
import img from '../RestraurantPage/control.png'

export interface RestraurantPageProps {
  data?: any;
  handleActivePage(id: number, title: string) : void;
}

const Menus=[
    {
        title:"Manage Address"
        
    },
    {
      title:"Favourites"
      
  },
    {
        title:"Payment"
        
    },
    {
        title:"My Order"
        
    },
    // {
    //     title:"Referral"
        
    // },
    // {
    //     title:"Refund History"
        
    // },
    {
        title:"Promotional"
        
    },
    // {
    //     title:"Change Language"       
    // },
    {
      title:"Settings", 
      subMenu:true,
      subMenuItems:[
        {title:"Edit Profile"},
        {title:"Manage Address"},
        {title:"Change Language"},
      ]   
    },
    
]

const RestraurantPage: FC<RestraurantPageProps> = ({ data, handleActivePage }) => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <div className="flex relative h-screen bg-gray-100 dark:bg-black dark:bg-opacity-20 ">

      <div
        className={` ${open ? "w-72" : "w-1 "
          }  h-20 p-5  pt-8 relative duration-300`}
      >
        <img
          src={img}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">

          <h1
            className={`text-black dark:text-gray-100 origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((menu: any, index: number) => (
            <>
              <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-blue-100 hover:font-bold dark:hover:bg-slate-400 dark:hover:text-black  text-lg items-center gap-x-4 
               ${index === 0 && "bg-light-white"
                } `}
              onClick={() => handleActivePage(index, menu.title)}>
              <span className={`${!open && "hidden bg-blue-100 "} origin-left duration-200 py-3`}>
                {menu.title}
              </span>
              {menu.subMenu && open && (
                <BsChevronDown className={`${subMenuOpen && "rotate-180"}`} onClick={()=>{setSubMenuOpen(!subMenuOpen)}}/>
              )}
            </li>
            {menu.subMenu && subMenuOpen && open &&(
                <ul>
                  {menu.subMenuItems.map((subMenuItem:any,index:number)=>(
                    <li key={index} className={`flex 
                    rounded-md p-2 px-5 cursor-pointer hover:bg-blue-100 hover:font-bold dark:hover:bg-slate-400 dark:hover:text-black  text-lg items-center gap-x-4 
                    ${index === 0 && "bg-light-white"
                     } `}
                     onClick={()=>handleActivePage(index,subMenuItem.title)}
                     >
                      {subMenuItem.title}
                     </li>
                  ))}
                </ul>
            )}
            </>
            
          ))}
          
        </ul>
      </div>

    </div>
  );
};
export default RestraurantPage;