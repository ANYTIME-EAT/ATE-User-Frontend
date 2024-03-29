import SectionSliderNewCategories from "./Components/SectionSliderNewCategories";
import React, { useEffect, useState, FC } from "react";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { TaxonomyType } from "data/types";
import SectionDowloadApp from "./SectionDowloadApp";
import SectionGridAllMenu from "./SectionGridAllMenu";
import kfc from 'images/kfc.png'
import domino from 'images/domino.png'
import pizza from 'images/pizza.png'
import bbq from 'images/bbq.png'
import offer1 from 'images/offer1.png'
import offer2 from 'images/offer2.png'
import { getRestaurantList, getOffersList, getAllComboMenuList, getAllProductsAPI, getAllCuisines, getKitchenList, getAvatar, getTopbrands, getTopOffersList, getKitchenIdApi } from '../../services/apiServices'
import ShoppingCart from "containers/ShoppingCart/ShoppingCart";
import AteSectionHero from "components/SectionHero/AteSectionHero";
import AllRestMenu from "./Components/AllRestMenu";
import food1 from "images/Canadian Food.png"
import food2 from "images/British Food.png"
import food3 from "images/Rectangle 29.png"

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "#",
    name: "KFC",
    taxonomy: "category",
    count: 188288,
    thumbnail: kfc,
  },
  {
    id: "2",
    href: "#",
    name: "Domino's",
    taxonomy: "category",
    count: 188288,
    thumbnail: domino,
  },
  {
    id: "2",
    href: "#",
    name: "Pizza Hut",
    taxonomy: "category",
    count: 188288,
    thumbnail: pizza,
  },
  {
    id: "2",
    href: "#",
    name: "BBQ Nation",
    taxonomy: "category",
    count: 188288,
    thumbnail: bbq,
  },

];

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "#",
    name: "Lorem ipsum",
    taxonomy: "category",
    count: 188288,
    thumbnail: offer1,
  },
  {
    id: "222",
    href: "#",
    name: "Lorem ipsum",
    taxonomy: "category",
    count: 188288,
    thumbnail: offer2,
  },
  {
    id: "3",
    href: "#",
    name: "Lorem ipsum",
    taxonomy: "category",
    count: 188288,
    thumbnail: offer1,
  },
  {
    id: "4",
    href: "#",
    name: "Lorem ipsum",
    taxonomy: "category",
    count: 188288,
    thumbnail: offer2,
  },
  {
    id: "5",
    href: "#",
    name: "Lorem ipsum",
    taxonomy: "category",
    count: 188288,
    thumbnail: offer1,
  },
];


// export interface PageHomeProps {
//   addtoCart(id:number, name:string, price:string, quantity:number): void;
// }

