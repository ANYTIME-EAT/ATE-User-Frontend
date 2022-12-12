import React, { FC, useState } from "react";
import Heading from "shared/Heading/Heading";
import img from '../../RestraurantPage/control.png'

export interface RestraurantPageProps {
  data?: any;
  changeAuthor(index: number, title: string): void;
  crrAuthor?:any;
}

const RestraurantPage: FC<RestraurantPageProps> = ({ data, changeAuthor,crrAuthor }) => {
  const [open, setOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-black dark:bg-opacity-20 ">

      <div
        className={` ${open ? "w-72" : "w-1 "
          }  h-20 p-5  pt-8 relative duration-300`}
      >
        
        <div className="flex gap-x-4 items-center">

          <h1
            className={`text-black dark:text-gray-100 origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
          </h1>
        </div>
        <ul className="pt-6">
          {data.map((Menu: any, index: number) => (
            <li
              onClick={() => {changeAuthor(index, Menu.title); setActiveIndex(index)} }
              key={index}
              // className={`flex  rounded-md p-2 cursor-pointer hover:bg-blue-100 hover:font-bold dark:hover:bg-slate-400 dark:hover:text-black   text-lg items-center gap-x-4 
              //  ${index === crrAuthor.id && "bg-gray-900"} `}
               className={`flex  rounded-md p-3 cursor-pointer   text-md items-center gap-x-4 
               ${index === activeIndex && "bg-blue-100 dark:bg-slate-400 dark:text-black font-bold "} ${!open && "hidden"} `}
              //  style={{backgroundColor: index == crrAuthor.id? "bg-gray-900": ""}}
            >

              <span className={`${!open && "hidden"} duration-200 py-3`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};
export default RestraurantPage;