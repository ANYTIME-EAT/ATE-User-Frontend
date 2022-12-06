import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";

export interface StartRatingProps {

  className?: string;
  point?: number;
  reviewCount?: number;
  comboMenuData? : any;

}

const StartRating: FC<StartRatingProps> = ({
  className = "",
  point = 4.5,
  reviewCount = 112,
  comboMenuData
}) => {
  return (
    <div
      className={`nc-StartRating flex  space-x-1 text-sm  ${className}`}
      data-nc-id="StartRating"
    >
      <div className="pb-[2px]">
        <StarIcon className="w-[18px] h-[18px] text-orange-500" />
      </div>
      <span className="font-medium text-black dark:text-white">{point}</span>
      <span className="text-neutral-500 dark:text-neutral-400">
        ({reviewCount})
      </span>
    </div>
  );
};

export default StartRating;
