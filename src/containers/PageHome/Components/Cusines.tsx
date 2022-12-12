import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import { TaxonomyType } from "data/types";
import { Link } from "react-router-dom";
import convertNumbThousand from "utils/convertNumbThousand";

export interface CusinesProps {
  className?: string;
  taxonomy: TaxonomyType;
}

const Cusines: FC<CusinesProps> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, href = "/", thumbnail } = taxonomy;
  return (
    <Link
      to={href}
      className={`nc-Cusines flex flex-col ${className}`}
      data-nc-id="Cusines"
    >
      <div
        className={`flex-shrink-0 relative w-full hover:drop-shadow-2xl overflow-hidden group`}
      >
        <NcImage
          src={thumbnail}
          className="object-cover rounded-full "
        />
     
      </div>
      <div className="mt-2 ml-10 right-10">
        <h2
          className={` sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate `}
        >
          {name}
        </h2>
      </div>
    </Link>
  );
};

export default Cusines;
