import { Button, Card, Col, Row, Space } from 'antd';
import { INVITE_CLIENTS } from 'api/graphql/mutations';
import { useGraphQlMutation } from 'hooks/useCustomHookApollo';
import { Client } from 'interfaces/Client';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeAccessToken, removeAccountInfo } from 'utils/helpers';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useBillingFormInstance } from 'components/BillingForm/BillingForm';
import { clearSignup, logout } from 'reduxSlices/auth/auth';
import {
  back,
  clearOnBoardingStore,
  getOnboardingFromStore,
  next,
  setClientsInStore,
} from 'reduxSlices/onboarding/onboarding';
import { AgencyOnBoardingPaths, AuthenticationPaths } from 'pages/paths';

const AgencyOverboarding = () => {
  const {step, nested, nestedSteps, nestedPath, clients } = useAppSelector(
    getOnboardingFromStore
  );
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { FormInstance } = useBillingFormInstance();

  const [inviteClients] = useGraphQlMutation(INVITE_CLIENTS, {
    onError(error) {
      toast.error(error.message);
      throw error;
    },
    onCompleted: () => {
      dispatch(next());
    },
  });

  const onContinue = async () => {
    if (nested) {
      if (nestedPath === AgencyOnBoardingPaths.BILLING && nestedSteps === 1) {
        FormInstance?.submit();
      } else {
        dispatch(next());
      }
    }
    if (step === 1) {
      const clientInvited = clients.reduce((pre: Client[], cur: Client) => {
        if (cur?._id) {
          return [...pre, cur];
        }
        return [...pre];
      }, []);
      const newClients = clients.reduce((pre: Client[], cur: Client) => {
        if ((cur.name || cur.email) && !cur?._id) {
          return [...pre, cur];
        }
        return [...pre];
      }, []);

      if (newClients.length > 0) {
        const data = newClients?.map((client: Client) => {
          return { name: client.name, email: client.email };
        });

        const dataClients = await inviteClients({
          variables: { input: { clients: data } },
        });
        const listClient = dataClients?.data?.inviteClients?.clients;
        const clientMutationId =
          dataClients?.data?.inviteClients?.clientMutationId;
        const newListClient = newClients?.map((client: Client) => {
          const index = listClient?.findIndex(
            (i: Client) => i.email === client.email
          );
          if (index !== undefined && index !== -1) {
            return {
              ...client,
              _id: listClient[index]._id,
              clientMutationId: clientMutationId,
            };
          }
          return client;
        });

        if (listClient.length > 0) {
          dispatch(setClientsInStore([...clientInvited, ...newListClient]));
        }
      } else {
        dispatch(next());
      }
    }

    if (step === 3) {
      dispatch(next());
    }

    if (step >= 5) {
      dispatch(logout());
      dispatch(clearSignup());
      dispatch(clearOnBoardingStore());
      removeAccessToken();
      removeAccountInfo();
      navigate(AuthenticationPaths.LOGINPATH);
    }
  };

  const onBack = () => {
    if (nested) {
      dispatch(back());
    } else {
      if (step > 1) {
        dispatch(back());
      } else {
        dispatch(clearSignup());
        navigate(AuthenticationPaths.LOGINPATH);
      }
    }
  };

  const errorPage = () => {
    if (
      !Object.values(AgencyOnBoardingPaths).includes(
        pathname as AgencyOnBoardingPaths
      )
    ) {
      return true;
    }
    return false;
  };

  const widthOfCard = useMemo(() => {
    if (
      (nestedSteps === 0 && pathname === AgencyOnBoardingPaths.CONNECTIONS) ||
      pathname === AgencyOnBoardingPaths.ALERTS
    ) {
      return '1300px';
    }
    if (pathname === AgencyOnBoardingPaths.USERS) {
      return '1150px';
    }
    return '590px';
  }, [nestedSteps, pathname]);

  if (errorPage()) {
    return <Outlet />;
  }
  return (
    <Card
      style={{
        maxWidth: widthOfCard,
        height: 'fit-content',
        marginTop: '80px',
      }}
    >
      <Space direction='vertical' size='middle' style={{ textAlign: 'center' }}>
        <Outlet />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Button disabled={false} style={{ width: '100%' }} onClick={onBack}>
              <b>Back</b>
            </Button>
          </Col>
          <Col span={12}>
            <Button
              disabled={false}
              type='primary'
              style={{ width: '100%' }}
              onClick={onContinue}
            >
              <b>Continue</b>
            </Button>
          </Col>
        </Row>
      </Space>
    </Card>

  );
};

export default AgencyOverboarding;
