import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

interface RangePickerWithLabelProps {
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
  label?: string;
}

const RangePickerWithLabel = (props: RangePickerWithLabelProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
      }}
    >
      <span
        style={{
          marginBottom: "5px",
          fontSize: "12px",
          fontWeight: "600",
          color: '#9A9AAF'
        }}
      >
        {props.label ?? "Label"}
      </span>

      <RangePicker
        placement={props.placement ?? "bottomRight"}
        defaultValue={[
          dayjs("2015/01/01", dateFormat),
          dayjs("2015/01/01", dateFormat),
        ]}
        format={dateFormat}
      />
    </div>
  );
};

export default RangePickerWithLabel;
