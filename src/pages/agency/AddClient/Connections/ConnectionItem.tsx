import { Avatar, Card, Space } from 'antd';
import { useAppSelector } from 'app/hooks';
import CustomSwitch from 'components/CustomSwitch/CustomSwitch';
import { Connection } from 'interfaces/Connection';
import { Fragment, useState } from 'react';
import { ClientStore, getClientFromStore } from 'reduxSlices/clients/clients';
import { ClientItem } from './ClientItem';
import './Connections.css';
import classes from './Connections.module.css';

type ConnectionItemProps = {
  connection: Connection;
};

export const ConnectionItem = (props: ConnectionItemProps) => {
  const { connection } = props;
  const { client: clientsInStore } = useAppSelector(getClientFromStore);

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
            <Avatar
              size={'large'}
              className={classes.avatar}
              src={connection.avatar}
            />
            <div className={classes.connection_name}>{connection.name}</div>
          </div>
          <div className={classes.flex_box}>
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
          <Fragment>
            {clientsInStore.map((client: ClientStore, index: number) => (
              <ClientItem client={client} connection={connection} key={index} />
            ))}
          </Fragment>
        )}
      </Card>
    </>
  );
};
