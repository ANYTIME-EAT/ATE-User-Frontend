import Button, { ButtonProps } from "shared/Button/Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`text-xs ttnc-Button bg-red-500 disabled:bg-opacity-70 xl:bg-red-6000 hover:bg-red-700 text-white ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
