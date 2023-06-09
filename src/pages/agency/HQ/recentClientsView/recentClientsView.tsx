import { Col, Row } from "antd";
import ClientBadge from "../../../../components/ClientBadge/ClientBadge";
import { recentClients } from "../../../../mockdata/RecentClients";

const RecentClientsView = () => {
  return (
    <Row gutter={[16, 16]} justify={"space-around"} align={"middle"}>
      {recentClients.map((client, index) => {
        return (
          <Col key={index}>
            <ClientBadge
              name={client.name}
              date={client.date}
              connections={client.connections}
              email={client.email}
              avatar={client.avatar}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default RecentClientsView;
