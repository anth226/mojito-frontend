import { Card, Row, Col, Statistic } from 'antd';
import { USDcurrency } from 'utils/formatters';
import CustomBadge from 'components/CustomBadge/CustomBadge';
import {
  percentageIcons,
  performance,
  performanceColors,
} from 'constants/Arrows';

const { IconBadge } = CustomBadge;

export interface headerCard {
  title: string;
  value: number;
  percentage: number;
  performance: performance;
  comparisonAmount: number;
}

const ClientDashboardHeaderCard = ({ data }: { data: headerCard }) => {
  return (
    <Card style={{ backgroundColor: 'transparent', border: 'none' }}>
      <Row align='bottom'>
        <Col>
          <Statistic
            prefix={'$'}
            title={<b style={{ color: '#000000' }}>{data.title}</b>}
            value={data.value}
            valueStyle={{ fontSize: '30px', fontWeight: '700' }}
          />
        </Col>
        <Col>
          <IconBadge
            icon={percentageIcons[data.performance]}
            backgroundColor='transparent'
            color={performanceColors[data.performance]}
            text={<b>{data.percentage}%</b>}
          />
        </Col>
        <Col span={24}>
          <p style={{ margin: 0, color: '#656575' }}>
            Compared to {USDcurrency.format(data.comparisonAmount)} last month
          </p>
        </Col>
      </Row>
    </Card>
  );
};

const ClientDashboardHeader = ({
  headerData,
}: {
  headerData: headerCard[];
}) => {
  return (
    <Row>
      {headerData?.map((data, index) => {
        return (
          <Col span={6} key={index}>
            <ClientDashboardHeaderCard data={data} />
          </Col>
        );
      })}
    </Row>
  );
};

export default ClientDashboardHeader;
