import React, { FC, useState, useEffect } from "react";
import GallerySlider from "./GallerySlider";
import { DEMO_STAY_LISTINGS } from "data/listings";
import StartRating from "components/StartRating/StartRating";
import NcImage from "shared/NcImage/NcImage";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import { StayDataType } from "data/types";
import Button from "shared/Button/Button";
import { getAvatar } from 'services/apiServices'
import CustomInupt from "./CustomInput";

import { addToCart, getCartList, addProduct } from "services/cartStorage"
import { ToastContainer, toast } from 'react-toastify'

export interface ProductCardProps {
  className?: string;
  data?: any;
  productData?: any;
  setNewProduct(val: boolean): void;
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const addAuthorItems = (id: number, name: string, price: string, quantity: number, image: any, type: string) => {
  const response = addProduct(id, name, price, quantity, image, type);
  if (response) {
    toast.success(`Product added to shopping cart.`, {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  } else {
    toast.warning(`This item has already been added to your shopping cart.`, {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }
}

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data = DEMO_DATA,
  productData,
  setNewProduct
}) => {
  const {
    galleryImgs,
    title,
    href,
    like,
    saleOff,
    price,
    reviewStart,
    reviewCount,
    id,
  } = data;

  const [image, setImage] = useState<any>("")

  const getProfile = async (img: string) => {
    const file = await getAvatar(img)
    setImage(URL.createObjectURL(file))
  }


  useEffect(() => {
    console.log(productData.product_avatar)
    getProfile(productData.product_avatar)
  }, [])

  const renderSliderGallery = () => {
    return (
      <div className="flex-shrink-0 p-3 w-full md:w-2/6 sm:w-2/6 ">
        <GallerySlider
          ratioClass="aspect-w-1 aspect-h-1"

          galleryImgs={[image && image]}
          className="w-full h-full rounded-2xl overflow-hidden will-change-transform"
          uniqueID={`ProductCard_${id}`}
          href={href}

        />

        <SaleOffBadge className="absolute left-5 top-5 !bg-orange-500"
          desc={productData.offer} />
        

      </div>
      
    );
  };

  const renderTienIch = () => {
    return (
      <div className="inline-grid grid-cols-3 gap-2">
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-bed text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            6 beds
          </span>
        </div>

        {/* ---- */}
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-bath text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            3 baths
          </span>
        </div>

        {/* ---- */}
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-expand-arrows-alt text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            1200 Sq. Fit
          </span>
        </div>
      </div>
    );
  };


  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:pr-6 flex flex-col items-start">
        {/* <ToastContainer /> */}
        <div className="space-y-5 w-full">

          <div className="flex items-center space-x-2">

            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-2">{productData.name}</span>
            </h2>

          </div>
          <div className=" flex items-center space-x-2">
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-2">{productData.description}</span>
            </h2>
          </div>
          {/* {renderTienIch()} */}
          {/* <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 "></div> */}
          <div className="flex w-full justify-between items-end">
            <span className="flex items-center justify-center px-3 py-2 border border-secondary-500 rounded leading-none text-base font-sm text-secondary-500">
              {`${productData.price}€`}
            </span>
            <div className="inline-flex space-x-3">
              <StartRating reviewCount={reviewCount} point={reviewStart} />
            </div>
            <Button className="flex items-center justify-center px-1 py-1 sm:px-3 hover:bg-[#e75579] bg-[#be123c]  dark:bg-[#be123c] dark:hover:bg-[#881337] mt-2 "
              onClick={() => { addAuthorItems(productData.id, productData.name, productData.price, 1, productData.product_avatar, "author");; setNewProduct(true) }}><i className="las la-shopping-cart"
              />
              add
            </Button>

          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-ProductCard group relative bg-white dark:bg-neutral-900 border  border-neutral-100 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-2xl ${className}`}
      data-nc-id="ProductCard"
    >
      <Link to={href} className="absolute inset-0"></Link>
      <div className="h-full w-full flex flex-col sm:flex-row sm:items-center">
        {renderSliderGallery()}
        {renderContent()}
      </div>

      <BtnLikeIcon
        colorClass={` bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 hover:bg-opacity-70 text-neutral-6000 dark:text-neutral-400`}
        isLiked={like}
        className="absolute right-5 top-5 sm:right-3 sm:top-3 "
      />
    </div>
  );
};

export default ProductCard;
