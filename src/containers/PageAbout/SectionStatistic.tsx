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
    heading: "Home",
    subHeading:
      "Ms Michael 132, My Street, Kingston, My Street, Kingston,New York 12401.",
  },
  {
    id: "2",
    heading: "Other",
    subHeading: "Ms Monica 144, My Street, Manhattan, My Street, Manhattan,New York 10451.",
  },
  {
    id: "3",
    heading: "Add address",
    subHeading:
      "Countries and regions have our presence (as of Sept. 30, 2021)",
  },
];

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-8 bg-neutral-50 px-20 py-10">
        {FOUNDER_DEMO.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-slate-100  dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
          >
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
              {item.heading}
            </h3>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
              {item.subHeading}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionStatistic;
