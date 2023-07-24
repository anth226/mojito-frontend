import { Avatar, Card, Space } from 'antd';
import { Connections } from 'assets/base64Icons';
import { Connection } from 'interfaces/Connection';
import { Client } from 'interfaces/Client';

export interface AlertBadgeProps extends Omit<Client, 'connections'> {
  date: string;
  connections: Connection[];
}

const AlertBadge = ({
  name = 'Client Name',
  date = 'Date',
  avatar,
  connections,
}: AlertBadgeProps) => {
  return (
    <Card bodyStyle={{ minWidth: '340px' }}>
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Avatar.Group style={{ position: 'relative' }}>
          <Avatar
            size={60}
            style={{ border: '1px solid #E2E2E2', padding: '4px' }}
            src={
              <img
                src={connections[0].avatar ?? Connections.TIKTOK}
                alt={''}
                style={{ objectFit: 'contain' }}
              />
            }
          />
          <Avatar
            size={40}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '4px',
              position: 'absolute',
              bottom: '-15px',
              right: '-20px',
            }}
            src={connections[1].avatar ?? Connections.GOOGLE_ADS}
          />
        </Avatar.Group>
        <span className='text-small'>Jul 23 | 13:21</span>
      </Space>
      <div>
        <h5
          style={{
            fontSize: '24px',
            lineHeight: '30px',
            color: '#16161E',
            fontWeight: 700,
            margin: 0,
            marginTop: '24px',
          }}
        >
          No Ad Spend
        </h5>
        <p className='text-small' style={{ margin: 0, marginTop: '8px' }}>
          Leslie Alexander | Source name
        </p>
      </div>
    </Card>
  );
};

export default AlertBadge;
