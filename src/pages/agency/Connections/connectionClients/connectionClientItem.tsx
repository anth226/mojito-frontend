import { Avatar } from 'antd';
import CustomSwitch from 'components/CustomSwitch/CustomSwitch';
import { ConnectionClient } from 'interfaces/Connection';
import { useState } from 'react';
import classes from './connectionClients.module.css';

type ConnectionClientProps = {
  client: ConnectionClient;
};

export const ConnectionClientItem = (props: ConnectionClientProps) => {
  const { client } = props;
  const [checked, setChecked] = useState<boolean>(client.active);
  const onChange = (checked: boolean) => {
    setChecked(checked);
  };
  return (
    <div className={classes.client}>
      <div style={{ display: 'flex' }}>
        <Avatar size={'large'} src={client.avatar} />
        <div className={classes.client_details}>
          <span className={classes.client_name}>{client.name ?? 'NAME'}</span>
          <span className={classes.client_email}>{client.email}</span>
        </div>
      </div>
      {/* <ConnectionBadgeButton status={client.status} /> */}
      <CustomSwitch checked={checked} onChange={onChange} />
    </div>
  );
};
