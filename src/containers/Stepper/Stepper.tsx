import React, { FC, useState } from "react";
import "./stepper.css"
import { TiTick, } from "react-icons/ti";
import {BsCart,BsCartCheck} from "react-icons/bs";
import {CiSettings} from "react-icons/ci"
import {GoHome} from "react-icons/go"
import {SlBadge} from "react-icons/sl"

export interface StepperProps {
    currentStep: number;
    complete: boolean;
}

const Stepper: FC<StepperProps> = ({currentStep, complete}) => {
    const steps = ["Confirmed Order", "Prepared", "In Process", "Deliverd", "Rate Us"];
    const stepsvg = [
        <BsCart size={40} className="fill-white"/>,
        <BsCartCheck size={40} className="fill-white"/>,
        <CiSettings size={40} className="fill-white"/>,
        <GoHome  size={40} className="fill-white"/>,
        <SlBadge size={40} className="fill-white"/>





    ]
    // const [currentStep, setCurrentStep] = useState(1);
    // const [complete, setComplete] = useState(false);
    return (
        <>
            <div className="flex  justify-between flex-col md:flex-row items-center">
                {steps?.map((step, i) => (
                    <div
                        key={i}
                        className={`step-item  ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"
                            } `}
                    >
                        <div className="step">
                            {/* {i + 1 < currentStep || complete ? <TiTick className="text-white" size={24} /> : stepsvg[i]} */}
                             {i + 1 < currentStep || complete ? stepsvg[i]   : stepsvg[i]}
                        </div>
                        <p className="text-gray-500 text-sm">{step}</p>
                    </div>
                ))}
            </div>
            {/* {!complete && (
                <button
                    className="btn"
                    onClick={() => {
                        currentStep === steps.length
                            ? setComplete(true)
                            : setCurrentStep((prev) => prev + 1);
                    }}
                >
                    {currentStep === steps.length ? "Finish" : "Next"}
                </button>
            )} */}
        </>
    );
};

export default Stepper;