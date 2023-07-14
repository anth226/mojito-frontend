import { Avatar } from 'antd';
import ConnectionButton, {
  ConnectionBadgeButton,
} from 'components/ConnectionButton/ConnectionButton';
import { ConnectionStatus } from 'enums/connections';
import classes from './connectionClients.module.css';

export interface ConnectionClient {
  name: string;
  email: string;
  avatar?: string;
  status: ConnectionStatus;
}

const connectedClientlist: ConnectionClient[] = [
  {
    name: 'Marvin McKinney',
    email: 'example@gmail.com',
    status: ConnectionStatus.SYNC_FAILED,
  },
  {
    name: 'Guy Hawkins',
    email: 'example@gmail.com',
    status: ConnectionStatus.CONNECTED,
  },
  {
    name: 'Courtney Henry',
    email: 'example@gmail.com',
    status: ConnectionStatus.CONNECTED,
  },
  {
    name: 'Bessie Cooper',
    email: 'example@gmail.com',
    status: ConnectionStatus.CONNECTED,
  },
  {
    name: 'Theresa Webb',
    email: 'example@gmail.com',
    status: ConnectionStatus.CONNECTED,
  },
];

const otherClientlist: ConnectionClient[] = [
  {
    name: 'Arlene McCoy',
    email: 'example@gmail.com',
    status: ConnectionStatus.SYNC_FAILED,
  },
  {
    name: 'Kathryn Murphy',
    email: 'example@gmail.com',
    status: ConnectionStatus.CONNECTED,
  },
  {
    name: 'Ralph Edwards',
    email: 'example@gmail.com',
    status: ConnectionStatus.CONNECTED,
  },
  {
    name: 'Devon Lane',
    email: 'example@gmail.com',
    status: ConnectionStatus.CONNECTED,
  },
  {
    name: 'Jacob Jones',
    email: 'example@gmail.com',
    status: ConnectionStatus.CONNECTED,
  },
];

// Make an API call from this component OR from Connections Parent Module to get all the clients
// sort them according to status with the current connection
// then show the reconnect required ones on the top followed by connected ones.
// lastly a list of Other Clients that will show a connect button.

const ConnectionClients = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>Connected Clients</h2>
      {connectedClientlist.map((client) => {
        return (
          <div className={classes.client}>
            <div style={{ display: 'flex' }}>
              <Avatar size={'large'} src={client.avatar} />
              <div className={classes.client_details}>
                <span className={classes.client_name}>
                  {client.name ?? 'NAME'}
                </span>
                <span className={classes.client_email}>{client.email}</span>
              </div>
            </div>
            <ConnectionBadgeButton status={client.status} />
          </div>
        );
      })}
      <h2>Other Clients</h2>
      {otherClientlist.map((client) => {
        return (
          <div className={classes.client}>
            <div style={{ display: 'flex' }}>
              <Avatar size={'large'} src={client.avatar} />
              <div className={classes.client_details}>
                <span className={classes.client_name}>
                  {client.name ?? 'NAME'}
                </span>
                <span className={classes.client_email}>{client.email}</span>
              </div>
            </div>
            <ConnectionButton />
          </div>
        );
      })}
    </div>
  );
};

export default ConnectionClients;
