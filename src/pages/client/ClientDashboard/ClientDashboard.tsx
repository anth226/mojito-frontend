import { Row, Col, Space, Button, Select, Divider } from 'antd';
import { ReactComponent as Filter } from 'assets/Filter.svg';
import ClientDashboardHeader, {
  headerCard,
} from './ClientDashboardHeader/ClientDashboardHeader';
import Slider, { slide } from './Slider/Slider';
import { Connections } from 'assets/base64Icons';
import { useState } from 'react';
import ClientDashboardYTDChartsVisualization from './ClientDashboardYTDChartsVisualization/ClientDashboardYTDChartsVisualization';
import ClientDashboardTrafficGraph, {
  ClientDashboardTrafficGraphProps,
} from './ClientDashboardTrafficGraph/ClientDashboardTrafficGraph';
import { performance } from 'constants/Arrows';

const headerCardsData: headerCard[] = [
  {
    title: 'Revenue',
    value: 32134,
    percentage: 2.5,
    performance: performance.UP,
    comparisonAmount: 21340,
  },
  {
    title: 'Ad Spend',
    value: 4541,
    percentage: 2.5,
    performance: performance.DOWN,
    comparisonAmount: 5540,
  },
  {
    title: 'ROAS',
    value: 1324,
    percentage: 4.5,
    performance: performance.UP,
    comparisonAmount: 890,
  },
  {
    title: 'Revenue',
    value: 87324,
    percentage: 31,
    performance: performance.DOWN,
    comparisonAmount: 196129,
  },
];

const connections: slide[] = [
  {
    connectionName: 'Meta',
    connectionValue: 14543,
    connectionImage: Connections.META,
  },
  {
    connectionName: 'TikTok',
    connectionValue: 13543,
    connectionImage: Connections.TIKTOK,
  },
  {
    connectionName: 'Google',
    connectionValue: 11543,
    connectionImage: Connections.GOOGLE,
  },
  {
    connectionName: 'Shopify',
    connectionValue: 11543,
    connectionImage: Connections.GOOGLE_ADS,
  },
  {
    connectionName: 'Shopify',
    connectionValue: 11543,
    connectionImage: Connections.GOOGLE_ADS,
  },
];

const trafficCardData: Omit<ClientDashboardTrafficGraphProps, 'data'>[] = [
  {
    title: 'CPM',
    value: 1218,
    overviewDirection: performance.UP,
    percentage: 7.2,
  },
  {
    title: 'CTR',
    value: 1218,
    overviewDirection: performance.DOWN,
    percentage: 7.2,
  },
  {
    title: 'Traffic',
    value: 1218,
    overviewDirection: performance.UP,
    percentage: 7.2,
  },
];

const ClientDashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentConnection, setCurrentConnection] = useState(0);

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col span={24}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <h1 style={{ margin: '0px' }}>Company Name</h1>
            <Space>
              <Select
                style={{ width: '160px' }}
                defaultValue='m-t-d'
                options={[
                  {
                    value: 'm-t-d',
                    label: (
                      <span style={{ color: '#000000', fontWeight: 500 }}>
                        Month to Date
                      </span>
                    ),
                  },
                ]}
              />
              <Button icon={<Filter />} />
            </Space>
          </div>
        </Col>
        <ClientDashboardHeader headerData={headerCardsData} />
        <Divider />
        <Col span={24}>
          <Slider
            connections={connections}
            getCurrentActive={(currentSlide: number) => {
              setCurrentConnection(currentSlide);
            }}
          />
        </Col>
        <Col span={24}>
          <ClientDashboardYTDChartsVisualization />
        </Col>
        <Col span={8}>
          <ClientDashboardTrafficGraph {...trafficCardData[0]} />
        </Col>
        <Col span={8}>
          <ClientDashboardTrafficGraph {...trafficCardData[1]} />
        </Col>
        <Col span={8}>
          <ClientDashboardTrafficGraph {...trafficCardData[2]} />
        </Col>
      </Row>
    </>
  );
};

export default ClientDashboard;
