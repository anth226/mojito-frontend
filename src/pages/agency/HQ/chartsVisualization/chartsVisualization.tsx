import { Line, LineConfig } from "@ant-design/plots";
import { Card, Col, Grid, Row, Statistic } from "antd";
import LineGraphMockData from "./lineGraphMockData.json";
import useWindowSize from "../../../../hooks/useWindowSIze";
import CustomBadge from "../../../../components/CustomBadge/CustomBadge";
import ArrowUp from "../../../../assets/Icons/ArrowUp";

const { IconBadge, DotBadge } = CustomBadge;

const { useBreakpoint } = Grid;

enum HiDPI {
  XL1 = 1270,
  XL2 = 1470,
}

const ChartsVisualization = () => {
  const screens = useBreakpoint();
  const size = useWindowSize();

  const config: LineConfig = {
    data: LineGraphMockData,
    xField: "year",
    yField: "value",
    seriesField: "category",
    xAxis: {
      type: "time",
    },
    yAxis: {
      label: {
        formatter: (v: any) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    legend: false,
  };

  return (
    <Card>
      <Row justify={"space-around"}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={size.width < HiDPI.XL1 ? 24 : size.width < 1470 ? 14 : 16}
          xxl={size.width < 1840 ? 16 : 18}
        >
          <Line {...config} />
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection:
              !screens.xl || (screens.xl && size.width < HiDPI.XL1)
                ? "row"
                : "column",
            justifyContent: "space-evenly",
            width:
              !screens.xl || (screens.xl && size.width < HiDPI.XL1)
                ? "100%"
                : "auto",
            flexWrap: "wrap",
          }}
        >
          <Card style={{ width: "250px" }}>
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
          <Card style={{ width: "250px" }}>
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
    </Card>
  );
};

export default ChartsVisualization;
