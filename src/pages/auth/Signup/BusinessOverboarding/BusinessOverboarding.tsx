import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row, Space } from 'antd';
import {
  back,
  clearOnBoardingStore,
  getOnboardingFromStore,
  next,
} from 'reduxSlices/onboarding/onboarding';
import { useMemo } from 'react';
import { AuthenticationPaths, BusinessOnBoardingPaths } from 'pages/paths';
import { useBillingFormInstance } from 'components/BillingForm/BillingForm';
import { clearSignup, logout } from 'reduxSlices/auth/auth';
import { removeAccessToken, removeAccountInfo } from 'utils/helpers';

const BusinessOverboarding = () => {
  const { step, nested, nestedPath, nestedSteps } = useAppSelector(
    getOnboardingFromStore
  );
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { FormInstance } = useBillingFormInstance();

  const onContinue = () => {
    if (nested) {
      if (nestedPath === BusinessOnBoardingPaths.BILLING && nestedSteps === 1) {
        FormInstance?.submit();
      } else {
        dispatch(next());
      }
    } else {
      if (step < 3) {
        dispatch(next());
      } else {
        dispatch(logout());
        dispatch(clearSignup());
        dispatch(clearOnBoardingStore());
        removeAccessToken();
        removeAccountInfo();
        navigate(AuthenticationPaths.LOGINPATH);
      }
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
      !Object.values(BusinessOnBoardingPaths).includes(
        pathname as BusinessOnBoardingPaths
      )
    ) {
      return true;
    }
    return false;
  };

  const widthOfCard = useMemo(() => {
    if (pathname === BusinessOnBoardingPaths.CONNECTIONS) {
      return '1300px';
    }
    if (pathname === BusinessOnBoardingPaths.USERS) {
      return '1150px';
    }
    return '590px';
  }, [pathname]);

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
            <Button style={{ width: '100%' }} onClick={onBack}>
              <b>Back</b>
            </Button>
          </Col>
          <Col span={12}>
            <Button
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

export default BusinessOverboarding;
