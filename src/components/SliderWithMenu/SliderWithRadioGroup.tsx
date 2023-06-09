import { CheckboxOptionType, Radio, RadioChangeEvent, Slider } from "antd";
import { useState } from "react";
import classes from "./SliderWithRadioGroup.module.css";

function getMenuItem(
  label: string,
  value: number
): CheckboxOptionType {
  return {
    label,
    value,
    style: {
      width: 24,
      height: 16,
      lineHeight: '1.1'
    }
  } as CheckboxOptionType;
}

const items: CheckboxOptionType[] = [getMenuItem("$", 0), getMenuItem("%", 1)];

const SliderWithRadioGroup = () => {
  const [typeOfExpense, setTypeOfExpense] = useState<number>(0)

  return (
    <div
      style={{
        marginBottom: "10px",
        marginRight: '10px'
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#9A9AAF",
          }}
        >
          Ad Spend
        </span>
        <Radio.Group
          className={classes.radioGroup}
          options={items}
          optionType="button"
          buttonStyle="solid"
          size="small"
          defaultValue={typeOfExpense}
          onChange={(event : RadioChangeEvent) => setTypeOfExpense(event.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#FFFFFF",
          padding: "0px 16px",
          borderRadius: "5px",
          width: '356px'
        }}
      >
        <Slider
          min={1}
          max={20}
          style={{
            width: "274px",
          }}
            // onChange={onChange}
          //   value={typeof inputValue === 'number' ? inputValue : 0}
        />
        <span
          style={{
            fontWeight: "700",
            marginLeft: "10px",
          }}
        >
          {items[typeOfExpense].label}149.87
        </span>
      </div>
    </div>
  );
};

export default SliderWithRadioGroup;
