import React, { FC, useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

export interface EmptyCartProps {
    className?: string;
    defaultValue?: number;
    min?: number;
    max?: number;
    label?: string;
    desc?: string;
}

const EmptyCart: FC<EmptyCartProps> = ({
    className = "w-full",
}) => {


    return (
        <div className="top-6 right-0 p-3 z-40 w-screen  max-w-lg fixed ease-in-out duration-300 ">
            <div className={`rounded-2xl  bg-white dark:bg-neutral-800  nc-custom-shadow-1 `}>
                <div className="relative p-6 ">
                    <span className="text-xl font-semibold">Cart</span>
                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700 mt-4"></div>
                    <div className="flex flex-col max-w-2xl p-1 space-y-2 sm:p-1 dark:bg-inherit dark:text-gray-100 ">
                        <p>
                            Your Cart is Empty
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmptyCart;
