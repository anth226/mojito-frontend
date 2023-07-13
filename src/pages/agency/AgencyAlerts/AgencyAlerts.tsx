import { Button, Col, Row, Skeleton } from 'antd';
import { CREATE_ALERTS } from 'api/graphql/mutations';
import { GET_LIST_ALERTS, GET_LIST_CONNECTIONS } from 'api/graphql/queries';
import { useGraphQlMutation, useGraphQlQuery } from 'hooks/useCustomHookApollo';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import LightBulb from '../../../assets/Icons/LightBulb';
import PlusIcon from '../../../assets/Icons/Plus';
import { AlertCardAgency } from '../../../components/AlertCard/AlertCard';
import AlertEditPanel from '../../../components/AlertEditPanel/AlertEditPanel';
import AlertModal from '../../../components/AlertModal/AlertModal';
import { AlertStatus } from '../../../enums/alerts';
import { Alert } from '../../../interfaces/Alert';

const AgencyAlerts = () => {
  const [alertsPanel, setAlertsPanel] = useState<true | false>(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [curAlert, setCurAlert] = useState<Alert>();

  const [newAlertModal, setNewAlertModal] = useState(false);

  const {
    data: listAlerts,
    loading: isLoadingFetchListAlerts,
    refetch,
  } = useGraphQlQuery(GET_LIST_ALERTS);

  const [createAlerts] = useGraphQlMutation(CREATE_ALERTS, {
    onError(error) {
      toast.error('Create alerts not success!');
      throw error;
    },
    onCompleted: () => {
      refetch();
    },
  });

  const { data: listConnections, loading: isLoadingFetchListConnections } =
    useGraphQlQuery(GET_LIST_CONNECTIONS);

  const clientsOptions = listConnections?.connections?.nodes?.reduce(
    (pre: any, cur: any) => {
      if (cur?.source) {
        return [...pre, { label: cur?.client?.name, value: cur?._id }];
      }
      return pre;
    },
    []
  );

  const addAlert = async (alert: any) => {
    const alerts: any[] = [];

    if (alert?.clientOption?.length > 0) {
      alert?.clientOption?.forEach((i: any) => {
        alerts.push({
          value: alert.value,
          parameter: alert.parameter,
          operation: alert.mathValue,
          name: alert.alertName,
          connectionId: i,
          severity: alert.severity,
        });
      });
    }
    if (alerts.length > 0) {
      const input = {
        clientMutationId: null,
        alerts: alerts,
      };

      await createAlerts({
        variables: { input: input },
      });
    }
    setNewAlertModal(false);
  };

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
        };
      });

      setAlerts(alerts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listAlerts]);

  const onOpenEditForm = (id: string) => {
    setAlertsPanel(true);
    const newCurAlert = alerts?.find(
      (alert: Alert) => alert.id.toString() === id
    );
    newCurAlert && setCurAlert(newCurAlert);
  };
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
      <Col span={24}>
        <div
          style={{
            display: 'flex',
            columnGap: '12px',
            // justifyContent: "center",
            alignItems: 'center',
          }}
        >
          <LightBulb />
          <h2 style={{ margin: '0px' }}>Configure Alerts</h2>
        </div>
      </Col>
      {alerts?.map((alert) => {
        return (
          <Skeleton
            loading={isLoadingFetchListAlerts || isLoadingFetchListConnections}
            avatar
            paragraph={{
              rows: 1,
            }}
            active
            key={alert.id}
          >
            <Col span={24}>
              <AlertCardAgency
                alert={alert}
                onClick={() => onOpenEditForm(alert.id.toString())}
              />
            </Col>
          </Skeleton>
        );
      })}
      {/* <AlertPanel
        onAlertEyeClick={onAlertClickPanel}
        alerts={alerts}
        open={alertsPanel}
        onClose={() => setAlertsPanel(false)}
        closable={false}
      /> */}
      <AlertEditPanel
        alert={curAlert}
        clientsOptions={clientsOptions}
        open={alertsPanel}
        onClose={() => setAlertsPanel(false)}
        closable={false}
      />
      <AlertModal
        closeModal={() => setNewAlertModal(false)}
        clientsOptions={clientsOptions}
        open={newAlertModal}
        multipleClients={true}
        addAlert={addAlert}
      />
    </Row>
  );
};

export default AgencyAlerts;
