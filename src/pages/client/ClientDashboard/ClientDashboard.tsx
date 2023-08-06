import { Button, Col, Divider, Row, Select, Skeleton, Space } from 'antd';
import {
  GET_LIST_CONNECTIONS,
  GET_METRICS_TO_DATE,
  GET_METRICS_YEARLY,
} from 'api/graphql/queries';
import { ReactComponent as Filter } from 'assets/Filter.svg';
import { Connections } from 'assets/base64Icons';
import { performance } from 'constants/Arrows';
import { useGraphQlQuery } from 'hooks/useCustomHookApollo';
import { useMemo, useState } from 'react';
import { getAccountInfo } from 'utils/helpers';
import ClientDashboardHeader, {
  headerCard,
} from './ClientDashboardHeader/ClientDashboardHeader';
import ClientDashboardTrafficGraph, {
  TrafficCardData,
} from './ClientDashboardTrafficGraph/ClientDashboardTrafficGraph';
import ClientDashboardYTDChartsVisualization from './ClientDashboardYTDChartsVisualization/ClientDashboardYTDChartsVisualization';
import Slider from './Slider/Slider';

const curYear = new Date().getFullYear();

const percentage = (value: number, last: number) => {
  if (!last) return 0;
  return (100 * (value - last)) / last;
};

function groupBy(objectArray: any, property: string) {
  return objectArray?.reduce(function (accumulator: any, obj: any) {
    let key = obj[property];
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    accumulator[key].push(obj);
    return accumulator;
  }, {});
}

const SkeletonCustom = ({ value }: { value: number }) => {
  return (
    <Row style={{ width: '100%' }}>
      {[...Array(value)]?.map((_, i: number) => {
        return (
          <Col span={24 / value} key={i}>
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          </Col>
        );
      })}
    </Row>
  );
};

const trafficCardData: TrafficCardData[] = [
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
  const [currentConnection, setCurrentConnection] = useState<
    number | undefined
  >();

  const [period, setPriod] = useState('MONTH_TO_DATE');

  const accountInfo = getAccountInfo();

  const { data: dataMetricsToDate, loading: isLoadingFetchMetricsToDate } =
    useGraphQlQuery(GET_METRICS_TO_DATE, {
      variables: {
        period: period,
        clientId: null,
      },
    });

  const { data: dataMetricsYearly } = useGraphQlQuery(GET_METRICS_YEARLY, {
    variables: {
      fromYear: curYear,
      clientId: null,
    },
  });

  const { data: listConnections, loading: isLoadingFetchlistConnections } =
    useGraphQlQuery(GET_LIST_CONNECTIONS);

  const connections = useMemo(() => {
    const data = listConnections?.connections?.nodes?.map((item: any) => {
      return {
        connectionId: item._id,
        connectionName: item.source,
        connectionValue: 11543,
        connectionImage:
          item.source === 'META'
            ? Connections.META
            : item.source === 'TIKTOK'
            ? Connections.TIKTOK
            : Connections.GOOGLE,
      };
    });
    return data || [];
  }, [listConnections]);

  const connectionId =
    currentConnection !== undefined
      ? connections?.[currentConnection]?.connectionId
      : null;

  const headerData = useMemo(() => {
    const data: headerCard[] = dataMetricsToDate?.metricsToDate?.metrics
      ?.filter((item: any) => item.connectionId === connectionId)
      ?.map((data: any) => {
        return {
          connectionId: data.connectionId,
          title: data.type,
          value: data.value.toFixed(3),
          percentage: Math.abs(
            percentage(data.value, data.lastPeriodValue)
          ).toFixed(1),
          performance:
            percentage(data.value, data.lastPeriodValue) >= 0
              ? performance.UP
              : performance.DOWN,
          comparisonAmount: data.lastPeriodValue,
        };
      });
    return data;
  }, [connectionId, dataMetricsToDate]);

  const chartData = useMemo(() => {
    const dataGraph = dataMetricsYearly?.metricsYearly?.metricsPerMonth
      .filter((item: any) => item.connectionId === connectionId)
      .map((metric: any) => {
        return {
          year: metric.year,
          month: (metric.month + 1).toString(),
          value: metric.value,
          type: metric.type,
          lastPeriodValue: metric.lastPeriodValue,
          percentage: Math.abs(
            percentage(metric.value, metric.lastPeriodValue)
          ).toFixed(1),
          performanceUp: percentage(metric.value, metric.lastPeriodValue) >= 0,
        };
      });

    const groupData = dataGraph ? groupBy(dataGraph, 'type') : [];

    // const data = Object.entries(groupData).map((item: any) => {
    //   return item[1].reduce((pre: any, cur: any) => {
    //     return pre + cur.value;
    //   }, 0);
    // });

    // console.log(groupData);

    // console.log(data);

    return {
      dataGraph: dataGraph,
      groupData: groupData,
    };
  }, [connectionId, dataMetricsYearly]);

  const options = [
    {
      value: 'MONTH_TO_DATE',
      label: (
        <span style={{ color: '#000000', fontWeight: 500 }}>Month to Date</span>
      ),
    },
    {
      value: 'QUARTER_TO_DATE',
      label: (
        <span style={{ color: '#000000', fontWeight: 500 }}>
          Quarter to Date
        </span>
      ),
    },
    {
      value: 'YEAR_TO_DATE',
      label: (
        <span style={{ color: '#000000', fontWeight: 500 }}>Year to Date</span>
      ),
    },
  ];

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
            <h1 style={{ margin: '0px' }}>{accountInfo.name}</h1>
            <Space>
              <Select
                style={{ width: '160px' }}
                defaultValue={period}
                options={options}
                onChange={(value) => setPriod(value)}
              />
              <Button icon={<Filter />} />
            </Space>
          </div>
        </Col>
        {isLoadingFetchMetricsToDate && <SkeletonCustom value={4} />}

        <ClientDashboardHeader headerData={headerData} />
        <Divider />
        <Col span={24}>
          {isLoadingFetchlistConnections && <SkeletonCustom value={4} />}

          <Slider
            connections={connections}
            active={currentConnection}
            getCurrentActive={(currentSlide: number | undefined) => {
              setCurrentConnection(currentSlide);
            }}
          />
        </Col>
        <Col span={24}>
          <ClientDashboardYTDChartsVisualization
            graphDataMetrics={chartData.dataGraph}
          />
        </Col>
        {Object.entries(chartData.groupData)?.map(
          (item: any, index: number) => (
            <Col span={8} key={index}>
              <ClientDashboardTrafficGraph
                trafficCardData={trafficCardData[0]}
                trafficGraphData={item}
              />
            </Col>
          )
        )}
      </Row>
    </>
  );
};

export default ClientDashboard;
