import { Line, LineConfig } from '@ant-design/plots';
import { Card, Col, Row, Statistic } from 'antd';
// import useWindowSize from 'hooks/useWindowSIze';
import ArrowUp from 'assets/Icons/ArrowUp';
import CustomBadge from 'components/CustomBadge/CustomBadge';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { USDcurrency } from 'utils/formatters';
import './ClientDashboardYTDChartsVisualization.css';
import classes from './ClientDashboardYTDChartsVisualization.module.css';
import ArrowDown from 'assets/Icons/ArrowDown';
import {
  performanceBackgroundColors,
  performanceColors,
} from 'constants/Arrows';

const { IconBadge, DotBadge } = CustomBadge;

// const { useBreakpoint } = Grid;

// enum HiDPI {
//   XL1 = 1270,
//   XL2 = 1470,
// }

type Props = {
  graphDataMetrics: any;
};
const ClientDashboardYTDChartsVisualization = ({ graphDataMetrics }: Props) => {
  // const screens = useBreakpoint();
  // const size = useWindowSize();

  // const COLOR_PLATE_10 = [
  //   '#5B8FF9',
  //   '#5AD8A6',
  //   '#5D7092',
  //   '#F6BD16',
  //   '#E8684A',
  //   '#6DC8EC',
  //   '#9270CA',
  //   '#FF9D4D',
  //   '#269A99',
  //   '#FF99C3',
  // ];

  const config: LineConfig = useMemo(() => {
    return {
      data: graphDataMetrics || [],
      xField: 'month',
      yField: 'value',
      seriesField: 'type',
      xAxis: {
        type: 'time',
        label: {
          formatter(text, item, index) {
            return dayjs(text).format('MMM');
          },
        },
      },
      yAxis: {
        label: {
          formatter: (v: any) =>
            `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      legend: false,
      tooltip: {
        customContent(title, data) {
          return (
            <div className={classes.custom_tooltip_container}>
              <div className={classes.custom_tooltip_header}>
                <span className={classes.custom_tooltip_header_title}>
                  {dayjs(title).format('MMM')}
                </span>
                <span className={classes.custom_tooltip_header_subtitle}>
                  {graphDataMetrics?.[0].year}
                </span>
              </div>
              {data.map((entry: any, index: number) => {
                return (
                  <div className={classes.custom_tooltip_entry} key={index}>
                    <span className={classes.custom_tooltip_entry_name}>
                      {entry.name}
                    </span>
                    <span>
                      <span className={classes.custom_tooltip_entry_value}>
                        {USDcurrency.format(entry.value)}
                      </span>
                      <IconBadge
                        text={<span>{entry.data.percentage}%</span>}
                        icon={
                          entry.data.performanceUp ? <ArrowUp /> : <ArrowDown />
                        }
                        color={
                          performanceColors[
                            entry.data.performanceUp ? 'UP' : 'DOWN'
                          ]
                        }
                        backgroundColor={
                          performanceBackgroundColors[
                            entry.data.performanceUp ? 'UP' : 'DOWN'
                          ]
                        }
                      />
                    </span>
                  </div>
                );
              })}
            </div>
          );
        },
      },
    };
  }, [graphDataMetrics]);

  return (
    <Card bordered={false}>
      <Row>
        <Col
          // xs={24}
          // sm={24}
          // md={24}
          // lg={24}
          // xl={size.width < HiDPI.XL1 ? 24 : size.width < 1470 ? 14 : 16}
          // xxl={size.width < 1840 ? 16 : 18}
          span={18}
        >
          <Line className='custom_tooltip_chart' {...config} />
        </Col>
        <Col
          // style={{
          //   display: "flex",
          //   flexDirection:
          //     !screens.xl || (screens.xl && size.width < HiDPI.XL1)
          //       ? "row"
          //       : "column",
          //   justifyContent: "space-evenly",
          //   width:
          //     !screens.xl || (screens.xl && size.width < HiDPI.XL1)
          //       ? "100%"
          //       : "auto",
          //   flexWrap: "wrap",
          // }}
          span={6}
        >
          <Row gutter={[0, 80]}>
            <Col span={24}>
              <Card style={{ width: '100%' }}>
                <Row align='bottom' justify={'space-between'}>
                  <Col>
                    <Statistic
                      prefix={'$'}
                      title='Revenue'
                      value={1218}
                      valueStyle={{ fontSize: '30px', fontWeight: '700' }}
                    />
                  </Col>
                  <Col>
                    <IconBadge icon={<ArrowUp />} />
                  </Col>
                  <Col>
                    <DotBadge color='#0062FF' />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <Card style={{ width: '100%' }}>
                <Row align='bottom' justify={'space-between'}>
                  <Col span={12}>
                    <Statistic
                      prefix={'$'}
                      title='Ad Spend'
                      value={1218}
                      valueStyle={{ fontSize: '30px', fontWeight: '700' }}
                    />
                  </Col>
                  <Col>
                    <IconBadge icon={<ArrowUp />} />
                  </Col>
                  <Col>
                    <DotBadge color='#FF8743' />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default ClientDashboardYTDChartsVisualization;
