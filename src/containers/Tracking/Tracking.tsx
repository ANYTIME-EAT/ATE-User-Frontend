import Stepper from 'containers/Stepper/Stepper';
import React, { useState, useEffect } from 'react'
import { getOrderStatusApi } from '../../services/apiServices'
import NcImage from 'shared/NcImage/NcImage';
import tick from "images/checked.png"
// import io from 'socket.io-client'

// const socket = require("socket.io-client")("http://localhost:5005", {
//   rejectUnauthorized: false // WARN: please do not do this in production
// });

// const socket = io('http://localhost:5005')


const Tracking = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [complete, setComplete] = useState<boolean>(false);

    const getOrderStatus = async (id: number) => {
        const response = await getOrderStatusApi(id);
        if (response.data.response === "success") {
            if (response.data.status === "pending") {
                setCurrentStep(1)
            } else if (response.data.status === "accepted") {
                setCurrentStep(2)
            } else if (response.data.status === "prepared") {
                setCurrentStep(3)
            } else if (response.data.status === "processing") {
                setCurrentStep(4)
            } else if (response.data.status === "delivered") {
                setCurrentStep(5)
            } else if (response.data.status === "rated") {
                setCurrentStep(5)
                setComplete(true)
            }
        }
    }

    useEffect(() => {
        getOrderStatus(5)
    }, [])

    const content = () => {
        return (
            <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto rounded-2xl dark:bg-gray-800 bg-white shadow-2xl">
                <div className="flex justify-start space-y-3 flex-row md:flex-col items-center ">

                    <Stepper currentStep={currentStep} complete={complete} />

                </div>
                <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0 ">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start dark:bg-gray-800  bg-white px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                <div className=" border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col items-start space-y-8 shadow-lg">
                                        <iframe src="https://maps.google.com/maps?q=Bus%20stand,mannar&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="300" style={{ border: "0" }}></iframe>
                                        <div className='flex space-y-3 flex-col items-center shadow-sm'>


                                            <NcImage
                                                src={tick}
                                                className="object-cover h-10 w-10"
                                            />
                                            <h4 className=" dark:text-white font-semibold   text-gray-500">
                                                Estimated Deivery
                                            </h4>

                                            <p className=" dark:text-gray-300 font-medium  text-gray-600"> {new Date().toLocaleString()}</p>
                                            <p className=" dark:text-gray-300 font-medium  text-gray-600">Payment Method : Credit Card</p>


                                        </div>
                                    </div>


                                    <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start bg-gray-100 md:items-center  w-full shadow-xl md:ml-11">
                                    
                                        <div className="pb-4 md:pb-8 w-40">
                                            <p className='text-lg md:text-lg dark:text-white font-semibold  text-gray-800 mb-8'>Order Details</p>
                                            <img className="flex-shrink-0 object-contain w-full h-full dark:border-transparent rounded-md" src='https://i.ibb.co/84qQR4p/Rectangle-10.png' loading="lazy" />

                                        </div>
                                        <div className=" border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                <h3 className="text-md dark:text-white xl:text-lg font-semibold leading-4 text-gray-800">item.name</h3>

                                            </div>
                                            <div className="flex justify-start items-start flex-col space-y-2  w-full">
                                                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-500 text-gray-400">Quantity: </span>5</p>
                                                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-500 text-gray-400">Price: </span>
                                                    55 €</p>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    return (
        <>
            <div className={`nc-Tracking`} data-nc-id="Tracking">
                <main className="container mt-11 mb-24 lg:mb-32 ">
                    <div className=" mx-auto">{content()}</div>
                </main>
            </div>
        </>
    )
};



export default Tracking