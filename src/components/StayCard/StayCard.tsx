import React, { FC, useEffect, useState } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import Button from "shared/Button/Button";
import img1 from "images/domino.png";
import { getAvatar } from "services/apiServices";

export interface StayCardProps {
  className?: string;
  data?: StayDataType;
  size?: "default" | "small";
  favouritesData?: any;
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const StayCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
  favouritesData,
}) => {
  const {
    galleryImgs,
    listingCategory,
    address,
    title,
    bedrooms,
    href,
    like,
    saleOff,
    isAds,
    price,
    reviewStart,
    reviewCount,
    id,
  } = data;

  const [image, setImage] = useState<any>("")

  const getProfile = async(img:string) => {
    const file = await getAvatar(img)
    setImage(URL.createObjectURL(file))
  }

  useEffect(() => {
    console.log(favouritesData.product_avatar)
    getProfile(favouritesData.product_avatar)
  },[])

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard_${favouritesData.id}`}
          ratioClass="aspect-w-4 aspect-h-3 "
          galleryImgs={[image && image]}
          href={href}
        />

        <BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" />
        {saleOff && <SaleOffBadge className="absolute left-1 top-3" />}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h2
              className={` font-medium capitalize ${
                size === "default" ? "text-lg" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{favouritesData.name}</span>
            </h2>
          </div>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {favouritesData.description}
          </span>
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold">
              {favouritesData.price}
              {` `}
            </span>
            {!!reviewStart && (
              <StartRating reviewCount={reviewCount} point={reviewStart} />
            )}
          </div>
          <div className="w-20 border-b border-neutral-100 dark:border-neutral-800"></div>
          <Button className=" bg-red-500 text-white sm:text-xs pb-2 px-1 py-1 sm:px-3 flex content-center">ORDER NOW</Button>
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

export default StayCard;
