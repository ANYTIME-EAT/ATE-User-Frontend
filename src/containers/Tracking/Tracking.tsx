import Stepper from "containers/Stepper/Stepper";
import React, { useState, useEffect } from "react";
import { getOrderStatusApi } from "../../services/apiServices";
// import io from "socket.io-client";
import config from "../../config/config.json";

// const socket = io(config.SERVER_URL);
const socket = require("socket.io-client")(config.SERVER_URL, {
  rejectUnauthorized: true,
});

const Tracking = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [complete, setComplete] = useState<boolean>(false);

  const getCurrentStatus = (status: string) => {
    if (status === "pending") {
      setCurrentStep(1);
    } else if (status === "accepted") {
      setCurrentStep(2);
    } else if (status === "prepared") {
      setCurrentStep(3);
    } else if (status === "processing") {
      setCurrentStep(4);
    } else if (status === "delivered") {
      setCurrentStep(5);
    } else if (status === "rated") {
      setCurrentStep(5);
      setComplete(true);
    } else {
      setCurrentStep(4);
    }
  };
  const getOrderStatus = async (id: number) => {
    const response = await getOrderStatusApi(id);
    if (response.data.response === "success") {
      getCurrentStatus(response.data.response);
    }
  };

  const joinRoom = () => {
    socket.emit("join_room", 6);
  };

  useEffect(() => {
    getOrderStatus(5);
    joinRoom();
  }, []);

  const sendOrderStatus = () => {
    socket.emit("update_order_status", { status: "delivered", room: 6 });
  };

  useEffect(() => {
    if (socket) {
      socket.on("get_order_status", (data: any) => {
        getCurrentStatus(data.status);
      });
    }
  }, [socket]);

  return (
    <>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto rounded-2xl dark:bg-gray-800 bg-gray-100 shadow-2xl">
        <div className="flex md:flex-col flex-row justify-start space-y-3  items-center ">
          <Stepper currentStep={currentStep} complete={complete} />

          <button onClick={sendOrderStatus}>Update</button>
        </div>
      </div>
    </>
  );
};

export default Tracking;
