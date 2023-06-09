import { Line, LineConfig } from "@ant-design/plots";
import { Card, Col, Grid, Row, Statistic } from "antd";
import LineGraphMockData from "./lineGraphMockData.json";
import useWindowSize from "../../../../hooks/useWindowSIze";
import CustomBadge from "../../../../components/CustomBadge/CustomBadge";
import ArrowUp from "../../../../assets/Icons/ArrowUp";
import dayjs from "dayjs";
import { USDcurrency } from "../../../../utils/formatters";
import "./ClientDashboardYTDChartsVisualization.css";
import classes from "./ClientDashboardYTDChartsVisualization.module.css";
import { useMemo } from "react";

const { IconBadge, DotBadge } = CustomBadge;

const { useBreakpoint } = Grid;

enum HiDPI {
  XL1 = 1270,
  XL2 = 1470,
}

const ClientDashboardYTDChartsVisualization = () => {
  const screens = useBreakpoint();
  const size = useWindowSize();

  const config: LineConfig = useMemo(() => {
    return {
      data: LineGraphMockData,
      xField: "year",
      yField: "value",
      seriesField: "category",
      xAxis: {
        type: "time",
        label: {
          formatter(text, item, index) {
            return dayjs(text).format("MMM");
          },
        },
      },
      yAxis: {
        label: {
          formatter: (v: any) =>
            `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      legend: false,
      tooltip: {
        customContent(title, data) {
          return (
            <div className={classes.custom_tooltip_container}>
              <div className={classes.custom_tooltip_header}>
                <span className={classes.custom_tooltip_header_title}>
                  {dayjs(title).format("MMM")}
                </span>
                <span className={classes.custom_tooltip_header_subtitle}>
                  {dayjs(title).format("YYYY")}
                </span>
              </div>
              {[1, 2, 3, 4, 5].map((entry) => {
                return (
                  <div className={classes.custom_tooltip_entry}>
                    <span className={classes.custom_tooltip_entry_name}>
                      Revenue
                    </span>
                    <span>
                      <span className={classes.custom_tooltip_entry_value}>
                        {USDcurrency.format(1280)}
                      </span>
                      <IconBadge icon={<ArrowUp />} />
                    </span>
                  </div>
                );
              })}
            </div>
          );
        },
      },
    };
  }, []);

  return (
    <Card bordered={false}>
      <Row>
        <Col
          // xs={24}
          // sm={24}
          // md={24}
          // lg={24}
          // xl={size.width < HiDPI.XL1 ? 24 : size.width < 1470 ? 14 : 16}
          // xxl={size.width < 1840 ? 16 : 18}
          span={18}
        >
          <Line className="custom_tooltip_chart" {...config} />
        </Col>
        <Col
          // style={{
          //   display: "flex",
          //   flexDirection:
          //     !screens.xl || (screens.xl && size.width < HiDPI.XL1)
          //       ? "row"
          //       : "column",
          //   justifyContent: "space-evenly",
          //   width:
          //     !screens.xl || (screens.xl && size.width < HiDPI.XL1)
          //       ? "100%"
          //       : "auto",
          //   flexWrap: "wrap",
          // }}
          span={6}
        >
          <Row gutter={[0, 80]}>
            <Col span={24}>
              <Card style={{ width: "100%" }}>
                <Row align="bottom" justify={"space-between"}>
                  <Col>
                    <Statistic
                      prefix={"$"}
                      title="Revenue"
                      value={1218}
                      valueStyle={{ fontSize: "30px", fontWeight: "700" }}
                    />
                  </Col>
                  <Col>
                    <IconBadge icon={<ArrowUp />} />
                  </Col>
                  <Col>
                    <DotBadge color="#0062FF" />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <Card style={{ width: "100%" }}>
                <Row align="bottom" justify={"space-between"}>
                  <Col span={12}>
                    <Statistic
                      prefix={"$"}
                      title="Ad Spend"
                      value={1218}
                      valueStyle={{ fontSize: "30px", fontWeight: "700" }}
                    />
                  </Col>
                  <Col>
                    <IconBadge icon={<ArrowUp />} />
                  </Col>
                  <Col>
                    <DotBadge color="#FF8743" />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default ClientDashboardYTDChartsVisualization;
