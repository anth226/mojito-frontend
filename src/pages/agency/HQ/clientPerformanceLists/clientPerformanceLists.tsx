import { Col, Row } from "antd";
import TopPerformersCard from "./TopPerformersCard/TopPerformersCard";
import BottomPerformersCard from "./BottomPerformersCard/BottomPerformersCard";


const ClientPerformanceLists = () => {
  return (
    <Row gutter={[16, 16]} justify={"space-around"}>
      <Col xs={24} sm={24} md={24} lg={12}>
        <TopPerformersCard />
      </Col>
      <Col xs={24} sm={24} md={24} lg={12}>
        <BottomPerformersCard />
      </Col>
    </Row>
  );
};

export default ClientPerformanceLists;
