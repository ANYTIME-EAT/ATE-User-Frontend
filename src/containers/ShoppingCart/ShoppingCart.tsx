import { useState, FC, useEffect } from "react";
import React from 'react'
import ButtonClose from "shared/ButtonClose/ButtonClose";
import { Popover, Transition } from "@headlessui/react";
// import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import CustomInupt from "./components/CustomInupt";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import Heading1 from "components/Heading/Heading1";
import  { getProduct, getAllProductsAPI } from "services/apiServices"
import { getCartList, editQuantity, removeCart } from 'services/cartStorage'
import { values } from "lodash";


export interface ShoppingCartProps {
    className?: string;
    newProduct: boolean;
    setNewProduct(val: boolean): void;
}

const getTotal = (array:any) => {
    let total = 0;
    array && array.map((item:any) => {
        total += item.price * item.quantity
    })
    return total
}


const ShoppingCart: FC<ShoppingCartProps> = ({ className = "", newProduct, setNewProduct }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [items, setItems] = useState<any>([]);
    const [total, setTotal] = useState<any>(0);

    useEffect(() => {
        getItems()
    },[])

    const getItems = async() => {
        let cartList = JSON.parse(getCartList() || "[]")
        setItems(cartList)
        setNewProduct(false)
        setTotal(getTotal(cartList))
    }

    useEffect(() => {
        if(newProduct)
            getItems()
    },[newProduct])

    

    return (
        <>
            {showSidebar ? (
                <button
                    className="flex text-4xl text-black items-center cursor-pointer scroll-smooth fixed right-10 top-10 z-50"

                >
                    <ButtonClose
                        onClick={() => setShowSidebar(!showSidebar)} />
                </button>
            ) : (


                <button
                    className={`fixed h-12 w-12  z-50 flex items-center cursor-pointer right-2 top-10 p-2.5 bg-white hover:bg-neutral-100 dark:bg-gray-900 dark:hover:bg-primary-200 rounded-xl shadow-xl border border-neutral-200 dark:border-primary-600 focus:outline-none text-white ${className}`}
                    // style={{ position: "relative" }}

                    onClick={() => setShowSidebar(!showSidebar)}

                >



                    <svg

                        fill="#2563EB"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"

                    >

                        <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                    </svg>
                    <div
                        className="bg-red-700 rounded-full justify-items-center items-center"
                        style={{
                            color: "white",
                            width: "1.5rem",
                            height: "1.5rem",
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            top: "1.6rem",
                            transform: "translate(25%, 25%)",
                        }}>
                        {items.length}
                    </div>

                </button>
            )}

            {/* <div
                className={`top-0 right-0 lg:w-1/5 sm:w-5/6 md:w-2/3 bg-gray-500 p-28  fixed h-screen z-40  ease-in-out duration-300 ${showSidebar ? "translate-x-0 " : "translate-x-full"
                    }`}
            > */}
            <div className={`top-6 right-0 p-3 z-40 w-screen  max-w-lg fixed ease-in-out duration-300 ${showSidebar ? "translate-x-0 " : "translate-x-full"
                }`}>
                <div className={`rounded-2xl  bg-white dark:bg-neutral-800  nc-custom-shadow-1 `}>
                    <div className="relative p-6 ">
                        <span className="text-xl font-semibold">Cart</span>
                        <div className="w-full border-b border-neutral-200 dark:border-neutral-700 mt-4"></div>
                        <div className="flex flex-col max-w-2xl p-1 space-y-2 sm:p-1 dark:bg-inherit dark:text-gray-100 ">

                            <ul className="flex flex-col divide-y divide-gray-700  overflow-auto h-64">
                                {items && items.map((item: any, key: number) => {
                                    return [
                                        // <p>{item.name} : {item.price}</p>
                                        <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                                            <div className="flex w-full space-x-2 sm:space-x-4">
                                                <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-20 sm:h-20 dark:bg-gray-500" src={item.image} alt="Polaroid camera"
                                                />
                                                <div className="flex flex-col justify-between w-full pb-4">
                                                    <div className="flex justify-between w-full pb-2 space-x-2">
                                                        <div className="space-y-1">
                                                            <h3 className="text-lg font-semibold leading-snug sm:pr-8">{item.name}</h3>
                                                            <p className="text-sm dark:text-gray-400">{item.quantity}</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-lg font-semibold">{item.price * item.quantity} €</p>
                                                            {/* <p className="text-sm line-through dark:text-gray-600">75.50€</p> */}
                                                        </div>
                                                    </div>
                                                    <div className="flex text-sm ">

                                                        <div className="flex items-right px-2 py-1 pl-0 space-x-1">
                                                            <CustomInupt className="mr-2" defaultValue={item.quantity} onChange={(e) => {editQuantity(item.id, item.type, e); setNewProduct(true);}}/>
                                                        </div>
                                                        <button type="button" className="flex items-center px-1 py-1 pl-0 space-x-1 fill-red-600" onClick={() => {removeCart(item.id, item.type); setNewProduct(true);}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-3 h-3 ">
                                                                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                                                <rect width="32" height="200" x="168" y="216"></rect>
                                                                <rect width="32" height="200" x="240" y="216"></rect>
                                                                <rect width="32" height="200" x="312" y="216"></rect>
                                                                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                                            </svg>
                                                            <span className="text-red-700">Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                    ]
                                })}
                                {/* {items[0].name} */}         
                            </ul>
                            <div className="space-y-1 text-right">
                                <p>Total amount :
                                    <span className="font-semibold"> {total} €</span>
                                </p>
                                <p className="text-sm dark:text-gray-400">Not including taxes and shipping costs</p>
                            </div>

                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 p-5">
                        <a
                            className="flex items-center justify-center w-full px-4 py-2 !rounded-xl text-sm font-medium bg-primary-6000 text-white hover:bg-primary-700"
                            href='/checkout'
                            // target="_blank"
                            rel="noopener noreferrer"
                        >
                            {/* <ShoppingCartIcon className="w-4 h-4" /> */}
                            <ShoppingBagIcon className="w-4 h-4" />
                            <span className="ml-2">CheckOut</span>
                        </a>
                    </div>
                </div>
            </div>
            {/* </div> */}
            
        </>

    )
}

export default ShoppingCart;