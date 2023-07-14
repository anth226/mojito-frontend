import { USDcurrency } from 'utils/formatters';
import classes from './connectionMetrics.module.css';

export interface ConnectionMetricItem {
  name: string;
  value: number;
}

interface ConnectionMetricsProps {
  metrics: ConnectionMetricItem[];
}

const ConnectionMetrics = ({ metrics }: ConnectionMetricsProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>Available Metrics</h2>
      {metrics.map((metric, index) => {
        return (
          <div className={classes.metric} key={index}>
            <span>{metric.name}</span>
            <b>{USDcurrency.format(metric.value)}</b>
          </div>
        );
      })}
    </div>
  );
};

export default ConnectionMetrics;
