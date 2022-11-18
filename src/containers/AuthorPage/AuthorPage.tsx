

import React, { FC, Fragment, useState } from "react";

import { Helmet } from "react-helmet";

import RestraurantPage from "containers/RestraurantPage/RestraurantPage"

import SectionGridFilterCard from "containers/ListingRealEstatePage/SectionGridFilterCard";
import SectionHero2 from "components/SectionHero2/SectionHero2";
export interface AuthorPageProps {
  className?: string;
}


const AuthorPage: FC<AuthorPageProps> = ({ className = "" }) => {
  let [categories] = useState(["Stays", "Experiences", "Car for rent"]);

  const renderSidebar = () => {
    return (


      // <div className="flex items-start ">
      //   <ul className="nav nav-tabs flex flex-col flex-wrap list-none border-b-0 pl-0 mr-4" id="tabs-tabVertical"
      //     role="tablist">
      //     <li className="nav-item flex-grow text-center" role="presentation">
      //       <a href="#tabs-homeVertical" className="
      //     nav-link
      //     block
      //     font-medium
      //     text-xs
      //     leading-tight
      //     uppercase
      //     border-x-0 border-t-0 border-b-2 border-transparent
      //     px-6
      //     py-3
      //     my-2
      //     hover:bg-gray-100
      //     focus:border-transparent
      //     active
      //   " id="tabs-home-tabVertical" data-bs-toggle="pill" data-bs-target="#tabs-homeVertical" role="tab"
      //         aria-controls="tabs-homeVertical" aria-selected="true">Home</a>
      //     </li>
      //     <li className="nav-item flex-grow text-center" role="presentation">
      //       <a href="#tabs-profileVertical" className="
      //     nav-link
      //     block
      //     font-medium
      //     text-xs
      //     leading-tight
      //     uppercase
      //     border-x-0 border-t-0 border-b-2 border-transparent
      //     px-6
      //     py-3
      //     my-2
      //     hover:border-transparent hover:bg-gray-100
      //     focus:border-transparent
      //   " id="tabs-profile-tabVertical" data-bs-toggle="pill" data-bs-target="#tabs-profileVertical" role="tab"
      //         aria-controls="tabs-profileVertical" aria-selected="false">Profile</a>
      //     </li>
      //     <li className="nav-item flex-grow text-center" role="presentation">
      //       <a href="#tabs-messagesVertical" className="
      //     nav-link
      //     block
      //     font-medium
      //     text-xs
      //     leading-tight
      //     uppercase
      //     border-x-0 border-t-0 border-b-2 border-transparent
      //     px-6
      //     py-3
      //     my-2
      //     hover:border-transparent hover:bg-gray-100
      //     focus:border-transparent
      //   " id="tabs-messages-tabVertical" data-bs-toggle="pill" data-bs-target="#tabs-messagesVertical" role="tab"
      //         aria-controls="tabs-messagesVertical" aria-selected="false">Messages</a>
      //     </li>
      //   </ul>

      // </div>
      
      
        <RestraurantPage />
      




    );
  };

  const renderSection1 = () => {
    return (
      //       <div className="listingSection__wrap">

      //         <div className=" w-14 border-b border-neutral-200 dark:border-neutral-700"></div>



      // { 
      //         <div>
      //           <Tab.Group>
      //             <Tab.List className="flex space-x-1 overflow-x-auto">
      //               {categories.map((item) => (
      //                 <Tab key={item} as={Fragment}>
      //                   {({ selected }) => (
      //                     <button
      //                       className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${selected
      //                         ? "bg-secondary-900 text-secondary-50 "
      //                         : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
      //                         } `}
      //                     >
      //                       {item}
      //                     </button>
      //                   )}
      //                 </Tab>
      //               ))}
      //             </Tab.List>
      //             <Tab.Panels>
      //               <Tab.Panel className="">
      //                 <div className="grid grid-rows-4 grid-flow-col gap-4">
      //                   {DEMO_STAY_LISTINGS.filter((_, i) => i < 4).map((stay) => (
      //                     <>

      //                     <PropertyCardH key={stay.id} data={stay} />
      //                     </>
      //                   ))}
      //                 </div>
      //                 <div className="flex mt-11 justify-center items-center">
      //                   <ButtonSecondary>Show me more</ButtonSecondary>
      //                 </div>
      //               </Tab.Panel>
      //             </Tab.Panels>
      //           </Tab.Group>
      //         </div> }
      //       </div>
      
      <div className=" flex-1 p-7">
        <SectionGridFilterCard className="py-14 lg:py-15" />
      </div>
    );
  };



  return (
    
    <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
      <SectionHero2 />
      <Helmet>
        <title>Restraunt || ATE</title>
      </Helmet>
      <main className="flex flex-row ">
        
          <div className="">{renderSidebar()}</div>
        
        <div className="w-full  space-y-4 lg:space-y-10 lg:pl-1 flex-shrink  ">
          {renderSection1()}
        </div>
      </main>
    </div>
  );
};

export default AuthorPage;
