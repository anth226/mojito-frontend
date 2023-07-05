import { Button, Space } from 'antd';
import PlusIcon from 'assets/Icons/Plus';
import { ConnectionItem } from './ConnectionItem';
import classes from './Connections.module.css';

interface ConnectionsProps {
  step: any;
}

export const Connections = (props: ConnectionsProps) => {
  const { step } = props;
  return (
    <>
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
        >
          <b>New integration</b>
        </Button>
      </Space>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ConnectionItem />
        <ConnectionItem />
        <ConnectionItem />
        <ConnectionItem />
      </div>
    </>
  );
};
