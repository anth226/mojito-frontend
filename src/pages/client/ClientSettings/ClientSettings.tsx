import { Tabs, TabsProps } from 'antd';
import ClientBillingSettings from './ClientBillingSettings/ClientBillingSettings';
import './ClientSettings.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ClientSettingsTabsKeys, ClientSettingsTabsPaths } from 'pages/paths';
import ClientDetailsSettings from './ClientDetailsSettings/ClientDetailsSettings';
import ClientUsersSetting from './ClientUsersSetting/ClientUsersSetting';
import { ClientPasswordAndSecurity } from './ClientPasswordAndSecurity/ClientPasswordAndSecurity';

const items: TabsProps['items'] = [
  {
    key: ClientSettingsTabsKeys.DETAILS,
    label: `My Details`,
    children: <ClientDetailsSettings />,
  },
  {
    key: ClientSettingsTabsKeys.USERS,
    label: `Users`,
    children: <ClientUsersSetting />,
  },
  {
    key: ClientSettingsTabsKeys.BILLING,
    label: `Billing`,
    children: <ClientBillingSettings />,
  },
  {
    key: ClientSettingsTabsKeys.PASSWORD_AND_SECURITY,
    label: `Password and security`,
    children: <ClientPasswordAndSecurity />,
  },
];

const ClientSettings = () => {
  let { tab } = useParams();
  const navigate = useNavigate();

  const onTabClick = (key: any) => {
    switch (key) {
      case ClientSettingsTabsKeys.DETAILS:
        navigate(ClientSettingsTabsPaths.DETAILS);
        return;
      case ClientSettingsTabsKeys.USERS:
        navigate(ClientSettingsTabsPaths.USERS);
        return;
      case ClientSettingsTabsKeys.BILLING:
        navigate(ClientSettingsTabsPaths.BILLING);
        return;
      case ClientSettingsTabsKeys.PASSWORD_AND_SECURITY:
        navigate(ClientSettingsTabsPaths.PASSWORD_AND_SECURITY);
        return;
    }
  };

  return (
    <>
      <h1>Settings</h1>
      <Tabs
        defaultActiveKey='1'
        activeKey={tab}
        items={items}
        onTabClick={onTabClick}
      />
    </>
  );
};

export default ClientSettings;
