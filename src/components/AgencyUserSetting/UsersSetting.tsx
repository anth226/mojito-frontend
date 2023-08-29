import { Button, Card, Col, Row, Space } from 'antd';
import PlusIcon from 'assets/Icons/Plus';
import { useState } from 'react';
import classes from './UserSetting.module.css';

import SettingIcon from 'assets/Icons/SettingIcon';
import { ReactComponent as Star } from 'assets/Icons/Star.svg';
import { ReactComponent as User } from 'assets/Icons/user.svg';
import ConnectionsDrawerMenu from 'pages/agency/Connections/connectionsDrawerMenu/connectionsDrawerMenu';
import ClientSetting from './ClientSetting';
import StaffMemberSetting from './StaffMemberSetting';
import UserRoleDrawer from './UserRoleDrawer/UserRoleDrawer';

enum connectionDetailsMenu {
  STAFF_MEMBER = 'Staff members',
  CLIENTS = 'Clients',
}

interface ConnectionDetailsMenuItem {
  value: connectionDetailsMenu;
  icon: JSX.Element;
}
const connectionDetailsMenuItems: ConnectionDetailsMenuItem[] = [
  { value: connectionDetailsMenu.STAFF_MEMBER, icon: <User /> },
  { value: connectionDetailsMenu.CLIENTS, icon: <Star /> },
];

const UserSetting = () => {
  const [modal, setModal] = useState<true | false>(false);
  const [openUserRoleDrawer, setOpenUserRoleDrawer] = useState<boolean>(false);

  console.log(modal);

  const [selected, setSelected] = useState<connectionDetailsMenu>(
    connectionDetailsMenu.STAFF_MEMBER
  );

  const onSelect = (item: ConnectionDetailsMenuItem) => {
    setSelected(item.value);
  };

  const openModal = () => {
    setModal(true);
  };

  // const closeModal = () => {
  //   setModal(false);
  // };

  return (
    <Card>
      <UserRoleDrawer
        // refetch={refetch}
        // loading={isLoadingFetchlistConnections || isLoadingFetchlistClients}
        // clientsConnected={groupedClient}
        // clients={clients}
        // connection={showDetails}
        open={openUserRoleDrawer}
        onClose={() => setOpenUserRoleDrawer(false)}
        closable={false}
      />
      <Row
        justify={'space-between'}
        align={'middle'}
        className={classes.actions}
      >
        <Col>
          <ConnectionsDrawerMenu
            items={connectionDetailsMenuItems}
            onSelect={onSelect}
          />
        </Col>
        <Col>
          <Space>
            <Button
              icon={
                <SettingIcon
                  fill='#FFFFFF'
                  stroke='#FFFFFF'
                  style={{ marginTop: '2px' }}
                />
              }
              type='text'
              size='large'
              style={{
                display: 'flex',
                paddingLeft: '0px',
                justifyContent: 'space-around',
                width: '150px',
                margin: '10px 5px',
              }}
              onClick={() => setOpenUserRoleDrawer(true)}
            >
              <b>User Roles</b>
            </Button>
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
                width: 'auto',
                margin: '10px 5px',
                padding: '14px 24px',
                alignItems: 'center',
              }}
              onClick={() => openModal()}
            >
              <b>
                {selected === connectionDetailsMenu.CLIENTS
                  ? 'Invite User'
                  : 'New staff member'}
              </b>
            </Button>
          </Space>
        </Col>
      </Row>
      {selected === connectionDetailsMenu.CLIENTS && <ClientSetting />}
      {selected === connectionDetailsMenu.STAFF_MEMBER && (
        <StaffMemberSetting />
      )}
    </Card>
  );
};

export default UserSetting;
