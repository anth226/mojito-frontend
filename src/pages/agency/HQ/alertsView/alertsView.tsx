import { Col, Row } from 'antd';
import AlertBadge from 'components/AlertBadge/AlertBadge';
import { recentClients } from 'mockdata/RecentClients';

const AlertsView = () => {
  return (
    <Row gutter={[16, 16]} justify={'space-around'} align={'middle'}>
      {recentClients.map((client, index) => {
        return (
          <Col key={index}>
            <AlertBadge
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

export default AlertsView;
