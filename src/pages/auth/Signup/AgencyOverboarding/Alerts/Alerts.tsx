import { Button, Skeleton, Space } from 'antd';
import PlusIcon from '../../../../../assets/Icons/Plus';
import { useEffect, useState } from 'react';
import AlertCard from '../../../../../components/AlertCard/AlertCard';
import { mockAlerts } from '../../../../../mockdata/Alerts';
import { getAlertObject } from '../../../../../interfaces/Alert';
import { useGraphQlQuery } from 'hooks/useCustomHookApollo';
import { GET_ALERTS } from 'api/graphql/queries';

const AgencyOnBoardingAlerts = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: alertsData, loading: isLoadingFetchAlertsData } =
    useGraphQlQuery(GET_ALERTS, {
      variables: {},
    });

  const addAlert = () => {
    const temp = [...alerts];
    temp.push(getAlertObject());
    setAlerts(temp);
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <Space direction='vertical' size={12}>
      <div>
        <h1 style={{ margin: '0px' }}>Alerts</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {alerts.map((alert, index) => {
        return (
          <Skeleton
            loading={loading}
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          >
            <AlertCard alert={alert} key={index} />
          </Skeleton>
        );
      })}
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <Button
          icon={
            <PlusIcon
              fill='#FFFFFF'
              stroke='#FFFFFF'
              style={{ marginTop: '2px' }}
            />
          }
          type='primary'
          size='large'
          style={{
            display: 'flex',
            paddingLeft: '0px',
            justifyContent: 'space-around',
            width: '150px',
            margin: '10px 5px',
          }}
          onClick={() => addAlert()}
        >
          <b>Add Alert</b>
        </Button>
      </div>
    </Space>
  );
};

export default AgencyOnBoardingAlerts;
