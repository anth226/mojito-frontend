import { Col, Layout, Row, Steps } from "antd";
import { useCallback, useEffect, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { ReactComponent as Logo } from "../assets/Mojito Logo.svg";
import {
  AgencyOnBoardingPaths,
  AuthenticationPaths,
  BusinessOnBoardingPaths,
} from "../pages/paths";
import { AccountType, getAuthFromStore } from "../reduxSlices/auth/auth";
import { getOnboardingFromStore } from "../reduxSlices/onboarding/onboarding";
const { Header, Content } = Layout;

const agencyOverboardingSteps = [
  {
    title: "Signup",
  },
  {
    title: "Clients",
  },
  {
    title: "Connections",
  },
  {
    title: "Alerts",
  },
  {
    title: "Billing",
  },
  {
    title: "Users",
  },
];

const businessOverboardingSteps = [
  {
    title: "Signup",
  },
  {
    title: "Connections",
  },
  {
    title: "Billing",
  },
  {
    title: "Users",
  },
];

const AuthLayout = () => {
  const { step } = useAppSelector(getOnboardingFromStore);
  const { signup } = useAppSelector(getAuthFromStore);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const agencyOnBoardingSteps = useCallback(() => {
    if (signup) {
      switch (step) {
        case 1:
          navigate(AgencyOnBoardingPaths.CLIENTS);
          return;
        case 2:
          navigate(AgencyOnBoardingPaths.CONNECTIONS);
          return;
        case 3:
          navigate(AgencyOnBoardingPaths.ALERTS);
          return;
        case 4:
          navigate(AgencyOnBoardingPaths.BILLING);
          return;
        case 5:
          navigate(AgencyOnBoardingPaths.USERS);
          return;

        default:
          break;
      }
    } else {
      // navigate(AuthenticationPaths.SIGNUP)
    }
  }, [navigate, signup, step]);
  
  const businessOnBoardingSteps = useCallback(() => {
    if (signup) {
      switch (step) {
        case 1:
          navigate(BusinessOnBoardingPaths.CONNECTIONS);
          return;
        case 2:
          navigate(BusinessOnBoardingPaths.BILLING);
          return;
        case 3:
          navigate(BusinessOnBoardingPaths.USERS);
          return;

        default:
          break;
      }
    } else {
      // navigate(AuthenticationPaths.SIGNUP)
    }
  }, [navigate, signup, step]);

  const isAgencyOnBoarding = useMemo(() => {
    if (
      Object.values(AgencyOnBoardingPaths).includes(
        pathname as AgencyOnBoardingPaths
      )
    ) {
      return true;
    }
    return false;
  }, [pathname]);

  const isBusinessOnBoarding = useMemo(() => {
    if (
      Object.values(BusinessOnBoardingPaths).includes(
        pathname as BusinessOnBoardingPaths
      )
    ) {
      return true;
    }
    return false;
  }, [pathname]);

  useEffect(() => {
    if(signup?.account === AccountType.AGENCY) {
      agencyOnBoardingSteps();
    }
    if(signup?.account === AccountType.BUSINESS) {
      businessOnBoardingSteps();
    }
  }, [agencyOnBoardingSteps, businessOnBoardingSteps, signup?.account]);

  return (
    <Layout>
      <Header
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #C6CBD9",
        }}
      >
        <Row align={"middle"} style={{ height: "64px" }}>
          <Col span={6} style={{ height: "inherit" }}>
            <Logo />
          </Col>
          {(isAgencyOnBoarding || isBusinessOnBoarding) && (
            <Col span={12}>
              <Steps
                size="small"
                current={step}
                items={
                  isAgencyOnBoarding
                    ? agencyOverboardingSteps
                    : isBusinessOnBoarding
                    ? businessOverboardingSteps
                    : []
                }
              />
            </Col>
          )}
        </Row>
      </Header>
      <Content
        style={{
          display: "grid",
          justifyContent: "center",
          height: "calc(100vh - 64px)",
          overflow: "auto",
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AuthLayout;
