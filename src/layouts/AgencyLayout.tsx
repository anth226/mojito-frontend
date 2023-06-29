import { Avatar, Badge, Button, Divider, Dropdown, Layout, Space } from 'antd';
import {
  Link,
  NavLink,
  Outlet,
  matchPath,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/Mojito Logo.svg';
import { ReactComponent as Connections } from '../assets/navbarIcons/Connections.svg';

import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {
  AgencyNavBarPaths,
  AgencySettingsTabsPaths,
  AuthenticationPaths,
} from '../pages/paths';
import Search from 'antd/es/transfer/search';
import { ReactComponent as Plus } from '../assets/navbarIcons/Plus.svg';
import { ReactComponent as Shirt } from '../assets/navbarIcons/Surplus Strength.svg';
import { ReactComponent as Cutlery } from '../assets/navbarIcons/Griptight Tape.svg';
import { ReactComponent as FilmTape } from '../assets/navbarIcons/Rock Weights.svg';
import { ReactComponent as FirstAid } from '../assets/navbarIcons/Salt Athletic.svg';
import { ReactComponent as Home } from '../assets/navbarIcons/Mokan.svg';
import { ReactComponent as Bell } from '../assets/navbarIcons/Bell.svg';
import { Key, useMemo } from 'react';

import classes from './settingsDropdown.module.css';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../reduxSlices/auth/auth';
import HQIcon from '../assets/navbarIcons/HQIcon';
import MetricsIcon from '../assets/navbarIcons/MetricsIcon';
import AlertIcon from '../assets/navbarIcons/AlertIcon';
import ConnectionsIcon from '../assets/navbarIcons/ConnectionsIcon';
import {
  getAccountInfo,
  removeAccessToken,
  removeAccountInfo,
} from 'utils/helpers';

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getMenuItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label: (
      <NavLink to={`${key}`}>
        {label} {label === 'Alert' && <Badge count={'New'} />}
      </NavLink>
    ),
    type,
  } as MenuItem;
}

function getCategoryItem(
  icon: React.ReactNode,
  categoryName: String,
  key: Key
): React.ReactNode {
  return (
    <Button
      style={{
        width: '100%',
        display: 'flex',
        border: 'none',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '0px',
        boxShadow: 'none',
      }}
      key={key}
    >
      <div
        style={{
          background: '#F2F3F7',
          width: '32px',
          height: '32px',
          borderRadius: '5px',
          display: 'grid',
          placeItems: 'center',
          marginRight: '5px',
        }}
      >
        {icon}
      </div>
      {categoryName}
    </Button>
  );
}

const categories: React.ReactNode[] = [
  getCategoryItem(<Shirt />, 'Surplus Strength', 1),
  getCategoryItem(<Cutlery />, 'Griptight Tape', 2),
  getCategoryItem(<FilmTape />, 'Rock Weights', 3),
  getCategoryItem(<FirstAid />, 'Salt Athletic', 4),
  getCategoryItem(<Home />, 'Mokan', 5),
];

const CustomDropdownRender = (signOut: Function) => {
  const accountInfo = getAccountInfo();
  return (
    <div className={classes.container}>
      <div className={classes.profile_overview}>
        <Avatar>User</Avatar>
        <p>
          <b>{accountInfo?.name}</b>
        </p>
      </div>
      <div className={classes.settings}>
        <p>Settings</p>
        <Link
          className={classes.setting_routes}
          to={AgencySettingsTabsPaths.DETAILS}
        >
          My Details
        </Link>
        <Divider className={classes.setting_routes_divider} />
        <Link
          className={classes.setting_routes}
          to={AgencySettingsTabsPaths.USERS}
        >
          Users
        </Link>
        <Divider className={classes.setting_routes_divider} />
        <Link
          className={classes.setting_routes}
          to={AgencySettingsTabsPaths.BILLING}
        >
          Billing
        </Link>
        <Divider className={classes.setting_routes_divider} />
        <Link
          className={classes.setting_routes}
          to={AgencySettingsTabsPaths.PASSWORD_AND_SECURITY}
        >
          Password and Security
        </Link>
      </div>
      <Divider className={classes.dropdown_divider} />
      <p className={classes.logout} onClick={() => signOut()}>
        Log out
      </p>
    </div>
  );
};

const AgencyLayout: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const signout = () => {
    dispatch(logout());
    removeAccessToken();
    removeAccountInfo();
    navigate(AuthenticationPaths.LOGINPATH);
  };

  const items: MenuProps['items'] = useMemo(() => {
    return [
      getMenuItem(
        'HQ',
        AgencyNavBarPaths.HQ,
        <HQIcon
          fill={
            matchPath(AgencyNavBarPaths.HQ, pathname) ? '#1677ff' : undefined
          }
        />
      ),
      getMenuItem(
        'Metrics',
        AgencyNavBarPaths.Metrics,
        <MetricsIcon
          fill={
            matchPath(AgencyNavBarPaths.Metrics, pathname)
              ? '#1677ff'
              : undefined
          }
        />
      ),
      getMenuItem(
        'Alert',
        AgencyNavBarPaths.Alerts,
        <AlertIcon
          stroke={
            matchPath(AgencyNavBarPaths.Alerts, pathname)
              ? '#1677ff'
              : undefined
          }
        />
      ),
      getMenuItem(
        'Connections',
        AgencyNavBarPaths.Connections,
        <ConnectionsIcon
          stroke={
            matchPath(AgencyNavBarPaths.Connections, pathname)
              ? '#1677ff'
              : undefined
          }
        />
      ),
    ];
  }, [pathname]);

  return (
    <Layout>
      <Header
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #C6CBD9',
          paddingInline: '0px',
          display: 'flex',
          justifyContent: 'space-between',
          paddingRight: '20px',
        }}
      >
        <Logo />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Bell style={{ marginRight: '10px' }} />
          <Dropdown
            arrow={true}
            placement={'bottomRight'}
            dropdownRender={() => CustomDropdownRender(signout)}
          >
            <Avatar
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(AgencySettingsTabsPaths.DETAILS)}
            >
              USER
            </Avatar>
          </Dropdown>
        </div>
      </Header>
      <Layout
        style={{
          height: 'calc(100vh - 64px)',
        }}
      >
        <Sider theme='light' style={{ paddingTop: '31px' }}>
          <Menu items={items} selectedKeys={[pathname]} />
          <Divider />
          <Space direction='vertical' style={{ padding: '0px 10px' }}>
            <Search placeholder='Search' />
            <Button
              icon={<Plus />}
              style={{
                width: '100%',
                display: 'flex',
                background: '#0062FF1A',
                color: '#1677ff',
                border: 'none',
              }}
            >
              <b>Add clients</b>
            </Button>
            {categories}
          </Space>
        </Sider>
        <Content style={{ padding: '31px  20px 0px 21px', overflow: 'auto' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AgencyLayout;
