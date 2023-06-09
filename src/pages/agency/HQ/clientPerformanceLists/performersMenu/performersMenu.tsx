import { Button } from "antd";
import { useState } from "react";
import classes from "./performersMenu.module.css";

interface PerformersMenuItem {
  value: string;
}

interface PerformersMenuProps {
  items: PerformersMenuItem[];
  onSelect?: Function;
}

const PerformersMenu = ({ items, onSelect }: PerformersMenuProps) => {
  const [selected, setSelected] = useState(0);
  const onItemClick = (item: PerformersMenuItem, index: number) => {
    setSelected(index);
    if (onSelect instanceof Function) {
      onSelect();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {items.map((item, index) => {
        return (
          <Button
            className={index === selected ? classes.activeItem : ""}
            style={{ marginRight: "10px", marginTop: "10px" }}
            onClick={() => onItemClick(item, index)}
            key={index}
          >
            <b>{item.value}</b>
          </Button>
        );
      })}
    </div>
  );
};

export default PerformersMenu;
