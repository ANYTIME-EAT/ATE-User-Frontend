import { useState, FC, useEffect } from "react";
import React from 'react'
import ButtonClose from "shared/ButtonClose/ButtonClose";
import { Popover, Transition } from "@headlessui/react";
// import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import CustomInupt from "./CustomInput";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import Heading1 from "components/Heading/Heading1";
import { getProduct, getAllProductsAPI } from "services/apiServices"
import { getCartList, editQuantity, removeCart } from 'services/cartStorage'
import { values } from "lodash";
import { getAvatar } from 'services/apiServices'


export interface CartProps {
    className?: string;
    newProduct: boolean;
    setNewProduct(val: boolean): void;
}

const getTotal = (array: any) => {
    let total = 0;
    array && array.map((item: any) => {
        total += item.price * item.quantity
    })
    return total
}


const Cart: FC<CartProps> = ({ className = "", newProduct, setNewProduct }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [items, setItems] = useState<any>([]);
    const [total, setTotal] = useState<any>(0);
    const [images, setImages] = useState<any>([]);

    const getProfile = (list: any) => {
        list.map(async (item: any, key: number) => {
            let file = await getAvatar(item.image)
            setImages((s: any) => {
                return [
                    ...s, {
                        id: item.id,
                        author: item.author,
                        image: URL.createObjectURL(file)
                    }
                ]
            })
        })
    }

    const getProductImg = (id: number, author: string) => {
        let product_image = "";
        images && images.map((item: any) => {
            if (item.id == id && item.author == author) {
                product_image = item.image;
            }
        })
        return product_image;
    }


    useEffect(() => {
        getItems()
    }, [])

    const getItems = async () => {
        let cartList = JSON.parse(getCartList() || "[]")
        setItems(cartList)
        setNewProduct(false)
        setTotal(getTotal(cartList))
        getProfile(cartList)
    }

    useEffect(() => {
        if (newProduct)
            getItems()
    }, [newProduct])



    return (
        <>
            <div className={` p-1  w-full  `}>
                <div className={`rounded-3xl bg-white dark:bg-neutral-800 shadow-2xl border-2 border-gray-200`}>
                    <div className="relative p-6 ">
                        <span className="text-xl font-semibold">Cart</span>
                        <p>McDonalds</p>
                        {/* <div className="w-full border-b border-neutral-200 dark:border-neutral-700 mt-4"></div> */}
                        <div className="flex flex-col max-w-2xl p-1 space-y-2 sm:p-1 dark:bg-inherit dark:text-gray-100 ">

                            <ul className="flex flex-col divide-y divide-gray-700  overflow-auto h-full overflow-x-hidden">
                                {items && items.map((item: any, key: number) => {

                                    return [

                                        <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
                                            <div className="flex w-full space-x-2 sm:space-x-4">
                                                <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-20 sm:h-20 dark:bg-gray-500"
                                                    src={getProductImg(item.id, item.author)} alt={item.name} loading="lazy"
                                                />
                                                <div className="flex flex-col justify-between w-full pb-4">
                                                    <div className="flex justify-between w-full pb-2 space-x-2">
                                                        <div className="space-y-1">
                                                            <h6 className="leading-snug ">{item.name}</h6>
                                                            <p>{item.description}</p>
                                                            <p className="text-sm dark:text-gray-400">x {item.quantity}</p>
                                                            {/* <p className="text-sm ">+Coke</p> */}
                                                        </div>
                                                        <div className=" justify-center mb-10">
                                                            <h6 className=" text-sm font-bold">{item.price * item.quantity} €</h6>
                                                            {/* <p className="text-sm line-through dark:text-gray-600">75.50€</p> */}
                                                        </div>

                                                        {/* <div className="text-center">
                              <p className="text-lg font-semibold">240 €</p>
                              
                            </div> */}
                                                    </div>
                                                    <div className="flex  ">
                                                        <div className="flex items-right px-2 py-1 pl-0 space-x-1">
                                                            <CustomInupt className="mr-2" defaultValue={item.quantity} onChange={(e) => { editQuantity(item.id, item.type, e); setNewProduct(true); }} />
                                                        </div>

                                                        {/* <div className="flex items-right px-2 py-1 pl-0 space-x-1">
                              <CustomInupt className="mr-2" />
                            </div> */}
                                                        <button type="button" className="flex items-center px-1 py-1 pl-0 space-x-1 fill-red-600"
                                                            onClick={() => { removeCart(item.id, item.type); setNewProduct(true); }}
                                                        >
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
                                {/* <p className="text-sm dark:text-gray-400">Not including taxes and shipping costs</p> */}
                            </div>

                        </div>
                        <div className="bg-gray-50 dark:bg-white/5 p-5 rounded-3xl  mt-10">
                            <a
                                className="flex items-center justify-center w-full px-4 py-2 !rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-800"
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
            </div>
            {/* </div> */}

        </>

    )
}

export default Cart;