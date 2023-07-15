import { Button, Skeleton, Space } from 'antd';
import { CREATE_ALERTS } from 'api/graphql/mutations';
import { GET_USER_INFO } from 'api/graphql/queries';
import { useAppSelector } from 'app/hooks';
import AlertModal from 'components/AlertModal/AlertModal';
import { useGraphQlMutation, useGraphQlQuery } from 'hooks/useCustomHookApollo';
import { Client } from 'interfaces/Client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getOnboardingFromStore } from 'reduxSlices/onboarding/onboarding';
import { getAccountInfo } from 'utils/helpers';
import PlusIcon from 'assets/Icons/Plus';
import AlertCard from 'components/AlertCard/AlertCard';
import { Alert } from 'interfaces/Alert';

const AgencyOnBoardingAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { clients } = useAppSelector(getOnboardingFromStore);

  const {
    data: userInfo,
    loading: isLoadingFetchUserInfo,
    refetch,
  } = useGraphQlQuery(GET_USER_INFO, {
    variables: { userId: getAccountInfo()?._id ?? '' },
  });

  const [createAlerts] = useGraphQlMutation(CREATE_ALERTS, {
    onError(error) {
      toast.error(error.message);
      throw error;
    },
    onCompleted: () => {
      refetch();
      setOpenModal(false);
    },
  });

  const clientsOptions = clients?.map((client: Client) => {
    return {
      label: client.name,
      value: client._id,
    };
  });

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

  useEffect(() => {
    if (!isLoadingFetchUserInfo) {
      const alerts = userInfo?.user?.agency?.alerts?.nodes;
      setAlerts(alerts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <>
      <Space direction='vertical' size={12}>
        <div>
          <h1 style={{ margin: '0px' }}>Alerts</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {alerts?.map((alert, index) => {
          return (
            <Skeleton
              loading={isLoadingFetchUserInfo}
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
            onClick={() => setOpenModal(true)}
          >
            <b>Add Alert</b>
          </Button>
        </div>
      </Space>
      <AlertModal
        multipleClients={true}
        clientsOptions={clientsOptions}
        closeModal={() => setOpenModal(false)}
        open={openModal}
        addAlert={addAlert}
      />
    </>
  );
};

export default AgencyOnBoardingAlerts;
