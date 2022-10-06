import React from "react";
import { ButtonProps } from "../../types/button";

const Button: React.FC<ButtonProps> = ({
  isDisabled = false,
  version = "primary",
  title,
  type = "button",
}) => {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {title}
    </button>
  );
};

export default Button;
