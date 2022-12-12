import React, { FC, useEffect, useState } from "react";
import GallerySlider from "./GallerySlider";
import { DEMO_STAY_LISTINGS } from "data/listings";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import { StayDataType } from "data/types";
import Button from "shared/Button/Button";
import ButtonCircle from "shared/Button/ButtonCircle";
import { getAvatar } from "services/apiServices";
import { ToastContainer } from "react-toastify";
import Modal from "./Modal";

export interface ProductCardProps {
  className?: string;
  data?: any;
  ordersData?: any;
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data = DEMO_DATA,
  ordersData,
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

  
  const [showModel, setShowModel] = useState(false);
  
  const handleModal = (val: boolean) => {
    setShowModel(val);
  };

  const handleSubmit = () => {};


  const [image, setImage] = useState<any>("");

  const getProfile = async (img: string) => {
    const file = await getAvatar(img);
    setImage(URL.createObjectURL(file));
  };


  useEffect(() => {
    // console.log(ordersData.product_avatar)
    getProfile(ordersData.product_avatar);
  }, []);

  const renderSliderGallery = () => {
    return (
      <div className="flex-shrink-0 p-3 w-full sm:w-64 ">
        <GallerySlider
          ratioClass="aspect-w-1 aspect-h-1"
          galleryImgs={[image && image]}
          className="w-full h-full rounded-2xl overflow-hidden will-change-transform"
          uniqueID={`ProductCard_${id}`}
          href={href}
        />
        <SaleOffBadge
          className="absolute left-5 top-5 !bg-orange-500"
          desc={ordersData.offer}
        />
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
        
        <ToastContainer />
        <div className="space-y-4 w-full">
          <div className="flex items-center space-x-2">
      <Modal isVisible={showModel} closeModal={handleModal}>
        {/* onClose={handleModal} */}
        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Edit Address
          </h3>
          <form className="space-y-6" action="#" onSubmit={handleSubmit}>
            {/* <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your address
              </label>
              <input
                type="address"
                name="address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div> */}

            {/* <div className="p-6 text-center">
              <button
                data-modal-toggle="popup-modal"
                type="button"
                onClick={()=>{setShowModel(false)}}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ml-2"
                // onClick={updateAddress}
              >
                Update
              </button>
            </div> */}
          </form>
        </div>
      </Modal>
            <h2 className="text-xs text-inherit font-medium capitalize">
              <span className="line-clamp-2">
                {"Order Number "}
                {ordersData.id} | {ordersData.order_date} ,
                {ordersData.order_time}
              </span>
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <a 
            onClick={() => {
              // handleTypeChange(item.type);
              setShowModel(true);
            }} 
            className="text-red-600">
              VIEW DETAILS
            </a>
          <div />
           <h2 className="text-lg font-medium capitalize"></h2>
          </div>
          <div className="w-100 border-b border-neutral-100 dark:border-neutral-800 "></div>
          <div className="flex w-full justify-between items-end">
            <span className="flex items-center justify-center px-3 py-2 border border-secondary-500 rounded leading-none text-base font-sm text-secondary-500">
              {"Total Amount: "} {`${ordersData.total_amount}`}$
            </span>
            <Button className="flex items-center justify-center px-1 py-1 sm:px-3 bg-red-600 mt-2 text-white ">
              {ordersData.status}
            </Button>
          </div>

         <button className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
            Rate
        </button>

        <button className="bg-transparent text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded ml-4 hover:bg-red-500">
            Re-Order
        </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-ProductCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl overflow-hidden  ${className}`}
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
