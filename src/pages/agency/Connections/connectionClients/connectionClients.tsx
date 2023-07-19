import { ConnectionClientItem } from './connectionClientItem';

interface ConnectionClientProps {
  connectionClients: any;
  refetch: Function;
}

// Make an API call from this component OR from Connections Parent Module to get all the clients
// sort them according to status with the current connection
// then show the reconnect required ones on the top followed by connected ones.
// lastly a list of Other Clients that will show a connect button.

const ConnectionClients = ({
  connectionClients,
  refetch,
}: ConnectionClientProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>Connected Clients</h2>
      {connectionClients?.connectedList?.map((client: any) => {
        return (
          <ConnectionClientItem
            key={client?._id}
            client={client?.client}
            source={client?.source}
            id={client?._id}
            refetch={refetch}
          />
        );
      })}
      <h2>Other Clients</h2>
      {connectionClients?.otherList?.map((client: any) => {
        return (
          <ConnectionClientItem
            key={client?.client?._id}
            client={client?.client}
            source={client?.source}
            refetch={refetch}
          />
        );
      })}
    </div>
  );
};

export default ConnectionClients;
