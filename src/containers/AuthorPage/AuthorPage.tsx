

import React, { FC, Fragment, useState, useEffect } from "react";

import { Helmet } from "react-helmet";

import RestraurantPage from "containers/RestraurantPage/RestraurantPage"

// import SectionGridFilterCard from "containers/ListingRealEstatePage/SectionGridFilterCard";
import SectionGridFilterCard from "./components/SectionGridFilterCard";
import SectionHero2 from "./components/SectionHero2";
import { getRestaurantCategory,getRestaurant,getProduct } from "services/apiServices";


export interface AuthorPageProps {
  className?: string;
}


const AuthorPage: FC<AuthorPageProps> = ({ className = "" }) => {
  // let [categories] = useState(["Stays", "Experiences", "Car for rent"]);

  const [restraurantCategory, setrestraurantCategory] = useState<any>([])
  const [restaurant, setresturant] = useState<any>([])
  const [product, setProduct] = useState<any>([])

  //Resturant Food Category
  const getrestraurantCat = async () => {
    const response = await getRestaurantCategory(1)
    console.log(response.data)
    if (response.data?.response === "success") {
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
  const getRestaurantName =async () => {
    const response = await getRestaurant(1)
    // console.log(response.data)
    if(response.data?.response ==="success") {
      setresturant(response.data.restaurant[0])
    }
  }

  // Products 
  const getProductItems =async () => {
    const response = await getProduct(1)
    // console.log(response.data)
    if(response.data?.response ==="success"){
      setProduct(response.data.product)
      // let productArr:any = [];
      // response.data.product.map((item:any, key:number) => {
      //   productArr[key] = {
      //     id:item.id,
      //     name: item.name,
      //     description:item.desc
      //   }
      //   setProduct(productArr)
      // })
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
        <RestraurantPage data={restraurantCategory} />
      );
    }
  };

  // const grid = () => {
  //   if (product.length >0 ){
  //     return(
        
  //     )
  //   }
  // }
  

  const renderSection1 = () => {
    return (
     
      <div className=" flex-1 p-7">
        {product.length > 0 &&
        <SectionGridFilterCard productData={product}  className="py-14 lg:py-10" />
         } 
      </div>
      
    );
  };

  const heroSection = () => {
      return(
        <SectionHero2 data={restaurant} />
      );
  }



  return (

    <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">

      <div>{heroSection()}</div>
      
      <Helmet>
        <title>Restraunt || ATE</title>
      </Helmet>
      <main className="flex flex-row ">

        <div className="">{renderSidebar()}</div>

        <div className="w-full  space-y-4 lg:space-y-10 lg:pl-1 flex-shrink  ">
          {renderSection1()}
        </div>
      </main>
    </div>
  );
};

export default AuthorPage;
