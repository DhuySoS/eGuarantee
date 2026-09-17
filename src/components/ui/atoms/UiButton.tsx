import { Button, type ButtonProps } from "antd";
import React from "react";

type UiButtonProps = ButtonProps;

const UiButton: React.FC<UiButtonProps> = ({ className = "", ...props }) => {
  return <Button className={className} {...props} />;
};

export default UiButton;
