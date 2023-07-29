import { Button, Space } from 'antd';
import PlusIcon from 'assets/Icons/Plus';
import { useState } from 'react';
import IntegrationDrawer from '../IntegrationDrawer/IntegrationDrawer';
import { ConnectionItem } from './ConnectionItem';
import classes from './Connections.module.css';
import { connections } from 'constants/Connections';
import { Connection } from 'interfaces/Connection';

interface ConnectionsProps {
  step: any;
}

export const Connections = (props: ConnectionsProps) => {
  const [openDraw, setOpenDraw] = useState<boolean>(false);
  const { step } = props;
  return (
    <>
      <IntegrationDrawer
        open={openDraw}
        onClose={() => setOpenDraw(false)}
        closable={false}
      />
      <Space className={classes.connections_header}>
        <h1 className={classes.title}>{step.title}</h1>
        <Button
          icon={<PlusIcon />}
          type='text'
          style={{
            display: 'flex',
            padding: '0px',
            alignItems: 'center',
            justifyContent: 'space-around',
            color: '#0062FF',
          }}
          onClick={() => setOpenDraw(true)}
        >
          <b>New integration</b>
        </Button>
      </Space>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {connections.map((connection: Connection) => (
          <ConnectionItem connection={connection} />
        ))}
      </div>
    </>
  );
};
