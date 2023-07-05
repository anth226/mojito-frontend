import { Avatar, Card, Select, Space, Switch } from 'antd';
import { Avatars } from 'assets/base64Icons';
import { useState } from 'react';
import './Connections.css';
import classes from './Connections.module.css';

type ConnectionItemProps = {};

const parameters = [
  {
    value: 'managementAccount',
    label: 'Manager Account',
  },
];

const accounts = [{ label: 'account', value: 'account' }];
export const ConnectionItem = (props: ConnectionItemProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  const onChange = (checked: boolean) => {
    setChecked(checked);
  };
  return (
    <>
      <Card style={{ padding: 0, borderRadius: 8 }}>
        <Space className={classes.connection_box_item}>
          <div className={classes.flex_box}>
            <Avatar size={'large'} src={Avatars.AVATAR1} />
            <div className={classes.connection_name}>TikTok</div>
          </div>
          <div className={classes.flex_box}>
            <Select
              options={parameters}
              bordered={false}
              style={{ width: '100%', marginRight: '24px' }}
              defaultValue={parameters[0]}
            />
            <Switch checked={checked} onChange={onChange} />
          </div>
        </Space>
        {checked && (
          <Space
            className={classes.connection_box_item}
            style={{ padding: '16px' }}
          >
            <div className={classes.clent_name}>abc</div>
            <Select
              options={accounts}
              bordered={false}
              style={{ width: '100%' }}
              defaultValue={accounts[0]}
            />
          </Space>
        )}
      </Card>
    </>
  );
};
