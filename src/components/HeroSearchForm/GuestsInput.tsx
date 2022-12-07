import React, { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import { FC } from "react";
import ClearDataButton from "./ClearDataButton";
import ButtonSubmit from "./ButtonSubmit";
import { GuestsObject } from "components/HeroSearchForm2Mobile/GuestsInput";
import { PathName } from "routers/types";

export interface GuestsInputProps {
  defaultValue: GuestsObject;
  onChange?: (data: GuestsObject) => void;
  fieldClassName?: string;
  className?: string;
  buttonSubmitHref?: PathName;
  hasButtonSubmit?: boolean;
}

const GuestsInput: FC<GuestsInputProps> = ({
  defaultValue,
  onChange,
  fieldClassName = "[ nc-hero-field-padding ]",
  className = "[ nc-flex-1 ]",
  buttonSubmitHref = "/",
  hasButtonSubmit = true,
}) => {
  

  return (
   
      
        <>
          <div
            className="flex-1 flex items-center focus:outline-none cursor-pointer "
          >


            {/* BUTTON SUBMIT OF FORM */}
            {hasButtonSubmit && (
              <div className="pr-8 xl:pr-4">
                <ButtonSubmit href={buttonSubmitHref} />
              </div>
            )}
          </div>
         
        </>
      
   
  );
};

export default GuestsInput;