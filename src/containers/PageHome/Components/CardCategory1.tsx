import React, { FC , useState, useEffect } from "react";
import { TaxonomyType } from "data/types";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import GallerySlider from "components/GallerySlider/GallerySlider";
import  {getAvatar} from "services/apiServices"
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import Button from "shared/Button/Button";
import img1 from 'images/domino.png'
import StartRating from "../StartRating";

export interface CardCategory1Props {
  className?: string;
  taxonomy?: any;
  size?: "large" | "normal";
}

const CardCategory1: FC<CardCategory1Props> = ({
  className = "",
  size = "normal",
  taxonomy,
}) => {
  const { count, name, href = "/", thumbnail } = taxonomy;

  const [image, setImage] = useState<any>()
  const setProfile = async(img: string) => {
    const file = await getAvatar(img);
    setImage(URL.createObjectURL(file))
  }

  useEffect(() => {
    setProfile(thumbnail?thumbnail:"")
  },[])

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard_${taxonomy.id}`}
          ratioClass="aspect-w-4 aspect-h-3 "
          galleryImgs={[image && image]}
          href={href}
        />

        <BtnLikeIcon isLiked={false} className="absolute right-3 top-3 z-[1]" />
        <SaleOffBadge className="absolute left-1 top-3"
          desc={taxonomy.offer}
        />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={"p-4 space-y-4"}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">

            <h2
              className={` font-medium capitalize ${"text-base"}`}
            >
              <span className="line-clamp-1">{taxonomy.name}</span>
            </h2>
          </div>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {taxonomy.description}
          </span>
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold">
              {taxonomy.price}
              {`$ `}

            </span>
            {!!taxonomy.reviewStart && (
              <StartRating reviewCount={taxonomy.reviewCount} point={taxonomy.reviewStart} />
            )}
          </div>
          <div className="w-20 border-b border-neutral-100 dark:border-neutral-800 "></div>
          <Button className="px-1 py-1 sm:px-3 bg-red-600 hover:bg-red-800 dark:bg-[#be123c] dark:hover:bg-[#881337] flex ">Order Now</Button>
        </div>


      </div>
    );
  };

  return (
    <div
    className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
    data-nc-id="StayCard"
  >
    {renderSliderGallery()}
    <Link to={href}>{renderContent()}</Link>
  </div>
  );
};

export default CardCategory1;