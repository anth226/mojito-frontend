import { Button } from "antd";
import { ReactNode, useState } from "react";
import classes from "./connectionsDrawerMenu.module.css";

interface ConnectionsDrawerMenuItem {
  value: string;
  icon?: ReactNode;
}

interface ConnectionsDrawerMenuProps {
  items: ConnectionsDrawerMenuItem[];
  onSelect?: Function;
}

const ConnectionsDrawerMenu = ({
  items,
  onSelect,
}: ConnectionsDrawerMenuProps) => {
  const [selected, setSelected] = useState(0);
  const onItemClick = (item: ConnectionsDrawerMenuItem, index: number) => {
    setSelected(index);
    if (onSelect instanceof Function) {
      onSelect(item);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {items.map((item, index) => {
        return (
          <Button
            icon={item.icon ?? ""}
            className={
              index === selected ? classes.activeItem : classes.inactiveItem
            }
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100px",
              paddingLeft: "5px",
              paddingRight: "5px",
              marginRight: "8px",
            }}
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

export default ConnectionsDrawerMenu;
