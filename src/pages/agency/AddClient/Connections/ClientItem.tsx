import { Space } from 'antd';
import { CustomSelect } from 'components/CustomSelect/CustomSelect';
import classes from './Connections.module.css';
import './Connections.css';
import { ClientStore, updateClientInStore } from 'reduxSlices/clients/clients';
import CustomSwitch from 'components/CustomSwitch/CustomSwitch';
import { Connection } from 'interfaces/Connection';
import { ConnectionType } from 'enums/connections';
import { useAppDispatch } from 'app/hooks';
import { CREATE_CONNECTION, DELETE_CONNECTION } from 'api/graphql/mutations';
import { toast } from 'react-toastify';
import { useGraphQlMutation } from 'hooks/useCustomHookApollo';

type ClientProps = {
  client: ClientStore;
  connection: Connection;
};

const accounts = [{ label: 'account', value: 'account' }];

export const ClientItem = (props: ClientProps) => {
  const { client, connection } = props;
  const dispatch = useAppDispatch();

  const [createConnection, { loading: isCreateConnectionLoading }] =
    useGraphQlMutation(CREATE_CONNECTION, {
      onError(error) {
        toast.error(error.message);
        throw error;
      },
      onCompleted: (data: any) => {
        dispatch(
          updateClientInStore({
            _id: client._id,
            source: {
              source: ConnectionType[connection.type],
              connectionId: data?.createConnection?.connection?._id,
            },
          })
        );
        const href = data?.createConnection?.connection?.authUrl;
        href && window.open(href, '_blank');
      },
    });

  const [deleteConnection, { loading: isDeleteConnectionLoading }] =
    useGraphQlMutation(DELETE_CONNECTION, {
      onError(error) {
        toast.error(error.message);
        throw error;
      },
      onCompleted: () => {
        dispatch(
          updateClientInStore({
            _id: client._id,
            source: {
              source: ConnectionType[connection.type],
              connectionId: '',
            },
          })
        );
      },
    });

  const onChange = () => {
    const curIndex = client.source?.findIndex(
      (source) => source.source === ConnectionType[connection.type]
    );
    if (curIndex !== undefined && curIndex !== -1) {
      const input = {
        id: client.source[curIndex].connectionId,
        clientMutationId: null,
      };

      deleteConnection({ variables: { input: input } });
    } else {
      const input = {
        source: ConnectionType[connection.type],
        clientId: client._id,
      };
      createConnection({ variables: { input: input } });
    }
  };
  return (
    <Space className={classes.connection_box_item} style={{ padding: '16px' }}>
      <div className={classes.clent_name}>{client.name}</div>
      <Space>
        <CustomSelect options={accounts} defaultValue={accounts[0].value} />
        <div className='box_switch'>
          <CustomSwitch
            checked={
              !!client.source?.some(
                (source) => source.source === ConnectionType[connection.type]
              )
            }
            onChange={onChange}
            loading={isCreateConnectionLoading || isDeleteConnectionLoading}
          />
        </div>
      </Space>
    </Space>
  );
};
