import React, { ReactNode } from "react";
import classes from "./RadioMenu.module.css";

interface Item {
  label: ReactNode;
  value: string;
}

interface RadioMenuProps extends React.InputHTMLAttributes<HTMLInputElement> {
  items: Item[];
  group: string;
  direction: "row" | "column";
}

const RadioMenu = ({
  items,
  group,
  direction = "row",
  defaultValue,
  ...props
}: RadioMenuProps) => {
  return (
    <div className={classes.radio_toolbar} style={{ flexDirection: direction }}>
      {items.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <input
              type="radio"
              id={item.value}
              name={group}
              style={{ display: "none" }}
              value={item.value}
              {...props}
              defaultChecked={defaultValue === item.value}
            />
            <label htmlFor={item.value}>{item.label}</label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default RadioMenu;
