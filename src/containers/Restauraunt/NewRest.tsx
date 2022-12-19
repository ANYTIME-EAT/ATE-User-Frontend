import React, { FC, Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import RestraurantPage from "./components/RestraurantPage";
import SectionGridFilterCard from "./components/SectionGridFilterCard";
import SectionHero2 from "./components/SectionHero2";
import { getRestaurantCategory, getRestaurant, getProduct } from "services/apiServices";
import ShoppingCart from "containers/ShoppingCart/ShoppingCart";
import { getAvatar } from 'services/apiServices'
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import CustomInupt from "./components/CustomInput";
import Cart from "./components/Cart";

// import { addToCart, getCartList } from "services/cartStorage"


export interface NewRestProps {
  className?: string;
}


const NewRest: FC<NewRestProps> = ({ className = "" }) => {

  const [restraurantCategory, setrestraurantCategory] = useState<any>([])
  const [restaurant, setresturant] = useState<any>([])
  const [product, setProduct] = useState<any>([])

  const [currentAuthor, setCurrentAuthor] = useState<any>({ index: -1, title: "" })

  const [newProduct, setNewProduct] = useState<boolean>(false)

  const changeAuthor = (index: number, title: string) => {
    setCurrentAuthor({ index: index, title: title })
  }

  let items = [];

  const [image, setImage] = useState<any>("")

  const getProfile = async (img: string) => {
    const file = await getAvatar(img)
    setImage(URL.createObjectURL(file))
  }


  //Restaurant Food Category
  const getrestraurantCat = async () => {
    const response = await getRestaurantCategory(1)
    // console.log(response.data)
    if (response.data?.response === "success") {
      setCurrentAuthor({ index: 0, title: response.data.category[0].name })
      let menuArr: any = [];
      response.data.category.map((item: any, key: number) => {
        menuArr[key] = {
          title: item.name
        }
      })
      setrestraurantCategory(menuArr)
    }
  }

  //retauraunt Name
  const getRestaurantName = async () => {
    const response = await getRestaurant(1)
    console.log(response.data)
    if (response.data?.response === "success") {
      setresturant(response.data.restaurant[0])
      getProfile(response.data.restaurant[0].restaurant_avatar)
    }
  }

  // Products 
  const getProductItems = async () => {
    const response = await getProduct(1)
    if (response.data?.response === "success") {
      console.log(response.data.product)
      setProduct(response.data.product)
    }
  }



  useEffect(() => {
    getrestraurantCat()
    getRestaurantName()
    getProductItems()
  }, [])

  const renderSidebar = () => {
    if (restraurantCategory.length > 0) {
      return (
        <RestraurantPage data={restraurantCategory} crrAuthor={currentAuthor} changeAuthor={changeAuthor} />
      );
    }
  };


  const renderSection1 = () => {
    return (

      <div className=" flex-1 p-7">
        {product.length > 0 &&
          <SectionGridFilterCard productData={product} setNewProduct={setNewProduct} className="py-14 lg:py-10 " />
        }
      </div>

    );
  };

  const heroSection = () => {
    return (
      <SectionHero2 data={restaurant} img={image} />
    );
  }

  // const cart = () => {
  //   return (
  //     <div className={` p-1  w-full  `}>
  //       <div className={`rounded-3xl bg-white dark:bg-neutral-800 shadow-2xl border-2 border-gray-200`}>
  //         <div className="relative p-6 ">
  //           <span className="text-xl font-semibold">Cart</span>
  //           <p>McDonalds</p>
  //           {/* <div className="w-full border-b border-neutral-200 dark:border-neutral-700 mt-4"></div> */}
  //           <div className="flex flex-col max-w-2xl p-1 space-y-2 sm:p-1 dark:bg-inherit dark:text-gray-100 ">

  //             <ul className="flex flex-col divide-y divide-gray-700  overflow-auto h-64">

  //               <p></p>
  //               <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
  //                 <div className="flex w-full space-x-2 sm:space-x-4">
  //                   <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-20 sm:h-20 dark:bg-gray-500" />
  //                   <div className="flex flex-col justify-between w-full pb-4">
  //                     <div className="flex justify-between w-full pb-2 space-x-2">
  //                       <div className="space-y-1">
  //                         <h6 className="leading-snug ">6Pc Nuggets + Mc Chicken Burger</h6>
  //                         <p className="text-sm ">+Coke</p>
  //                       </div>
  //                       <div className=" justify-center mb-10">
  //                         <h6 className=" text-sm font-bold">€ 24</h6>
  //                         {/* <p className="text-sm line-through dark:text-gray-600">75.50€</p> */}
  //                       </div>

  //                       {/* <div className="text-center">
  //                             <p className="text-lg font-semibold">240 €</p>
                              
  //                           </div> */}
  //                     </div>
  //                     <div className="flex  ">
  //                       <div className="flex items-right px-2 py-1 pl-0 space-x-1">
  //                         <CustomInupt className="mr-2" />
  //                       </div>

  //                       {/* <div className="flex items-right px-2 py-1 pl-0 space-x-1">
  //                             <CustomInupt className="mr-2" />
  //                           </div> */}
  //                       <button type="button" className="flex items-center px-1 py-1 pl-0 space-x-1 fill-red-600" >
  //                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-3 h-3 ">
  //                           <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
  //                           <rect width="32" height="200" x="168" y="216"></rect>
  //                           <rect width="32" height="200" x="240" y="216"></rect>
  //                           <rect width="32" height="200" x="312" y="216"></rect>
  //                           <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
  //                         </svg>
  //                         <span className="text-red-700">Remove</span>
  //                       </button>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </li>


  //               {/* {items[0].name} */}
  //             </ul>
  //             <div className="space-y-1 text-right">
  //               <p>Total amount :
  //                 <span className="font-semibold"> 240 €</span>
  //               </p>
  //               {/* <p className="text-sm dark:text-gray-400">Not including taxes and shipping costs</p> */}
  //             </div>

  //           </div>
  //           <div className="bg-gray-50 dark:bg-white/5 p-5 rounded-3xl  mt-10">
  //             <a
  //               className="flex items-center justify-center w-full px-4 py-2 !rounded-xl text-sm font-medium bg-primary-6000 text-white hover:bg-primary-700"
  //               href='/checkout'
  //               // target="_blank"
  //               rel="noopener noreferrer"
  //             >
  //               {/* <ShoppingCartIcon className="w-4 h-4" /> */}
  //               <ShoppingBagIcon className="w-4 h-4" />
  //               <span className="ml-2">CheckOut</span>
  //             </a>
  //           </div>
  //         </div>

  //       </div>
  //     </div>
  //   )
  // }

  return (

    <div className={`nc-NewRest ${className}`} data-nc-id="NewRest">

      <div>{heroSection()}</div>

      <Helmet>
        <title>Restaurant | ATE</title>
      </Helmet>


      <div className="flex lg:flex-row xl:flex-row flex-col ">
        {/* <ShoppingCart className="top-1/3" authorItems={authorItems} addAuthorItems={addAuthorItems}/> */}

        {/* <ShoppingCart className="top-1/3" newProduct={newProduct} setNewProduct={setNewProduct} /> */}

        <div className="  shrink-1">{renderSidebar()}</div>

        <div className="w-full relative overflow-y-scroll h-screen mx-auto  ">
          {renderSection1()}
        </div>

        <div className="lg:w-3/4 w-full  py-10 shrink-1 visible"><Cart  newProduct={newProduct} setNewProduct={setNewProduct}/></div>
      </div>
    </div>
  );
};

export default NewRest;
