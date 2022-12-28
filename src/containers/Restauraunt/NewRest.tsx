import React, { FC, Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import RestraurantPage from "./components/RestraurantPage";
import SectionGridFilterCard from "./components/SectionGridFilterCard";
import SectionHero2 from "./components/SectionHero2";
import { getRestaurantCategory, getRestaurant, getProduct, getKitchenIdApi } from "services/apiServices";
import ShoppingCart from "containers/ShoppingCart/ShoppingCart";
import { getAvatar } from 'services/apiServices'
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import CustomInupt from "./components/CustomInput";
import Cart from "./components/Cart";
import { useParams } from "react-router-dom";

// import { addToCart, getCartList } from "services/cartStorage"


export interface NewRestProps {
  className?: string;
 
}


const NewRest: FC<NewRestProps> = ({ className = "" }) => {
  const { id } = useParams();

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
  // const getRestaurantName = async () => {
  //   const response = await getRestaurant(1)
  //   console.log("restaurant name",response.data)
  //   if (response.data?.response === "success") {
  //     setresturant(response.data.restaurant[0])
  //     getProfile(response.data.restaurant[0].restaurant_avatar)
  //   }
  // }

  const getRestaurantDataByKitchenId = async () => {
 
    const response = await getKitchenIdApi(id)
    console.log("kichen data",response.data)
    if (response.data?.response === "success") {
      setresturant(response.data.kitchen[0])
      getProfile(response.data.kitchen[0].avatar)
    }
  }

//   const getAllAddressData = async () => {
//     const response = await getAllUserAddress(JSON.parse(localStorage.getItem("user-info") || "{}").id);
//     console.log(response.data);

//   if (response.data) {
//     if (response.data.data.length > 0) {
//       let addressArr = response.data.data;
//       let tempData: any = [];
//       console.log(tempData);
//       setUserAddress(addressArr);
//       console.log(addressArr)
//       userAddress.map((item: any, key: number) => {
//         if (item.type === selectedAddressType) {
//           userAddress[key] = {
//             type: item.type,
//             address: address,
//           };
//         }
//       });
//     }
// }
// };

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
    getRestaurantDataByKitchenId()
    // getRestaurantName()
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
