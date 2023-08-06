import { Card } from 'antd';
import { USDcurrency } from 'utils/formatters';
import CustomBadge from 'components/CustomBadge/CustomBadge';
import classes from './ClientDashboardTrafficGraph.module.css';
import { Area } from '@ant-design/plots';
import {
  percentageIcons,
  performance,
  performanceBackgroundColors,
  performanceColors,
} from 'constants/Arrows';
import { useMemo } from 'react';

const { IconBadge } = CustomBadge;

export interface TrafficCardData {
  title: string;
  value: number;
  percentage: number;
  overviewDirection: performance;
}
export interface ClientDashboardTrafficGraphProps {
  data?: { [key: string]: string }[];
  trafficCardData: TrafficCardData;
  trafficGraphData: any;
}

const ClientDashboardTrafficGraph = ({
  data,
  trafficCardData,
  trafficGraphData,
}: ClientDashboardTrafficGraphProps) => {
  const config = useMemo(() => {
    return {
      data: trafficGraphData[1] || [],
      xField: 'month',
      yField: 'value',
      autoFit: false,
      height: 200,
      xAxis: {
        range: [0, 1],
        tickCount: 5,
      },
      areaStyle: () => {
        return {
          fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
        };
      },
    };
  }, [trafficGraphData]);

  const { title, value, overviewDirection, percentage } = trafficCardData;
  return (
    <Card>
      <p className={classes.traffic_type}>{title}</p>
      <span>
        <span className={classes.traffic_overview}>
          {USDcurrency.format(value)}
        </span>
        <IconBadge
          icon={percentageIcons[overviewDirection]}
          color={performanceColors[overviewDirection]}
          backgroundColor={performanceBackgroundColors[overviewDirection]}
          text={percentage + '%'}
        />
      </span>
      <Area style={{ marginTop: '12px' }} {...config} />
    </Card>
  );
};

export default ClientDashboardTrafficGraph;
