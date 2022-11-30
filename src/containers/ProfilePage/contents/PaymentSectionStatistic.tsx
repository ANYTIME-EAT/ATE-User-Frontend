import React, { FC } from "react";
import Heading from "components/Heading/Heading";

export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

const FOUNDER_DEMO: Statistic[] = [
  {
    id: "1",
    heading: "4123-XXXXXXXX-1234",
    subHeading:
      "VALID TILL 07/2022",
  },
  {
    id: "2",
    heading: "4555-XXXXXXXX-4321",
    subHeading: "VALID TILL 04/2025",
  },
];

export interface SectionStatisticProps {
  className?: string;
}

const PaymentSectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <h1 className="font-semibold pb-8 text-xl">Payment</h1>
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-8 bg-neutral-50 px-20 py-10">
        {FOUNDER_DEMO.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-slate-100  dark:bg-neutral-800 rounded-2xl dark:border-neutral-800 columns-2"
          >
            <h3 className="not-italic text-xs font-normal">
              {item.heading}
            </h3>
            <span className="not-italic text-xs font-normal">
              {item.subHeading}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>
        ))}
      </div>
      

    </div>
  );
};

export default PaymentSectionStatistic;