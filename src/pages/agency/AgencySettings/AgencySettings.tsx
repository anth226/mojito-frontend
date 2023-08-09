import { Tabs, TabsProps } from 'antd';
import AgencyBillingSettings from './AgencyBillingSettings/AgencyBillingSettings';
import './AgencySettings.css';
import { useNavigate, useParams } from 'react-router-dom';
import { AgencySettingsTabsKeys, AgencySettingsTabsPaths } from 'pages/paths';
import DetailsSettings from './AgencyDetailsSettings/AgencyDetailsSettings';
import UsersSetting from './AgencyUsersSetting/AgencyUsersSetting';
import { AgencyPasswordAndSecurityLayout } from './AgencyPasswordAndSecurity/AgencyPasswordAndSecurityLayout';

const items: TabsProps['items'] = [
  {
    key: AgencySettingsTabsKeys.DETAILS,
    label: `My Details`,
    children: <DetailsSettings />,
  },
  {
    key: AgencySettingsTabsKeys.USERS,
    label: `Users`,
    children: <UsersSetting />,
  },
  {
    key: AgencySettingsTabsKeys.BILLING,
    label: `Billing`,
    children: <AgencyBillingSettings />,
  },
  {
    key: AgencySettingsTabsKeys.PASSWORD_AND_SECURITY,
    label: `Password and security`,
    children: <AgencyPasswordAndSecurityLayout />,
  },
];

const AgencySettings = () => {
  let { tab } = useParams();
  const navigate = useNavigate();

  const onTabClick = (key: any) => {
    switch (key) {
      case AgencySettingsTabsKeys.DETAILS:
        navigate(AgencySettingsTabsPaths.DETAILS);
        return;
      case AgencySettingsTabsKeys.USERS:
        navigate(AgencySettingsTabsPaths.USERS);
        return;
      case AgencySettingsTabsKeys.BILLING:
        navigate(AgencySettingsTabsPaths.BILLING);
        return;
      case AgencySettingsTabsKeys.PASSWORD_AND_SECURITY:
        navigate(AgencySettingsTabsPaths.PASSWORD_AND_SECURITY);
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

export default AgencySettings;
