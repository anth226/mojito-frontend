import { Avatar, Button, Divider, Space } from 'antd';
import { CREATE_CONNECTION, DELETE_CONNECTION } from 'api/graphql/mutations';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ReactComponent as PlusIcon } from 'assets/Icons/Plus.svg';
import { Avatars } from 'assets/base64Icons';
import { ConnectionBadgeButton } from 'components/ConnectionButton/ConnectionButton';
import { ConnectionStatus, ConnectionType } from 'enums/connections';
import { useGraphQlMutation } from 'hooks/useCustomHookApollo';
import { Connection } from 'interfaces/Connection';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  getOnboardingFromStore,
  updateConnectionsOfClient,
} from 'reduxSlices/onboarding/onboarding';
import classes from './connectClients.module.css';

interface ConnectClientsProps {
  connection: Connection;
}

const ConnectClients = ({ connection }: ConnectClientsProps) => {
  const { clients } = useAppSelector(getOnboardingFromStore);
  const dispatch = useAppDispatch();

  const [isLoading, setIsloading] = useState<boolean>(false);

  const [createConnection] = useGraphQlMutation(CREATE_CONNECTION, {
    onError(error) {
      toast.error(error.message);
      throw error;
    },
    onCompleted: () => {
      // dispatch(next());
    },
  });

  const [deleteConnection] = useGraphQlMutation(DELETE_CONNECTION, {
    onError(error) {
      toast.error(error.message);
      throw error;
    },
    onCompleted: () => {
      // dispatch(next());
    },
  });

  const addConnection = async (index: number) => {
    setIsloading(true);
    const input = {
      source: ConnectionType[connection.type],
      clientId: clients[index]._id,
    };

    const connectionResponse = await createConnection({
      variables: { input: input },
    });
    const createConnectionData = connectionResponse?.data?.createConnection;

    if (createConnectionData) {
      const payload = {
        action: 'add',
        index,
        connectionKey: connection.key.toString(),
        connectionId: createConnectionData?.connection?._id,
        clientMutationId: createConnectionData?.clientMutationId,
      };
      dispatch(updateConnectionsOfClient(payload));
    }
    setIsloading(false);
  };

  const removeConnection = async (index: number) => {
    const currConnection = clients[index].connections?.find(
      (i) => i.connectionKey === connection.key.toString()
    );

    const input = {
      id: currConnection?.connectionId,
      clientMutationId: currConnection?.clientMutationId,
    };

    const deleteConnectionResponse = await deleteConnection({
      variables: { input: input },
    });

    if (deleteConnectionResponse?.data?.deleteConnection) {
      const payload = {
        action: 'remove',
        index,
        connectionKey: connection.key.toString(),
      };
      dispatch(updateConnectionsOfClient(payload));
    }
  };

  return (
    <Space direction='vertical'>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0px 12px',
          }}
        >
          <Avatar size={'large'} src={connection.cover} />
          <h1 style={{ margin: '0px' }}>{connection.name}</h1>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {clients.map((client, index) => {
          return (
            <React.Fragment key={index}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Space>
                  <Avatar size={'large'} src={Avatars.AVATAR1} />
                  <div className={classes.client_details}>
                    <span className={classes.client_name}>
                      {client.name ?? 'NAME'}
                    </span>
                    <span className={classes.client_email}>
                      {client.email ?? 'email'}
                    </span>
                  </div>
                </Space>
                {client.connections?.some(
                  (i) => i.connectionKey === connection.key.toString()
                ) ? (
                  <ConnectionBadgeButton
                    status={ConnectionStatus.CONNECTED}
                    color={'#0062FF'}
                    borderColor={'#0062FF'}
                    backgroundColor={'#CCE0FE'}
                    onClick={() => removeConnection(index)}
                  />
                ) : (
                  <Button
                    icon={<PlusIcon />}
                    type='text'
                    style={{
                      display: 'flex',
                      paddingLeft: '0px',
                      justifyContent: 'space-around',
                      color: '#0062FF',
                    }}
                    disabled={!!isLoading}
                    onClick={() => addConnection(index)}
                  >
                    <b>Add Connection</b>
                  </Button>
                )}
              </div>
              <Divider style={{ margin: '12px 0px' }} />
            </React.Fragment>
          );
        })}
      </div>
    </Space>
  );
};

export default ConnectClients;
