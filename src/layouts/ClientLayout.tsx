import { Avatar, Badge, Divider, Dropdown, Layout, Menu } from 'antd';
import { MenuProps as RCMenuProps } from 'rc-menu';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/MojitoLogo.svg';
import {
  AuthenticationPaths,
  ClientNavBarPaths,
  ClientSettingsTabsPaths,
} from 'pages/paths';
import { ReactComponent as Bell } from 'assets/navbarIcons/Bell.svg';
import classes from './settingsDropdown.module.css';
import { useAppDispatch } from 'app/hooks';
import { logout } from 'reduxSlices/auth/auth';

const { Header, Content } = Layout;

type MenuItem = Required<RCMenuProps>['items'][number];

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
        {label}
        {label === 'Alert' && <Badge dot />}
      </NavLink>
    ),
    type,
  } as MenuItem;
}

const topBarMenuItems: RCMenuProps['items'] = [
  getMenuItem('Overview', ClientNavBarPaths.OVERVIEW),
  getMenuItem('Performance', ClientNavBarPaths.PERFORMANCE),
  getMenuItem('Connections', ClientNavBarPaths.Connections),
  getMenuItem('Alert', ClientNavBarPaths.Alerts),
];

const CustomDropdownRender = (signOut: Function) => {
  return (
    <div className={classes.container}>
      <div className={classes.profile_overview}>
        <Avatar>User</Avatar>
        <p>
          <b>Kristin Watson</b>
        </p>
      </div>
      <div className={classes.settings}>
        <p>Settings</p>
        <Link
          className={classes.setting_routes}
          to={ClientSettingsTabsPaths.DETAILS}
        >
          My Details
        </Link>
        <Divider className={classes.setting_routes_divider} />
        <Link
          className={classes.setting_routes}
          to={ClientSettingsTabsPaths.USERS}
        >
          Users
        </Link>
        <Divider className={classes.setting_routes_divider} />
        <Link
          className={classes.setting_routes}
          to={ClientSettingsTabsPaths.BILLING}
        >
          Billing
        </Link>
        <Divider className={classes.setting_routes_divider} />
        <Link
          className={classes.setting_routes}
          to={ClientSettingsTabsPaths.PASSWORD_AND_SECURITY}
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

const ClientLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signout = () => {
    dispatch(logout());
    navigate(AuthenticationPaths.LOGINPATH);
  };

  return (
    <Layout>
      <Header
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #C6CBD9',
          display: 'flex',
          justifyContent: 'space-between',
          paddingRight: '200px',
        }}
      >
        <Logo />
        <Menu
          items={topBarMenuItems}
          mode='horizontal'
          style={{ width: '400px' }}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* <Gear
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() => navigate(ClientNavBarPaths.Settings)}
          /> */}
          <Bell style={{ marginRight: '10px' }} />
          <Dropdown
            arrow={true}
            placement={'bottomRight'}
            dropdownRender={() => CustomDropdownRender(signout)}
          >
            <Avatar
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(ClientSettingsTabsPaths.DETAILS)}
            >
              USER
            </Avatar>
          </Dropdown>
        </div>
      </Header>
      <Content
        style={{
          // display: "grid",
          // justifyContent: "center",
          height: 'calc(100vh - 64px)',
          padding: '24px 150px',
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default ClientLayout;
