import { Card, Radio } from "antd";
import { ElementType, useEffect, useState } from "react";
import StacksIcon from "../../assets/Icons/Stacks";
import { USDcurrency } from "../../utils/formatters";
import classes from './PlanCard.module.css'

const activeHeadStyle = {
  borderColor: "#0062FF",
  backgroundColor: "#0062FF1A",
};

export enum Tenure {
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

interface PlanCardProps {
  title: string;
  amount: number;
  tenure: `${Tenure}`;
  description: string;
  selected?: boolean;
  onClick?: CallableFunction;
  Icon?: ElementType;
}

const PlanCard = ({
  title,
  amount,
  tenure,
  description,
  selected = false,
  onClick,
  Icon,
}: PlanCardProps) => {
  const [current, setCurrent] = useState(selected);

  const onCardClick = () => {
    if (onClick instanceof Function) {
      onClick();
    } else {
      setCurrent(true);
    }
  };

  useEffect(() => {
    setCurrent(selected);
  }, [selected]);

  return (
    <Card
      onClick={onCardClick}
      title={
        <div style={{ display: "flex", fontWeight: "normal" }}>
          {Icon ? <Icon className={classes.icon} /> : <StacksIcon className={classes.icon} />}
          <span
            style={{
              marginTop: "2px",
              fontWeight: "500",
              color: current ? "#0062FF" : "#000000",
            }}
          >
            {title}
          </span>
        </div>
      }
      extra={<Radio checked={current} />}
      hoverable
      style={{
        textAlign: "left",
        borderColor: current ? "#0062FF" : "#F2F3F7",
      }}
      headStyle={current ? activeHeadStyle : {}}
    >
      <p style={{ fontSize: "32px", fontWeight: "bold", margin: "0px" }}>
        {USDcurrency.format(amount)}
        <span style={{ fontSize: "14px", fontWeight: "400", color: "#7E7E8F" }}>
          per {tenure}
        </span>
      </p>
      <p
        style={{
          fontSize: "14px",
          fontWeight: "400",
          color: "#7E7E8F",
          margin: "0px",
        }}
      >
        {description}
      </p>
    </Card>
  );
};

export default PlanCard;
