import { Tag } from "antd";
import { ReactNode } from "react";
import ArrowUp from "../../assets/Icons/ArrowUp";

interface IconBadgeProps {
  icon?: ReactNode;
  color?: string;
  backgroundColor?: string;
  text?: ReactNode;
}

const IconBadge = ({ icon, color, backgroundColor, text }: IconBadgeProps) => {
  return (
    <Tag
      style={{
        border: "none",
        borderRadius: "16px",
        padding: "2px 10px",
        marginBottom: "5px",
      }}
      color={backgroundColor ?? "#ECFDF3"}
    >
      {icon?? <ArrowUp />}
      <span style={{ color: color ?? "#027A48", marginLeft: "5px" }}>
        {text ? text : '7.2%'}
      </span>
    </Tag>
  );
};

interface DotBadgeProps {
  width?: string | number;
  height?: string | number;
  color?: string;
}

const DotBadge = ({ width, height, color }: DotBadgeProps) => {
  return (
    <div
      style={{
        marginBottom: "20px",
        width: width ?? "10px",
        height: height ?? "10px",
        backgroundColor: color ?? "#0062FF",
        borderRadius: "25px",
      }}
    />
  );
};

const CustomBadge = {
  IconBadge,
  DotBadge,
};

export default CustomBadge;
