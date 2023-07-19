import { Avatar, Spin } from 'antd';
import CustomSwitch from 'components/CustomSwitch/CustomSwitch';
import { ConnectionClient } from 'interfaces/Connection';
import classes from './connectionClients.module.css';

import { CREATE_CONNECTION, DELETE_CONNECTION } from 'api/graphql/mutations';
import { useGraphQlMutation } from 'hooks/useCustomHookApollo';
import { toast } from 'react-toastify';

type ConnectionClientProps = {
  refetch: Function;
  client: ConnectionClient;
  id?: string;
  source: string;
};

export const ConnectionClientItem = (props: ConnectionClientProps) => {
  const { client, refetch, source, id } = props;

  const [createConnection, { loading: isCreateLoading }] = useGraphQlMutation(
    CREATE_CONNECTION,
    {
      onError(error) {
        toast.error(error.message);
        throw error;
      },
      onCompleted: () => {
        refetch();
      },
    }
  );

  const [deleteConnection, { loading: isDeleteLoading }] = useGraphQlMutation(
    DELETE_CONNECTION,
    {
      onError(error) {
        toast.error(error.message);
        throw error;
      },
      onCompleted: () => {
        refetch();
      },
    }
  );

  const onChange = async (checked: boolean) => {
    if (checked) {
      const input = {
        source: source,
        clientId: client._id,
        clientMutationId: null,
      };

      await createConnection({
        variables: { input: input },
      });
    } else {
      const input = {
        id: id,
        clientMutationId: null,
      };

      await deleteConnection({
        variables: { input: input },
      });
    }
  };
  return (
    <>
      <div className={classes.client}>
        <div style={{ display: 'flex' }}>
          <Avatar size={'large'} src={client.avatar} />
          <div className={classes.client_details}>
            <span className={classes.client_name}>{client.name ?? 'NAME'}</span>
            <span className={classes.client_email}>{client.email}</span>
          </div>
        </div>
        {/* <ConnectionBadgeButton status={client.status} /> */}
        {/* <ConnectionButton /> */}
        <CustomSwitch checked={!!id} onChange={onChange} />
      </div>
      {(isCreateLoading || isDeleteLoading) && <Spin />}
    </>
  );
};
