import { Avatar } from 'antd';
import { ConnectionClient } from 'interfaces/Connection';
import ConnectionButton from 'components/ConnectionButton/ConnectionButton';
import { ConnectionStatus } from 'enums/connections';
import { ConnectionClientItem } from './connectionClientItem';
import classes from './connectionClients.module.css';

const connectedClientlist: ConnectionClient[] = [
  {
    name: 'Marvin McKinney',
    email: 'example@gmail.com',
    status: ConnectionStatus.SYNC_FAILED,
    active: true,
  },
  {
    name: 'Guy Hawkins',
    email: 'example@gmail.com',
    status: ConnectionStatus.CONNECTED,
    active: true,
  },
  {
    name: 'Courtney Henry',
    email: 'example@gmail.com',
    status: ConnectionStatus.CONNECTED,
    active: true,
  },
  {
    name: 'Bessie Cooper',
    email: 'example@gmail.com',
    status: ConnectionStatus.CONNECTED,
    active: true,
  },
  {
    name: 'Theresa Webb',
    email: 'example@gmail.com',
    status: ConnectionStatus.CONNECTED,
    active: true,
  },
];

const otherClientlist: ConnectionClient[] = [
  {
    name: 'Arlene McCoy',
    email: 'example@gmail.com',
    status: ConnectionStatus.SYNC_FAILED,
    active: true,
  },
  {
    name: 'Kathryn Murphy',
    email: 'example@gmail.com',
    status: ConnectionStatus.CONNECTED,
    active: true,
  },
  {
    name: 'Ralph Edwards',
    email: 'example@gmail.com',
    status: ConnectionStatus.CONNECTED,
    active: true,
  },
  {
    name: 'Devon Lane',
    email: 'example@gmail.com',
    status: ConnectionStatus.CONNECTED,
    active: true,
  },
  {
    name: 'Jacob Jones',
    email: 'example@gmail.com',
    status: ConnectionStatus.CONNECTED,
    active: true,
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
      {connectedClientlist.map((client, index) => {
        return <ConnectionClientItem key={index} client={client} />;
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
