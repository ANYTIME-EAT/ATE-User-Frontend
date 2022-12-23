import Stepper from 'containers/Stepper/Stepper';
import React, { useState, useEffect} from 'react'
import {getOrderStatusApi} from '../../services/apiServices'
import io from 'socket.io-client'

// const socket = require("socket.io-client")("http://localhost:5005", {
//   rejectUnauthorized: false // WARN: please do not do this in production
// });

// const socket = io('http://localhost:5005')


const Tracking = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [complete, setComplete] = useState<boolean>(false);

    const getOrderStatus = async(id: number) => {
        const response = await getOrderStatusApi(id);
        if(response.data.response === "success"){
            if(response.data.status === "pending"){
                setCurrentStep(1)
            }else if(response.data.status === "accepted"){
                setCurrentStep(2)
            }else if(response.data.status === "prepared"){
                setCurrentStep(3)
            }else if(response.data.status === "processing"){
                setCurrentStep(4)
            }else if(response.data.status === "delivered"){
                setCurrentStep(5)
            }else if(response.data.status === "rated"){
                setCurrentStep(5)
                setComplete(true)
            }
        }
    }

    useEffect(() => {
        getOrderStatus(5)
    },[])

    return (
        <>
            <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto rounded-2xl dark:bg-gray-800 bg-gray-100 shadow-2xl">
                <div className="flex md:flex-col flex-row justify-start space-y-3  items-center ">
                    
                    <Stepper  currentStep={currentStep} complete={complete}/>
                    
                </div>
            </div>
        </>
    )
};



export default Tracking