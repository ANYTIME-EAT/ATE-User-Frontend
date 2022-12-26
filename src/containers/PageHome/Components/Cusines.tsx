import React, { FC,useState,useEffect } from "react";
import NcImage from "shared/NcImage/NcImage";
import { TaxonomyType } from "data/types";
import { Link } from "react-router-dom";
import { getAvatar } from "services/apiServices";


export interface CusinesProps {
  className?: string;
  taxonomy: TaxonomyType;
}

const Cusines: FC<CusinesProps> = ({
  className = "",
  taxonomy,
}) => {
  const { count, name, href = "/", thumbnail } = taxonomy;

  const [image, setImage] = useState<any>()
  const setProfile = async (img: string) => {
    const file = await getAvatar(img);
    setImage(URL.createObjectURL(file))
  }

  useEffect(() => {
    setProfile(thumbnail ? thumbnail : "")
  }, [])

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
          src={image}
          className="object-cover "
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
