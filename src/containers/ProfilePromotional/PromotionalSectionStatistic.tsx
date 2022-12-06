import React, { FC } from "react";
import Heading from "components/Heading/Heading";
import Referal from "images/userProfile/referal.jpg"

const PromotionalSectionStatistic= ({ className = "" }) => {
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      
    <div className="grid md:grid-cols-1 gap-6 lg:grid-cols-1 xl:gap-8 bg-neutral-50 px-10 py-10">
        
      <div className="grid grid-cols-1 items-center shadow-xl box-content h-500 w-500 p-4 border-4 px-50 py-10">
        <div className="mb-4 gap-8 columns-2" >
          <img src={Referal} className="max-w-full h-auto rounded-lg" alt=""/>
          <div>  
            <p>Referral Code</p></div>
            <div className="box-border h-10 w-48 text-center p-1 border-2 align-middle mb-4">ANYTIMEEAT-10571</div>
            <button className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Invite Friends</button>
          </div>
      </div>

      </div>
    </div>
  );
};

export default PromotionalSectionStatistic;
