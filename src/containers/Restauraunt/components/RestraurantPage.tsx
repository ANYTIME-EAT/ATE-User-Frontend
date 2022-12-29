import React, { FC, useState } from "react";
import Heading from "shared/Heading/Heading";



export interface RestraurantPageProps {
  data?: any;
  changeAuthor(index: number, title: string): void;
  crrAuthor?: any;
}

const RestraurantPage: FC<RestraurantPageProps> = ({ data, changeAuthor, crrAuthor }) => {
  const [open, setOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="flex h-screen w-full bg-gray-100 dark:bg-black dark:bg-opacity-20 rounded-3xl ">

      <div
        className={` ${open ? "w-72" : "w-1 "
          }  h-20 p-5  pt-8 relative duration-300`}
      >
       
        <div className="flex gap-x-4 items-end">

          <h1
            className={` dark:text-gray-100 origin-right font-medium text-xl duration-200`}
          >
          </h1>
         
        </div>
        <ul className="pt-6 items-end">
          {data.map((Menu: any, index: number) => (
           
              <li
                onClick={() => {changeAuthor(index, Menu.title); setActiveIndex(index) }}
                key={index}
                
                className={`flex  rounded-md p-3 cursor-pointer bg 
               ${index === activeIndex && " text-red-500 dark:bg-slate-400"} `}
              >

                <span className={`py-4 text-right`}>
                  {Menu.title}
                </span>
                <span className={`${index === activeIndex && " text-red-500  "} `}>

                </span>
              </li>
            
          ))}
        </ul>
      </div>

    </div>
  );
};
export default RestraurantPage;