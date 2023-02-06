import React, { FC, useState, useEffect } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import { Link, useNavigate } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import Button from "shared/Button/Button";
import img1 from "images/domino.png";
import StartRating from "./StartRating";
import { getAvatar } from "services/apiServices";
import { addProduct } from "services/cartStorage";
import { ToastContainer, toast } from 'react-toastify'

export interface StayCardProductsProps {
  className?: string;
  data?: StayDataType;
  size?: "default" | "small";
  productsData?: any;
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const StayCardProduct: FC<StayCardProductsProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
  productsData,
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

  const [image, setImage] = useState<any>("");

  const getImage = async (img: string) => {
    const file = await getAvatar(img);
    setImage(URL.createObjectURL(file));
  };

  const addAuthorItems = (id: number, name: string, price: string, quantity: number, image: any, type: string) => {
    const response = addProduct(id, name, price, quantity, image, type);
    console.log("menu list",response)
    if (response) {
      toast.success(`Restaurant menu added to shopping cart.`, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    } else {
      toast.warning(`This item has already been added to your shopping cart.`, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }

  const navigate = useNavigate();

  const handleClick =async() => {
    await addAuthorItems(productsData.id, productsData.name, productsData.price, 1, productsData.product_avatar, "author");
    // navigate("/checkout");
    // alert("item added to cart")
          
  }

  useEffect(() => {
    getImage(productsData.product_avatar);
  }, []);

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard_${id}`}
          ratioClass="aspect-w-4 aspect-h-3 "
          galleryImgs={[image && image]}
          href={href}
        />

        <BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" />
        <SaleOffBadge
          className="absolute left-1 top-3"
          desc={productsData.offer}
        />
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
              <span className="line-clamp-1">{productsData.name}</span>
            </h2>
          </div>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {productsData.description}
          </span>
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold">
              {productsData.price}
              {`$ `}
            </span>
            {!!reviewStart && (
              <StartRating reviewCount={reviewCount} point={reviewStart} />
            )}
          </div>
          <div className="w-20 border-b border-neutral-100 dark:border-neutral-800 "></div>
          <Button className="px-1 py-1 sm:px-3 bg-red-600 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-[#881337] flex text-white "
          onClick={handleClick}>
           
            Add To Cart
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
    <ToastContainer/>
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="StayCard"
    >
      {renderSliderGallery()}
      <Link to={href}>{renderContent()}</Link>
    </div>
    </>
  );
};

export default StayCardProduct;
