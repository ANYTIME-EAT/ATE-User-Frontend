import React, { FC } from "react";

export interface SaleOffBadgeProps {
  className?: string;
  desc?: string;
  saleOff?: string;
}

const SaleOffBadge: FC<SaleOffBadgeProps> = ({
  className = "", saleOff
}) => {
  return (
    <div
      className={`nc-SaleOffBadge flex items-center justify-center text-xs py-0.5 px-3 bg-red-700 text-red-50 rounded-full ${className}`}
      data-nc-id="SaleOffBadge"
    >
      {saleOff}
    </div>
  );
};

export default SaleOffBadge;
