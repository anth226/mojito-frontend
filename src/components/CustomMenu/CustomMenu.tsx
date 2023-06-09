import { Button } from "antd";
import { ReactNode, useState } from "react";
import classes from "./CustomMenu.module.css";

export interface MenuItem {
  label: string;
  value: string | number;
  icon?: ReactNode;
}

interface MenuProps {
  items: MenuItem[];
  onItemClick: Function;
}

interface ItemClick {
  event:
    | React.MouseEvent<HTMLAnchorElement, MouseEvent>
    | React.MouseEvent<HTMLButtonElement, MouseEvent>;
  item: MenuItem;
}

const HorizontalMenu = ({ items, onItemClick }: MenuProps) => {
  const [selected, setSelected] = useState<number>(0);

  const onClick = (event: ItemClick["event"], item: ItemClick["item"]) => {
    setSelected(item.value as number);
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <div className={classes.horizontal_menu}>
      {items.map((item) => {
        return (
          <Button
            type="text"
            icon={item.icon}
            size="large"
            key={item.value}
            onClick={(e) => onClick(e, item)}
            className={[
              classes.button,
              selected === item.value ? classes.selected : "",
            ].join(" ")}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
};

enum FlexDirection {
  ROW = "horizontal",
  ROW_REVERSE = "horizontal-reverse",
  COLUMN = "vertical",
  COLUMN_REVERSE = "vertical-reverse",
}

interface CustomMenuProps extends MenuProps {
  direction: `${FlexDirection}`;
}

const CustomMenu = ({ items, onItemClick, direction }: CustomMenuProps) => {
  switch (direction) {
    case FlexDirection.ROW:
      return <HorizontalMenu items={items} onItemClick={onItemClick} />;

    default:
      return <HorizontalMenu items={items} onItemClick={onItemClick} />;
  }
};

export default CustomMenu;
