import SectionHero from "components/SectionHero/SectionHero";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import React, { useEffect, useState, FC } from "react";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { TaxonomyType } from "data/types";
import SectionDowloadApp from "./SectionDowloadApp";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import SectionGridAllMenu from "./SectionGridAllMenu";
import kfc from 'images/kfc.png'
import domino from 'images/domino.png'
import pizza from 'images/pizza.png'
import bbq from 'images/bbq.png'
import offer1 from 'images/offer1.png'
import offer2 from 'images/offer2.png'
import { getRestaurantList, getOffersList, getAllComboMenuList } from '../../services/apiServices'
import ShoppingCart from "containers/ShoppingCart/ShoppingCart";
import AteSectionHero from "components/SectionHero/AteSectionHero";
import ComboSlider from "./Components/ComboSlider";
import AllRestMenu from "./Components/AllRestMenu";

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

  const [restrauntData, setRestraurantData] = useState<any>([])
  const [offerData, setOfferData] = useState<any>([])
  const [comboMenuData, setcomboMenuData] = useState<any>([])
  const [newProduct, setNewProduct] = useState<boolean>(false)


  const getRestrauntData = async () => {
    const response = await getRestaurantList()

    if (response.data) {
      let tempData: any = [];
      if (response.data.response === "success") {
        response.data.restaurant.map((item: any, key: number) => {
          tempData[key] = {
            id: item.id,
            href: "#",
            name: item.name,
            taxonomy: "category",
            count: 188288,
            // thumbnail:kfc,
          }
        })
        setRestraurantData(tempData)
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
            max_quantity: item.max_quantity,
            is_availability: item.is_availability,
            menu_avatar: item.menu_avatar,
            is_deleted: item.is_deleted

          }
        })
        setcomboMenuData(tempData)
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
    getOfferData()
    getComboMenuData()
  }, [])


  return (
    <div className="nc-PageHome relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />
      <AteSectionHero className="pt-64 lg:pt-64 lg:pb-16  " />


      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}

        {/* <SectionHero className="pt-10 lg:pt-16 lg:pb-16" /> */}
        {/* <ShoppingCart newProduct={newProduct} setNewProduct={setNewProduct}/> */}
        {/* <EmptyCart /> */}



        {/* SECTION 1 */}

        {restrauntData.length > 0 &&
          <SectionSliderNewCategories
            heading="Our Top Brands"
            subHeading=""
            categoryCardType="card5"
            itemPerRow={4}
            sliderStyle="style2"
            categories={restrauntData}
            uniqueClassName="PageHome_s1"
            className="mt-24"
          />}


        {/* SECTION  */}
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionSliderNewCategories
            categories={DEMO_CATS_2}
            categoryCardType="card3"
            itemPerRow={4}
            heading="Our Top Offers"
            subHeading="Good Food Is Always Cooking! Order Yummy Items From Menu"
            sliderStyle="style2"
            uniqueClassName="PageHome_s2"
            className="object-right-bottom"
          />
        </div>

        {/* All Rest Menu  */}
        <div className="relative py-16">
          {/* <BackgroundSection /> */}
          <SectionGridAllMenu headingIsCenter={true} combo_MenuData={comboMenuData} setNewProduct={setNewProduct} />
        </div>


        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          {/* <SectionGridAllMenu combo_MenuData={comboMenuData} setNewProduct={setNewProduct} /> */}
          <AllRestMenu  combo_MenuData={comboMenuData} setNewProduct={setNewProduct}/>
        </div>

        {/* SECTION */}
        {/* <SectionHowItWork /> */}



        {/* SECTION */}
        {/* <SectionSubscribe2 /> */}

        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div> */}

        {/* SECTION */}
        {/* <SectionGridCategoryBox /> */}

        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div> */}

        {/* All Resturaunt */}
        <SectionSliderNewCategories
          heading="All Resturaunts"
          subHeading="Good Food Is Always Cooking! Order Yummy Items "
          categoryCardType="card3"
          itemPerRow={5}
          uniqueClassName="PageHome_s3"
          sliderStyle = "style2"
        />

        <SectionDowloadApp />
        

      
        


     
      </div>
    </div>
  );
}

export default PageHome;
