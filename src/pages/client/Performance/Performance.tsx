import { Col, Menu, MenuProps, Row, Select, Table } from "antd";
import { ReactComponent as BarChart } from "assets/BarChart.svg";
import { ReactComponent as Forecast } from "assets/Forecast.svg";
import RangePickerWithLabel from "components/RangePickerWithLabel/RangePickerWithLabel";
import SliderWithMenu from "components/SliderWithMenu/SliderWithRadioGroup";
import { useState } from "react";
import { columns, data } from "./tableData/ClientPerformance";

import DropDown from "assets/Icons/dropDown";
import "./Performance.css";

type MenuItem = Required<MenuProps>["items"][number];

function getMenuItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getMenuItem("Actuals", 1, <BarChart />),
  getMenuItem("Forcast", 2, <Forecast />),
];

const Performance = () => {
  const [performanceMenu, setPerformanceMenu] = useState("1");
  return (
    <>
      <h1>Performance</h1>
      <Row
        justify={"space-between"}
        align={"bottom"}
        style={{ minHeight: "90px", alignItems: "center" }}
      >
        <Col>
          <Menu
            onSelect={(item) => {
              setPerformanceMenu(item.key);
            }}
            selectedKeys={[performanceMenu]}
            items={items}
            style={{
              display: "flex",
              background: "none",
              width: "300px",
              border: "none",
              fontWeight: "700",
            }}
          />
        </Col>
        <Col>
          {performanceMenu === "1" && (
            <Select
              style={{ width: "150px" }}
              defaultValue="This month"
              options={[{ value: "This month", label: "This month" }]}
            />
          )}
          {performanceMenu === "2" && (
            <div style={{ display: "flex" }}>
              <SliderWithMenu />
              <RangePickerWithLabel label={"Projection"} />
            </div>
          )}
        </Col>
      </Row>
      <Table
        expandable={{
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <DropDown
                style={{ transform: "rotate(180deg)" }}
                onClick={(e: React.MouseEvent<any>) => onExpand(record, e)}
              />
            ) : (
              <DropDown
                onClick={(e: React.MouseEvent<any>) => onExpand(record, e)}
              />
            ),
        }}
        scroll={{ x: 1300 }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </>
  );
};

export default Performance;
