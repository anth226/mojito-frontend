import { Button, Col, Empty, Row, Skeleton } from 'antd';
import { GET_LIST_ALERTS } from 'api/graphql/queries';
import PlusIcon from 'assets/Icons/Plus';
import AlertCard from 'components/AlertCard/AlertCard';
import AlertModal from 'components/AlertModal/AlertModal';
import AlertPanel from 'components/AlertPanel/AlertPanel';
import { AlertStatus } from 'enums/alerts';
import { useGraphQlQuery } from 'hooks/useCustomHookApollo';
import { Alert } from 'interfaces/Alert';
import { useEffect, useState } from 'react';

// interface OptionSelect {
//   value: number | string;
//   label: string;
// }

const ClientAlerts = () => {
  const [alertsPanel, setAlertsPanel] = useState<true | false>(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [newAlertModal, setNewAlertModal] = useState(false);

  const {
    data: listAlerts,
    loading: isLoadingFetchListAlerts,
    // refetch,
  } = useGraphQlQuery(GET_LIST_ALERTS);

  // const [createAlerts] = useGraphQlMutation(CREATE_ALERTS, {
  //   onError(error) {
  //     toast.error('Create alerts not success!');
  //     throw error;
  //   },
  //   onCompleted: () => {
  //     setNewAlertModal(false);
  //     refetch();
  //   },
  // });

  // const { data: listClients } = useGraphQlQuery(GET_LIST_CLIENTS);
  // const { data: listClients, loading: isLoadingFetchlistClients } =
  //   useGraphQlQuery(GET_LIST_CLIENTS);
  // console.log(listClients);

  // const clientsOptions: OptionSelect[] = useMemo(() => {
  //   const data = listClients?.clients?.nodes?.reduce(
  //     (pre: OptionSelect[], cur: any) => {
  //       return [...pre, { label: cur?.name, value: cur?._id }];
  //     },
  //     []
  //   );
  //   return data;
  // }, [listClients]);

  const onAlertClickPanel = (clickedAlert: Alert) => {
    const temp: Alert[] = [];
    for (const alert of alerts) {
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

  useEffect(() => {
    if (!isLoadingFetchListAlerts) {
      const alerts = listAlerts?.alerts?.nodes?.map((node: any) => {
        return {
          name: node.name,
          value: node.value,
          id: node._id,
          source: node?.connection?.source,
          connectionId: node?.connection?._id,
          parameter: node?.parameter,
          operation: node?.operation,
          fires: node?.fires,
          clients: node?.clients?.nodes,
          severity: node?.severity,
        };
      });

      setAlerts(alerts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listAlerts]);
  return (
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
          <h1 style={{ margin: '0px' }}>Alerts</h1>

          <Button
            icon={<PlusIcon fill='#FFFFFF' />}
            type='primary'
            style={{
              width: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
            size='large'
            onClick={() => setNewAlertModal(true)}
          >
            <b>New alert</b>
          </Button>
        </div>
      </Col>
      {isLoadingFetchListAlerts && (
        <Col span={24}>
          <Skeleton
            avatar
            paragraph={{
              rows: 2,
            }}
            active
          ></Skeleton>
          <Skeleton
            avatar
            paragraph={{
              rows: 2,
            }}
            active
          ></Skeleton>
        </Col>
      )}
      {!isLoadingFetchListAlerts && alerts.length === 0 && (
        <div style={{ width: '100%' }}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
      {alerts.map((alert, index) => {
        return (
          <Col span={24}>
            <AlertCard
              alert={alert}
              key={index}
              onClick={() => setAlertsPanel(true)}
            />
          </Col>
        );
      })}
      <AlertPanel
        onAlertEyeClick={onAlertClickPanel}
        alerts={alerts}
        open={alertsPanel}
        onClose={() => setAlertsPanel(false)}
        closable={false}
      />
      <AlertModal
        closeModal={() => setNewAlertModal(false)}
        open={newAlertModal}
      />
    </Row>
  );
};

export default ClientAlerts;
