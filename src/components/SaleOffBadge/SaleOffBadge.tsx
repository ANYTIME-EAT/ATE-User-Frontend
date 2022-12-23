import React, { FC } from "react";

export interface SaleOffBadgeProps {
  className?: string;
  desc?: any;
}

const SaleOffBadge: FC<SaleOffBadgeProps> = ({
  className,
  desc
}) => {
  return (
    <div
      className={`nc-SaleOffBadge flex items-center justify-center text-xs py-0.5 px-3 bg-green-700 text-red-50 rounded-full ${className}`}
      data-nc-id="SaleOffBadge"
      style={{display: desc?"flex":"none"}}
    >
      {desc} %
    </div>
  );
};

export default SaleOffBadge;
