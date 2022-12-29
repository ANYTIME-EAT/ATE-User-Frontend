import React, { FC, Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import RestraurantPage from "./components/RestraurantPage";
import SectionGridFilterCard from "./components/SectionGridFilterCard";
import SectionHero2 from "./components/SectionHero2";
import {
  getRestaurantCategory,
  getRestaurant,
  getProduct,
  getKitchenIdApi,
} from "services/apiServices";
import ShoppingCart from "containers/ShoppingCart/ShoppingCart";
import { getAvatar } from "services/apiServices";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import CustomInupt from "./components/CustomInput";
import Cart from "./components/Cart";
import { useParams } from "react-router-dom";

// import { addToCart, getCartList } from "services/cartStorage"

export interface NewRestProps {
  className?: string;
  // data?: any;
  // changeAuthor(index: number, title: string): void;
  // crrAuthor?: any;
}

const NewRest: FC<NewRestProps> = ({ className = "" }) => {
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [restraurantCategory, setrestraurantCategory] = useState<any>([]);
  const [restaurant, setresturant] = useState<any>([]);
  const [product, setProduct] = useState<any>([]);
  const [productCategoryId, setProductCategoryId] = useState<any>([]);

  const [currentAuthor, setCurrentAuthor] = useState<any>({
    index: -1,
    title: "",
    id:""

  });

  const [newProduct, setNewProduct] = useState<boolean>(false);

  const changeAuthor = (index: number, title: string, id: number) => {
    setCurrentAuthor({ index: index, title: title, id: id });
    console.log("111111111111111111111111111111",id)
  };

  let items = [];

  const [image, setImage] = useState<any>("");

  const getProfile = async (img: string) => {
    const file = await getAvatar(img);
    setImage(URL.createObjectURL(file));
  };

  //Restaurant Food Category
  const getrestraurantCat = async () => {
    const response = await getRestaurantCategory(id);
    console.log("category data", response.data);
    if (response.data?.response === "success") {
      setCurrentAuthor({ index: 0, title: response.data.category[0].name ,id:response.data.category[0].id});
      let menuArr: any = [];
      response.data.category.map((item: any, key: number) => {
        menuArr[key] = {
          title: item.name,
          id:item.id

        };
      });
      setrestraurantCategory(menuArr);
    }
  };

  const getRestaurantDataByKitchenId = async () => {
    const response = await getKitchenIdApi(id);
    if (response.data?.response === "success") {
      setresturant(response.data.kitchen[0]);
      getProfile(response.data.kitchen[0].avatar);
    }
  };

  // Products
  const getProductItems = async () => {
    const response = await getProduct(id);
    console.log(response.data);
    if (response.data?.response === "success") {
      console.log("products", response.data.product);
      setProduct(response.data.product);
      setProductCategoryId(response.data.product.category_id);
    }
  };

  useEffect(() => {
    getrestraurantCat();
    getRestaurantDataByKitchenId();
    getProductItems();
  }, []);

  const renderSidebar = () => {
    if (restraurantCategory.length > 0) {
      return (
        // <RestraurantPage data={restraurantCategory}  crrAuthor={currentAuthor} changeAuthor={changeAuthor} />

        <div
          className={` ${
            open ? "w-72" : "w-1 "
          }  h-20 p-5  pt-8 relative duration-300`}
        >
          <div className="flex gap-x-4 items-end">
            <h1
              className={` dark:text-gray-100 origin-right font-medium text-xl duration-200`}
            ></h1>
          </div>
          <ul className="pt-6 items-end">
            {restraurantCategory.map((Menu: any, index: number) => (
              <li
                onClick={() => {
                  changeAuthor(index, Menu.title, Menu.id);
                  setActiveIndex(index);
                  console.log("33333333333",Menu)
                }}
                key={index}
                className={`flex  rounded-md p-3 cursor-pointer bg 
         ${index === activeIndex && " text-red-500 dark:bg-slate-400"} `}
              >
                <span className={`py-4 text-right`}>{Menu.title}</span>
                <span
                  className={`${index === activeIndex && " text-red-500  "} `}
                ></span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  const renderSection1 = () => {
    return (
      <div className=" flex-1 p-7">
        {product.length > 0 && (
          <SectionGridFilterCard
            productData={product}
            setNewProduct={setNewProduct}
            className="py-14 lg:py-10 "
            categoryId={currentAuthor.id}
          />
        )}
      </div>
    );
  };

  const heroSection = () => {
    return <SectionHero2 data={restaurant} img={image} />;
  };

  return (
    <div className={`nc-NewRest ${className}`} data-nc-id="NewRest">
      <div>{heroSection()}</div>

      <Helmet>
        <title>Restaurant | ATE</title>
      </Helmet>

      <div className="flex lg:flex-row xl:flex-row flex-col ">
        <div className="  shrink-1">{renderSidebar()}</div>

        <div className="w-full relative overflow-y-scroll h-screen mx-auto  ">
          {renderSection1()}
        </div>

        <div className="lg:w-3/4 w-full  py-10 shrink-1 visible">
          <Cart newProduct={newProduct} setNewProduct={setNewProduct} />
        </div>
      </div>

      <div className="flex h-screen w-full bg-gray-100 dark:bg-black dark:bg-opacity-20 rounded-3xl "></div>
    </div>
  );
};

export default NewRest;
