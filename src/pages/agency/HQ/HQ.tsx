import { Button, Col, Row, Select, Space } from 'antd';
import { ReactComponent as Filter } from 'assets/Filter.svg';
import { Fragment, useState } from 'react';
import ChartsVisualization from './chartsVisualization/chartsVisualization';
import ClientPerformanceLists from './clientPerformanceLists/clientPerformanceLists';
import RecentClientsView from './recentClientsView/recentClientsView';
import AlertsView from './alertsView/alertsView';
import { Alert } from 'interfaces/Alert';
import { mockAlerts } from 'mockdata/Alerts';
import AlertPanel from 'components/AlertPanel/AlertPanel';
import { AlertStatus } from 'enums/alerts';

const HQ = () => {
  const [alertsPanel, setAlertsPanel] = useState<true | false>(false);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  const onAlertClickPanel = (clickedAlert: Alert) => {
    const temp: Alert[] = [];
    for (const alert of mockAlerts) {
      if (alert.id === clickedAlert.id) {
        temp.push({
          ...alert,
          status:
            clickedAlert.status === AlertStatus.NEW
              ? AlertStatus.ARCHIVE
              : AlertStatus.NEW,
        });
      } else {
        temp.push({ ...alert });
      }
    }
    setAlerts(temp);
  };
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
        <Fragment>
          <h6
            style={{
              fontWeight: 600,
              fontSize: '20px',
              margin: '0 24px 24px 24px',
            }}
          >
            Recent Clients
          </h6>
          <RecentClientsView />
        </Fragment>
        <Fragment>
          <Space
            style={{
              margin: '24px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <h6
              style={{
                fontWeight: 600,
                fontSize: '20px',
                margin: '0px',
              }}
            >
              Alerts
            </h6>
            <span
              style={{
                fontWeight: 700,
                fontSize: '16px',
                margin: '0px',
                color: '#0062FF',
                cursor: 'pointer',
              }}
              onClick={() => setAlertsPanel(true)}
            >
              See All
            </span>
          </Space>
          <AlertsView />
        </Fragment>
      </Col>
      <AlertPanel
        onAlertEyeClick={onAlertClickPanel}
        alerts={alerts}
        open={alertsPanel}
        onClose={() => setAlertsPanel(false)}
        closable={false}
      />
    </Row>
  );
};

export default HQ;
