import { Button, Steps } from 'antd';
import { INVITE_CLIENTS } from 'api/graphql/mutations';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ArrowLeft from 'assets/Icons/ArrowLeft';
import { CustomLoading } from 'components/CustomLoading/CustomLoading';
import { useGraphQlMutation } from 'hooks/useCustomHookApollo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  ClientStore,
  getClientFromStore,
  setClientInStore,
} from 'reduxSlices/clients/clients';
import classes from './AddClient.module.css';
import { Connections } from './Connections/Connections';
import { GeneralInfo } from './GeneralInfo/GeneralInfo';

const newClient: ClientStore = {
  name: '',
  email: '',
  source: [],
};

export const AddClient = () => {
  const { client: clientsInStore } = useAppSelector(getClientFromStore);

  const [current, setCurrent] = useState(0);
  const [clients, setCLients] = useState<ClientStore[]>(
    clientsInStore.length > 0 ? clientsInStore : [newClient]
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const steps = [
    {
      title: 'General information',
      content: 'general-information',
    },
    {
      title: 'Connections',
      content: 'connections',
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const [inviteClients, { loading: isInviteClientLoading }] =
    useGraphQlMutation(INVITE_CLIENTS, {
      onError(error) {
        toast.error(error.message);
        throw error;
      },
      onCompleted: (data: any) => {
        const clients = data?.inviteClients?.clients;
        const newClient: ClientStore[] = clients.map((client: any) => {
          return {
            source: [],
            name: client.name,
            email: client.email,
            _id: client._id,
          };
        });
        dispatch(setClientInStore([...clientsInStore, ...newClient]));
        setCurrent(current + 1);
      },
    });

  const next = async () => {
    const clientsData = clients.reduce((pre: any, cur: ClientStore) => {
      if (!cur._id) {
        const newCur = {
          email: cur.email,
          name: cur.name,
          clientMutationId: null,
        };
        return [...pre, newCur];
      }
      return [...pre];
    }, []);
    const input = {
      clients: clientsData,
      clientMutationId: null,
    };

    clientsData.length > 0
      ? await inviteClients({ variables: { input: input } })
      : setCurrent(current + 1);
  };

  const handleCancel = () => {
    setCLients(clientsInStore.length > 0 ? clientsInStore : [newClient]);
    setCurrent(0);
  };

  const onConfirm = async () => {
    // const input = {
    //   source: ConnectionType[connection.type],
    //   clientId: clients[index]._id,
    // };
    // const connectionResponse = await createConnection({
    //   variables: { input: input },
    // });
  };

  return (
    <>
      <div style={{ display: 'flex', height: '100%', width: '100%' }}>
        <div style={{ width: '340px' }}>
          <Button
            icon={<ArrowLeft />}
            className={classes.button_back}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Steps
            size='small'
            current={current}
            items={items}
            direction='vertical'
          />
        </div>
        <div style={{ width: '100%' }}>
          <div>
            {steps[current].content === 'general-information' && (
              <div className={classes.content_box}>
                <GeneralInfo
                  step={steps[current]}
                  clients={clients}
                  setCLients={setCLients}
                />
              </div>
            )}
            {steps[current].content === 'connections' && (
              <div className={classes.content_box}>
                <Connections step={steps[current]} />
              </div>
            )}
          </div>
          <div className={classes.action_box}>
            <Button
              className={[classes.button_action, classes.button_cancel].join(
                ' '
              )}
              type='primary'
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>
            {current < steps.length - 1 && (
              <Button
                className={[classes.button_action, classes.button_next].join(
                  ' '
                )}
                type='primary'
                onClick={() => next()}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                className={[classes.button_action, classes.button_next].join(
                  ' '
                )}
                type='primary'
                onClick={() => onConfirm()}
              >
                Confirm
              </Button>
            )}
          </div>
        </div>
      </div>
      {isInviteClientLoading && <CustomLoading loading={true} />}
    </>
  );
};
