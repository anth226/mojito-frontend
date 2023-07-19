import { Avatar, Col, Divider, Drawer, DrawerProps, Skeleton } from 'antd';
import ConnectionsDrawerMenu from '../connectionsDrawerMenu/connectionsDrawerMenu';
import { ReactComponent as BarChart2 } from 'assets/Icons/BarChart2.svg';
import { ReactComponent as Star } from 'assets/Icons/Star.svg';
import { useState } from 'react';
import ConnectionMetrics, {
  ConnectionMetricItem,
} from '../connectionMetrics/connectionMetrics';
import ConnectionClients from '../connectionClients/connectionClients';
import { Connection } from 'interfaces/Connection';
import Close from 'assets/Icons/Close';
import { ConnectionType } from 'enums/connections';

enum connectionDetailsMenu {
  METRICS = 'Metrics',
  CLIENTS = 'Clients',
}

interface ConnectionDetailsMenuItem {
  value: connectionDetailsMenu;
  icon: JSX.Element;
}
const connectionDetailsMenuItems: ConnectionDetailsMenuItem[] = [
  { value: connectionDetailsMenu.METRICS, icon: <BarChart2 /> },
  { value: connectionDetailsMenu.CLIENTS, icon: <Star /> },
];

interface ConnectionsDrawerProps extends DrawerProps {
  loading: boolean;
  refetch: Function;
  clients: any;
  connection: Connection | undefined | null;
  clientsConnected: any;
}

const metricsOfSelectedItem: ConnectionMetricItem[] = [
  {
    name: 'Revenue',
    value: 1218,
  },
  {
    name: 'Ad Spend',
    value: 1218,
  },
  {
    name: 'CPM',
    value: 1218,
  },
  {
    name: 'CTR',
    value: 1218,
  },
  {
    name: 'Traffic',
    value: 1218,
  },
];

const ConnectionsDrawer = (props: ConnectionsDrawerProps) => {
  const [selected, setSelected] = useState<connectionDetailsMenu>(
    connectionDetailsMenu.METRICS
  );
  const {
    connection,
    clients,
    clientsConnected,
    loading,
    refetch,
    ...drawerProps
  } = props;

  const filterClient = (connectedList: any, clients: any) => {
    const connectedClient = connectedList?.map((connected: any) => {
      return connected.client;
    });

    const data = clients?.reduce((pre: any, cur: any) => {
      if (connectedClient?.some((client: any) => client?._id === cur?._id)) {
        return [...pre];
      }
      const formatCur = {
        source: connection?.type ? ConnectionType[connection.type] : null,
        client: cur,
      };
      return [...pre, formatCur];
    }, []);
    return data;
  };

  const clientsList = (connection: any, clientsConnected: any): any => {
    switch (connection?.type) {
      case 0:
        return {
          connectedList: clientsConnected.TIKTOK,
          otherList: filterClient(clientsConnected.TIKTOK, clients),
        };
      case 1:
        return {
          connectedList: clientsConnected.META,
          otherList: filterClient(clientsConnected.META, clients),
        };
      case 2:
        return {
          connectedList: clientsConnected.GOOGLE,
          otherList: filterClient(clientsConnected.GOOGLE, clients),
        };
      default:
        return {
          connectedList: [],
          otherList: [],
        };
    }
  };
  const data = clientsList(connection, clientsConnected);

  const onSelect = (item: ConnectionDetailsMenuItem) => {
    setSelected(item.value);
  };

  return (
    <Drawer closable placement='right' width={700} {...drawerProps}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar size={'large'} />
          <h1 style={{ margin: '0', marginLeft: '10px' }}>
            {connection?.name}
          </h1>
        </div>
        <Close style={{ cursor: 'pointer' }} onClick={drawerProps.onClose} />
      </div>
      <p style={{ color: '#9A9AAF' }}>
        Short description, amet minim mollit non deserunt ullamco est sit aliqua
        dolor do amet sint. Velit officia consequat duis enim velit mollit.
      </p>
      <Divider />
      {loading && (
        <Col span={24}>
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          ></Skeleton>
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          ></Skeleton>
        </Col>
      )}
      <ConnectionsDrawerMenu
        items={connectionDetailsMenuItems}
        onSelect={onSelect}
      />
      {selected === connectionDetailsMenu.METRICS && (
        <ConnectionMetrics metrics={metricsOfSelectedItem} />
      )}
      {selected === connectionDetailsMenu.CLIENTS && (
        <ConnectionClients connectionClients={data} refetch={refetch} />
      )}
    </Drawer>
  );
};

export default ConnectionsDrawer;
