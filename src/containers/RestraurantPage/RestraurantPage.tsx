import React, { FC, useState } from "react";
import Heading from "shared/Heading/Heading";
import img from '../RestraurantPage/control.png'

export interface RestraurantPageProps {
  data?: any;
}

const RestraurantPage: FC<RestraurantPageProps> = ({data}) => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Recomended",  },
    { title: "CAT1",  },
    { title: "CAT2",  },
    { title: "CAT3 ",  },
    { title: "CAT4",  },
    { title: "CAT5",  },
    { title: "CAT6 ",  },
    { title: "CAT7",  },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-black dark:bg-opacity-20 ">
      
      <div
        className={` ${ 
          open ? "w-72" : "w-20 "
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
            className={`text-black dark:text-gray-100 origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
          </h1>
          <Heading  className={`text-black origin-left  dark:text-gray-100 font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
            desc="">Choose Here</Heading>
        </div>
        <ul className="pt-6">
          {data.map((Menu: any, index: number) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-blue-100 hover:font-bold dark:hover:bg-slate-400 text-red text-sm items-center gap-x-4 
               ${
                index === 0 && "bg-light-white"
              } `}
            >
              
              <span className={`${!open && "hidden bg-blue-100 "} origin-left duration-200`}>
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