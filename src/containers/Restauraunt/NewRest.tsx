import React, { FC, Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import RestraurantPage from "./components/RestraurantPage";
import SectionGridFilterCard from "./components/SectionGridFilterCard";
import SectionHero2 from "./components/SectionHero2";
import { getRestaurantCategory, getRestaurant, getProduct } from "services/apiServices";
import ShoppingCart from "containers/ShoppingCart/ShoppingCart";
import { getAvatar } from 'services/apiServices'
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

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
    console.log(response.data)
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
    if (response.data?.response === "success") {
      setresturant(response.data.restaurant[0])
      getProfile(response.data.restaurant[0].restaurant_avatar)
    }
  }

  // Products 
  const getProductItems = async () => {
    const response = await getProduct(1)
    if (response.data?.response === "success") {
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
          <SectionGridFilterCard productData={product} setNewProduct={setNewProduct} className="py-14 lg:py-10" />
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


      <main className="flex flex-col-3 ">
        {/* <ShoppingCart className="top-1/3" authorItems={authorItems} addAuthorItems={addAuthorItems}/> */}

        {/* <ShoppingCart className="top-1/3" newProduct={newProduct} setNewProduct={setNewProduct} /> */}

        <div className="flex-col">{renderSidebar()}</div>

        <div className="w-full relative overflow-auto h-screen overflow-ellipsis flex-col space-y-4 lg:space-y-10 lg:pl-1 flex-shrink  ">
          {renderSection1()}
        </div>
        {/* <div className="absolute flex-col">
         <div>
          love
         </div>
        </div> */}
      </main>
    </div>
  );
};

export default NewRest;
