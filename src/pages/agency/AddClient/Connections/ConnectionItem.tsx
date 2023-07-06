import { Avatar, Card, Space } from 'antd';
import { Avatars } from 'assets/base64Icons';
import { CustomSelect } from 'components/CustomSelect/CustomSelect';
import CustomSwitch from 'components/CustomSwitch/CustomSwitch';
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
      <Card
        style={{ padding: 0, borderRadius: 8 }}
        className='connection-card-item'
      >
        <Space className={classes.connection_box_item}>
          <div className={classes.flex_box}>
            <Avatar size={'large'} src={Avatars.AVATAR1} />
            <div className={classes.connection_name}>TikTok</div>
          </div>
          <div className={classes.flex_box} style={{ gap: 24 }}>
            <CustomSelect
              options={parameters}
              defaultValue={parameters[0].value}
            />
            <div
              className={
                checked
                  ? classes.switch_background_active
                  : classes.switch_background
              }
            >
              <CustomSwitch checked={checked} onChange={onChange} />
            </div>
          </div>
        </Space>
        {checked && (
          <Space
            className={classes.connection_box_item}
            style={{ padding: '16px' }}
          >
            <div className={classes.clent_name}>Client Name</div>
            <CustomSelect options={accounts} defaultValue={accounts[0].value} />
          </Space>
        )}
      </Card>
    </>
  );
};
