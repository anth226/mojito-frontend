import { Button, Col, Row, Skeleton } from 'antd';
import { CREATE_ALERTS, UPDATE_ALERT } from 'api/graphql/mutations';
import { GET_LIST_ALERTS, GET_LIST_CLIENTS } from 'api/graphql/queries';
import { useGraphQlMutation, useGraphQlQuery } from 'hooks/useCustomHookApollo';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import LightBulb from 'assets/Icons/LightBulb';
import PlusIcon from 'assets/Icons/Plus';
import { AlertCardAgency } from 'components/AlertCard/AlertCard';
import AlertEditPanel from 'components/AlertEditPanel/AlertEditPanel';
import AlertModal from 'components/AlertModal/AlertModal';
import { AlertStatus } from 'enums/alerts';
import { Alert } from 'interfaces/Alert';
import { useAppDispatch } from 'app/hooks';
import { setAlertInStore } from 'reduxSlices/alerts/alerts';

interface OptionSelect {
  value: number | string;
  label: string;
}

const AgencyAlerts = () => {
  const dispatch = useAppDispatch();
  const [alertsPanel, setAlertsPanel] = useState<true | false>(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [newAlertModal, setNewAlertModal] = useState<boolean>(false);

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
      setNewAlertModal(false);
      refetch();
    },
  });

  const [updateAlerts] = useGraphQlMutation(UPDATE_ALERT, {
    onError(error) {
      toast.error('Update alerts not success!');
      throw error;
    },
    onCompleted: () => {
      setAlertsPanel(false);
      refetch();
    },
  });

  const { data: listClients, loading: isLoadingFetchlistClients } =
    useGraphQlQuery(GET_LIST_CLIENTS);

  const clientsOptions: OptionSelect[] = useMemo(() => {
    const data = listClients?.clients?.nodes?.reduce(
      (pre: OptionSelect[], cur: any) => {
        return [...pre, { label: cur?.name, value: cur?._id }];
      },
      []
    );
    return data;
  }, [listClients]);

  const addAlert = async (alert: any) => {
    const alerts = {
      value: alert.value,
      parameter: alert.parameter,
      operation: alert.mathValue,
      name: alert.alertName,
      clientIds: alert.clientOption,
      severity: alert.severity,
    };

    const input = {
      clientMutationId: null,
      alerts: alerts,
    };

    await createAlerts({
      variables: { input: input },
    });
  };

  const updateAlert = async (data: any) => {
    const input = {
      value: data.value,
      severity: data.severity,
      parameter: data.parameter,
      operation: data.mathValue,
      name: data.alertName,
      clientMutationId: null,
      clientIds: data.clientOption,
      alertId: data.id,
    };
    await updateAlerts({ variables: { input: input } });
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
          clients: node?.clients?.nodes,
          severity: node?.severity,
        };
      });

      setAlerts(alerts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listAlerts]);

  const onOpenEditForm = (alert: Alert) => {
    dispatch(setAlertInStore(alert));
    setAlertsPanel(true);
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
            alignItems: 'center',
          }}
        >
          <LightBulb />
          <h2 style={{ margin: '0px' }}>Configure Alerts</h2>
        </div>
      </Col>
      {(isLoadingFetchListAlerts || isLoadingFetchlistClients) && (
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
      {alerts.map((alert) => {
        return (
          <Col span={24} key={alert.id}>
            <AlertCardAgency
              alert={alert}
              progressBarValue={clientsOptions.length}
              onClick={() => onOpenEditForm(alert)}
            />
          </Col>
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
        multipleClients={true}
        clientsOptions={clientsOptions}
        open={alertsPanel}
        onClose={() => setAlertsPanel(false)}
        onUpdateAlert={updateAlert}
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
