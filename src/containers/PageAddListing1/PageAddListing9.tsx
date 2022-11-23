import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import useWindowSize from "hooks/useWindowResize";
import moment from "moment";
import React, { FC, useState } from "react";
import { DayPickerSingleDateController } from "react-dates";
import CommonLayout from "./CommonLayout";

export interface PageAddListing9Props {}

const PageAddListing9: FC<PageAddListing9Props> = () => {
 
  const windowSize = useWindowSize();

  const getDaySize = () => {
    if (windowSize.width <= 600) {
      return undefined;
    }
    return 56;
  };

  return (
    <CommonLayout
      index="09"
      backtHref="/add-listing-8"
      nextHref="/add-listing-10" >
      <>
        
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-7">
          {/* ITEM */}
          <NcInputNumber label="Nights min" defaultValue={1} />
          <NcInputNumber label="Nights max" defaultValue={99} />
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing9;
