import { Tabs, TabsProps } from 'antd';
import ClientBillingSettings from './AgencyBillingSettings/AgencyBillingSettings';
import './AgencySettings.css';
import { useNavigate, useParams } from 'react-router-dom';
import { AgencySettingsTabsKeys, AgencySettingsTabsPaths } from '../../paths';
import DetailsSettings from './AgencyDetailsSettings/AgencyDetailsSettings';
import UsersSetting from './AgencyUsersSetting/AgencyUsersSetting';
import AgencyPasswordAndSecurity from './AgencyPasswordAndSecurity/AgencyPasswordAndSecurity';

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
    children: <ClientBillingSettings />,
  },
  {
    key: AgencySettingsTabsKeys.PASSWORD_AND_SECURITY,
    label: `Password and security`,
    children: <AgencyPasswordAndSecurity />,
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
