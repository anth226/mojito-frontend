import { Button, Col, Row, Select, Space } from 'antd';
import { ReactComponent as Filter } from 'assets/Filter.svg';
import ChartsVisualization from './chartsVisualization/chartsVisualization';
import ClientPerformanceLists from './clientPerformanceLists/clientPerformanceLists';
import RecentClientsView from './recentClientsView/recentClientsView';

const HQ = () => {
  return (
    <Row gutter={[16, 16]} justify={'space-evenly'}>
      <Col span={8} xs={24} sm={24} md={24} lg={24} xl={16}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}
            >
              <h1 style={{ margin: '0px' }}>Overview</h1>
              <Space>
                <Button type='text'>7 days</Button>
                <Button type='text'>MTD</Button>
                <Button type='text'>30 days</Button>
                <Button type='text'>90 days</Button>
                <Button type='text'>YTD</Button>
                <Select
                  style={{ width: '150px' }}
                  defaultValue='Performance'
                  options={[{ value: 'performance', label: 'Performance' }]}
                />
                <Button icon={<Filter />} />
              </Space>
            </div>
          </Col>
          <Col span={24}>
            <ChartsVisualization />
          </Col>
          <Col span={24}>
            <ClientPerformanceLists />
          </Col>
        </Row>
      </Col>

      <Col xl={8}>
        <h6
          style={{
            fontWeight: 600,
            fontSize: '20px',
            marginTop: '0px',
          }}
        >
          Recent Clients
        </h6>
        <RecentClientsView />
      </Col>
    </Row>
  );
};

export default HQ;