const PageHome = () => {

  const [kitchenData, setKitchenData] = useState<any>([])
  const [restrauntData, setRestraurantData] = useState<any>([])
  const [offerData, setOfferData] = useState<any>([])
  const [comboMenuData, setcomboMenuData] = useState<any>([])
  const [newProduct, setNewProduct] = useState<boolean>(false)
  const [productsData, setProductsData] = useState<any>([])
  const [cuisinesData, setCuisinesData] = useState<any>([])
  const [topbrandData, setTopbrandData] = useState<any>([])
  const [topoffersData, setTopoffersData] = useState<any>([])
  
  const [topbrandKitchenData, setTopbrandKitchenData] = useState<any>([])
  

  const getTopOffers = async () => {
    const response = await getTopOffersList()
    if (response.data) {
      console.log(response.data)
      let tempData: any = [];
      let temp_counter = 0
      if (response.data.response === "success") {
        response.data.top_combo_menu.map((item: any, key: number) => {
          temp_counter++;
          tempData[temp_counter] = {
            id: temp_counter,
            item_id: item.id,
            name: item.name,
            taxonomy: "category",
            thumbnail: item.menu_avatar,
            type: "combo_menu"

          }
        })
        response.data.top_products.map((item: any, key: number) => {
          temp_counter++;
          tempData[temp_counter] = {
            id: temp_counter,
            item_id: item.id,
            name: item.name,
            taxonomy: "category",
            thumbnail: item.product_avatar,
            type: "products"

          }
        })


        console.log("cafa", tempData)
        setTopoffersData(tempData)
      }
    }
  }


  const getAllCuisinesData = async () => {
    const response = await getAllCuisines()
    if (response.data) {
      let tempData: any = [];
      if (response.data.response === "success") {
        response.data.cuisines.map((item: any, key: number) => {
          tempData[key] = {
            id: item.id,
            name: item.name,
            taxonomy: "category",
            thumbnail: item.cuisines_avatar

          }
        })
        // console.log("cusine data", tempData)
        setCuisinesData(tempData)
      }

    }
  }

  const getKitchenData = async () => {
    const response = await getKitchenList()

    if (response.data) {
      let tempData: any = [];
      if (response.data.response === "success") {
        // console.log("kitchen data",response.data)
        response.data.kitchen.map(async (item: any, key: number) => {
          tempData[key] = {
            id: item.id,
            href: `/restaurant/${item.id}`,
            name: item.name,
            taxonomy: "category",
            thumbnail: item.avatar
          }
        })
        // console.log("rest data", tempData)
        setKitchenData(tempData)
      }

    }
  }
  
   // const getTopbrandKitchenData = async () => {
  //   const response = await getKitchenIdApi()

  //   if (response.data) {
  //     let tempData: any = [];
  //     if (response.data.response === "success") {
  //       // console.log(response.data)
  //       response.data.data.map(async (item: any, key: number) => {
  //         tempData[key] = {
  //           id: item.id,
  //           href: "#",
  //           name: item.name,
  //           taxonomy: "category",
  //           thumbnail: item.avatar
  //         }
  //       })
  //       // console.log("brand data", tempData)
  //       setTopbrandKitchenData(tempData)
  //     }

  //   }
  // }
  
  const getTopbrandData = async () => {
    const response = await getTopbrands()
    console.log("brand data",response.data)
    if (response.data) {
      let tempData: any = [];
      if (response.data.response === "success") {
        // console.log(response.data)
        response.data.data.map(async (item: any, key: number) => {
          tempData[key] = {
            id: item.id,
            href: `/restaurant/${item.id}`,
            name: item.name,
            taxonomy: "category",
            thumbnail: item.avatar
          }
        })
        console.log("brand data", tempData)
        setTopbrandData(tempData)
      
      }

    }
  }

  const getRestrauntData = async () => {
    const response = await getRestaurantList()

    if (response.data) {
      let tempData: any = [];
      if (response.data.response === "success") {
        // console.log(response.data)
        response.data.restaurant.map((item: any, key: number) => {
          tempData[key] = {
            id: item.id,
            href: "#",
            name: item.name,
            taxonomy: "category",
            count: 188288,
          }
        })

        setRestraurantData(tempData)
      }

    }
  }

  const getAllProductsData = async () => {
    const response = await getAllProductsAPI()
    console.log("product data",response.data)
    if (response.data) {
      let tempData: any = [];
      if (response.data.response === "success") {
        response.data.product.map((item: any, key: number) => {
          tempData[key] = {
            id: item.id,
            name: item.name,
            category_id: item.category_id,
            restaurant_id: item.restaurant_id,
            description: item.description,
            // food_type: item.food_type,
            // combo_menu_id: item.combo_menu_id,
            // is_availability: item.is_availability,
            price: item.price,
            // quantity: item.quantity,
            addons: item.addons,
            vegetarian: item.vegetarian,
            // product_avatar: item.product_avatar,
            avatar: item.avatar,
            is_deleted:item.is_deleted,
            // thumbnail: item.product_avatar,
            taxonomy: "category",
          }
        })
        setProductsData(tempData)
        console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",tempData)
      }

    }
  }


  const getComboMenuData = async () => {
    const response = await getAllComboMenuList()

    if (response.data) {
      
      let tempData: any = [];
      if (response.data.response === "success") {
        response.data.comboMenu.map((item: any, key: number) => {
          tempData[key] = {
            id: item.id,
            name: item.name,
            description: item.description,
            discount: item.discount,
            price : item.price,
            avatar: item.avatar,
            is_deleted: item.is_deleted,
            restaurant_id:item.restaurant_id

          }
        })
        setcomboMenuData(tempData)
        console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY0",tempData)
      }

    }
  }
  const getOfferData = async () => {
    const response = await getOffersList()
    // console.log(response.data)

    // if(response.data?.response === "success"){
    //   response.data.
    // }
  }


  useEffect(() => {
    getRestrauntData()
    getKitchenData()
    getOfferData()
    getComboMenuData()
    getAllProductsData()
    getAllCuisinesData()
    getTopbrandData()
    getTopOffers()
  }, [])


  return (
    <div className="nc-PageHome relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />
      <AteSectionHero className="pt-64 lg:pt-64 lg:pb-16  " />


      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">

        {topbrandData.length > 0 &&
          <SectionSliderNewCategories
            heading="Our Top Brands"
            subHeading=""
            categoryCardType="card3"
            itemPerRow={4}
            sliderStyle="style2"
            categories={topbrandData}
            uniqueClassName="PageHome_s1"
            className="mt-24"
            
          />}


        {/* SECTION  */}
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          {topoffersData.length > 0 &&
            <SectionSliderNewCategories
              categories={topoffersData}
              categoryCardType="card3"
              itemPerRow={4}
              heading="Our Top Offers"
              subHeading="Good Food Is Always Cooking! Order Yummy Items From Menu"
              sliderStyle="style2"
              uniqueClassName="PageHome_s2"
              className="object-right-bottom"
            />
          }
        </div>

        {/* Combo Menu  */}
        <div className="relative py-16">
          <SectionGridAllMenu headingIsCenter={true} combo_MenuData={comboMenuData} setNewProduct={setNewProduct} />
        </div>


        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          {/* <SectionGridAllMenu combo_MenuData={comboMenuData} setNewProduct={setNewProduct} /> */}
          {/* <AllRestMenu products_Data={productsData}  /> */}
          {productsData.length > 0 &&
            <SectionSliderNewCategories
              categories={productsData}
              categoryCardType="card1"
              itemPerRow={4}
              heading="All Restauraunt Menu"
              subHeading="Good Food Is Always Cooking! Order Yummy Items From Menu"
              sliderStyle="style2"
              uniqueClassName="PageHome_s2"
              className="object-right-bottom"
            />
          }
        </div>

        {kitchenData.length > 0 &&
          <SectionSliderNewCategories
            heading="All Restaurants"
            subHeading="Good Food Is Always Cooking! Order Yummy Items From Menu"
            categoryCardType="card3"
            itemPerRow={4}
            sliderStyle="style2"
            categories={kitchenData}
            uniqueClassName="PageHome_s1"
            className="mt-24"
          />}

        <SectionDowloadApp />


        {cuisinesData.length > 0 &&
          <SectionSliderNewCategories
            heading="Popular Cusines"
            subHeading="ddgsfg"
            categoryCardType="cusine"
            itemPerRow={4}
            sliderStyle="style2"
            categories={cuisinesData}
            uniqueClassName="PageHome_s1"
            className="mt-64"
          />
        }

      </div>
    </div>
  );
}

export default PageHome;
