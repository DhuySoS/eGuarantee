import { Button, type ButtonProps } from "antd";
import React from "react";

export interface UiButtonProps extends ButtonProps {}

const UiButton: React.FC<UiButtonProps> = ({ className = "", ...props }) => {
  return <Button className={className} {...props} />;
};

export default UiButton;
