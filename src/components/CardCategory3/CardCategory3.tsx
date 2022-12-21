import React, { FC, useState, useEffect } from "react";
import NcImage from "shared/NcImage/NcImage";
import { TaxonomyType } from "data/types";
import { Link } from "react-router-dom";
import convertNumbThousand from "utils/convertNumbThousand";
import  {getAvatar} from "../../services/apiServices"

export interface CardCategory3Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const CardCategory3: FC<CardCategory3Props> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, href = "/", thumbnail} = taxonomy;

  const [image, setImage] = useState<any>()
  const setProfile = async(img: string) => {
    const file = await getAvatar(img);
    setImage(URL.createObjectURL(file))
  }

  useEffect(() => {
    setProfile(thumbnail?thumbnail:"")
  },[])

  
  return (
    <Link
      to={href}
      className={`nc-CardCategory3 flex flex-col ${className}`}
      data-nc-id="CardCategory3"
    >
      <div
        className={`flex-shrink-0 relative w-full lg:aspect-w-9 lg:aspect-h-8 md:aspect-w-8 md:aspect-h-7 sm:aspect-w-8 sm:aspect-h-7 h-100 rounded-2xl overflow-hidden group`}
      >
        <NcImage
          src={image}
          className="object-cover w-full h-full rounded-2xl"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="mt-4 truncate">
        <h2
          className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate text-center`}
        >
          {name}
        </h2>
        
      </div>
    </Link>
  );
};

export default CardCategory3;
