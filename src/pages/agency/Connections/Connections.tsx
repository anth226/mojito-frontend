import { Col, Input, Row } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { ReactComponent as MagnifyingGlass } from 'assets/Icons/MagnifyingGlass.svg';
import ConnectionCard from 'components/ConnectionCard/ConnectionCard';
import { Connection } from 'interfaces/Connection';
import classes from './Connections.module.css';
import ConnectionsDrawer from './connectionsDrawer/connectionsDrawer';
import { connections } from 'constants/Connections';
import { useGraphQlQuery } from 'hooks/useCustomHookApollo';
import { GET_LIST_CLIENTS, GET_LIST_CONNECTIONS } from 'api/graphql/queries';

const Connections = () => {
  const [showDetails, setShowDetails] = useState<Connection | null>();

  const containerRef = useRef<HTMLDivElement>(null);

  const [otherConnections, setOtherConnections] = useState<Connection[] | []>(
    connections
  );

  const {
    data: listConnections,
    loading: isLoadingFetchlistConnections,
    refetch,
  } = useGraphQlQuery(GET_LIST_CONNECTIONS);

  const { data: listClients, loading: isLoadingFetchlistClients } =
    useGraphQlQuery(GET_LIST_CLIENTS);

  const clients = listClients?.clients?.nodes;

  const groupedClient = useMemo(() => {
    const groupBy = (objectArray: any, property: string) => {
      return objectArray?.reduce((accumulator: any, obj: any) => {
        let key = obj[property];
        if (!accumulator[key]) {
          accumulator[key] = [];
        }
        accumulator[key].push(obj);
        return accumulator;
      }, {});
    };
    return groupBy(listConnections?.connections?.nodes, 'source');
  }, [listConnections]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value;
    if (searchString === '' || searchString === undefined) {
      setOtherConnections(connections);
    } else {
      const filteredList = [];
      for (const connection of connections) {
        if (connection.name.includes(searchString)) {
          filteredList.push(connection);
        }
      }
      setOtherConnections(filteredList);
    }
  };

  return (
    <Row gutter={[16, 16]} justify={'space-evenly'} ref={containerRef}>
      <ConnectionsDrawer
        refetch={refetch}
        loading={isLoadingFetchlistConnections || isLoadingFetchlistClients}
        clientsConnected={groupedClient}
        clients={clients}
        connection={showDetails}
        open={!!showDetails?.name}
        onClose={() => setShowDetails(null)}
        closable={false}
      />
      <Col style={{ width: '100%' }}>
        <Row
          style={{
            marginTop: '12px',
          }}
          align={'middle'}
          justify={'space-between'}
        >
          <Col span={16}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 style={{ margin: '0 10px' }}>Connections</h1>
            </div>
          </Col>
          <Col span={8}>
            <Input
              className={classes.search_box}
              size='large'
              placeholder='Search'
              prefix={<MagnifyingGlass />}
              onChange={onSearchChange}
            />
          </Col>
        </Row>
      </Col>
      {otherConnections.map((connection, index) => {
        return (
          <Col key={index} span={8}>
            <ConnectionCard
              connection={connection}
              onDetailClick={setShowDetails}
              cover
              description
              direction='vertical'
              detailClickIcon
              onConnectButtonClick={() => {}}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default Connections;
