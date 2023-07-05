import { createBrowserRouter } from 'react-router-dom';
import Authorization from '../Authorization';
import AgencyLayout from '../layouts/AgencyLayout';
import AuthLayout from '../layouts/AuthLayout';
import ClientLayout from '../layouts/ClientLayout';
import Connections from './agency/Connections/Connections';
import HQ from './agency/HQ/HQ';
import Login from './auth/Login';
import ClientConnections from './client/ClientConnections/ClientConnections';
import Performance from './client/Performance/Performance';
import AgencyOverboarding from './auth/Signup/AgencyOverboarding/AgencyOverboarding';
import AgencyOnBoardingAlerts from './auth/Signup/AgencyOverboarding/Alerts/Alerts';
import AgencyOnBoardingBilling from './auth/Signup/AgencyOverboarding/Billing/Billing';
import Clients from './auth/Signup/AgencyOverboarding/Clients/Clients';
import AgencyOnBoardingConnections from './auth/Signup/AgencyOverboarding/Connections/Connections';
import AgencyOnBoardingUsers from './auth/Signup/AgencyOverboarding/Users/Users';
import BusinessOverboarding from './auth/Signup/BusinessOverboarding/BusinessOverboarding';
import SignUp from './auth/Signup/Signup';
import ErrorPage from './error';
import {
  AgencyNavBarPaths,
  AgencyOnBoardingPaths,
  AuthenticationPaths,
  BusinessOnBoardingPaths,
  ClientNavBarPaths,
} from './paths';
import BusinessOnBoardingConnections from './auth/Signup/BusinessOverboarding/Connections/Connections';
import BusinessOnBoardingUsers from './auth/Signup/BusinessOverboarding/Users/Users';
import BusinessOnBoardingBilling from './auth/Signup/BusinessOverboarding/Billing/Billing';
import ClientSettings from './client/ClientSettings/ClientSettings';
import AgencySettings from './agency/AgencySettings/AgencySettings';
import Metrics from './agency/Metrics/Metrics';
import ClientDashboard from './client/ClientDashboard/ClientDashboard';
import ClientAlerts from './client/ClientAlerts/ClientAlerts';
import AgencyAlerts from './agency/AgencyAlerts/AgencyAlerts';
import { AddClient } from './agency/AddClient/AddClient';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <h1>
            <a href={AuthenticationPaths.LOGINPATH}>
              Sign in the application Here!
            </a>
          </h1>
        ),
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: AuthenticationPaths.LOGINPATH,
        element: <Login />,
      },
      {
        path: AuthenticationPaths.SIGNUP,
        element: <SignUp />,
      },
      {
        path: AuthenticationPaths.AGENCY_OVERBOARDING,
        element: <AgencyOverboarding />,
        children: [
          {
            path: AgencyOnBoardingPaths.CLIENTS,
            element: <Clients />,
          },
          {
            path: AgencyOnBoardingPaths.CONNECTIONS,
            element: <AgencyOnBoardingConnections />,
          },
          {
            path: AgencyOnBoardingPaths.ALERTS,
            element: <AgencyOnBoardingAlerts />,
          },
          {
            path: AgencyOnBoardingPaths.BILLING,
            element: <AgencyOnBoardingBilling />,
          },
          {
            path: AgencyOnBoardingPaths.USERS,
            element: <AgencyOnBoardingUsers />,
          },
          {
            path: `${AuthenticationPaths.AGENCY_OVERBOARDING}/:step`,
            element: <ErrorPage />,
          },
        ],
      },
      {
        path: AuthenticationPaths.BUSINESS_OVERBOARDING,
        element: <BusinessOverboarding />,
        children: [
          {
            path: BusinessOnBoardingPaths.CONNECTIONS,
            element: <BusinessOnBoardingConnections />,
          },
          {
            path: BusinessOnBoardingPaths.BILLING,
            element: <BusinessOnBoardingBilling />,
          },
          {
            path: BusinessOnBoardingPaths.USERS,
            element: <BusinessOnBoardingUsers />,
          },
          {
            path: `${AuthenticationPaths.BUSINESS_OVERBOARDING}/:step`,
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/agency',
    element: <Authorization />,
    children: [
      {
        path: '/agency',
        element: <AgencyLayout />,
        children: [
          {
            path: AgencyNavBarPaths.HQ,
            element: <HQ />,
          },
          {
            path: AgencyNavBarPaths.Metrics,
            element: <Metrics />,
          },
          {
            path: AgencyNavBarPaths.Alerts,
            element: <AgencyAlerts />,
          },
          {
            path: AgencyNavBarPaths.Connections,
            element: <Connections />,
          },
          {
            path: `${AgencyNavBarPaths.Settings}`,
            element: <AgencySettings />,
          },
          {
            path: AgencyNavBarPaths.AddClient,
            element: <AddClient />,
          },
        ],
      },
    ],
  },
  {
    path: '/client',
    element: <Authorization />,
    children: [
      {
        path: '/client',
        element: <ClientLayout />,
        children: [
          {
            path: ClientNavBarPaths.OVERVIEW,
            element: <ClientDashboard />,
          },
          {
            path: ClientNavBarPaths.PERFORMANCE,
            element: <Performance />,
          },
          {
            path: ClientNavBarPaths.Connections,
            element: <ClientConnections />,
          },
          {
            path: ClientNavBarPaths.Alerts,
            element: <ClientAlerts />,
          },
          {
            path: `${ClientNavBarPaths.Settings}`,
            element: <ClientSettings />,
          },
        ],
      },
    ],
  },
]);
