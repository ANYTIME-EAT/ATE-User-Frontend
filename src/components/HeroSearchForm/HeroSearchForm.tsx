import React, { FC, useState } from "react";
import ExperiencesSearchForm from "./ExperiencesSearchForm";
import StaySearchForm from "./StaySearchForm";
// import RentalCarSearchForm from "./RentalCarSearchForm";
// import FlightSearchForm from "./FlightSearchForm";

export type SearchTab = "Delivery" | "Pickup" | "Dining" ;

export interface HeroSearchFormProps {
  className?: string;
  currentTab?: SearchTab;
  currentPage?: "Delivery" | "Pickup" | "Dining" ;
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
  currentTab = "Delivery",
  currentPage,
}) => {
  const tabs: SearchTab[] = ["Delivery", "Pickup", "Dining", ];
  const [tabActive, setTabActive] = useState<SearchTab>(currentTab);

  const renderTab = () => {
    return (
      <ul className="mx-96 items-center flex space-x-12  lg:space-x-32 overflow-x-auto hiddenScrollbar mb-10">
        {tabs.map((tab) => {
          const active = tab === tabActive;
          return (
            <li
              onClick={() => setTabActive(tab)}
              className={`flex-shrink-0 flex items-center cursor-pointer  text-3xl font-medium ${
                active
                  ? ""
                  : "text-neutral-100 hover:text-neutral-200 dark:hover:text-neutral-400"
              } `}
              key={tab}
            >
              {active && (
                <span className="block w-3.5 h-3.5 rounded-full  bg-red-800  mr-2" />
              )}
              <span>{tab}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderForm = () => {
    const isArchivePage = !!currentPage && !!currentTab;
    switch (tabActive) {
      case "Delivery":
        return <ExperiencesSearchForm haveDefaultValue={isArchivePage} />;
      case "Pickup":
        return <ExperiencesSearchForm haveDefaultValue={isArchivePage} />;
      case "Dining":
        return <ExperiencesSearchForm haveDefaultValue={isArchivePage} />;
      // case "Flights":
        // return <FlightSearchForm haveDefaultValue={isArchivePage} />;

      default:
        return null;
    }
  };

  return (
    <div
      className={`nc-HeroSearchForm  w-full  py-5 lg:py-0 ${className}`}
      data-nc-id="HeroSearchForm"
    >
      {renderTab()}
      <div className="mr-12"> {renderForm()}</div>
    </div>
  );
};

export default HeroSearchForm;
