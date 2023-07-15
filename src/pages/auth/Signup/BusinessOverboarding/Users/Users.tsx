import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import PlusIcon from 'assets/Icons/Plus';
import InvitedUser from './InvitedUser/InvitedUser';
import NewUser from './NewUser/NewUser';
import { NewClient } from 'interfaces/Client';
import { useGraphQlMutation } from 'hooks/useCustomHookApollo';
import { INVITE_MEMBERS } from 'api/graphql/mutations';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getOnboardingFromStore,
  setUsersInStore,
  updateUsersInStore,
} from 'reduxSlices/onboarding/onboarding';

const newClient: NewClient = {
  name: '',
  surname: '',
  email: '',
  avatar: '',
  invited: false,
};

const BusinessOnBoardingUsers = () => {
  const clientsInStore = useAppSelector(getOnboardingFromStore).users;

  const [clients, setClients] = useState<NewClient[]>(
    clientsInStore.length > 0 ? clientsInStore : [newClient]
  );

  const dispatch = useAppDispatch();

  const [inviteMember] = useGraphQlMutation(INVITE_MEMBERS, {
    onError(error) {
      toast.error(error.message);
      throw error;
    },
    onCompleted: (data: any) => {
      dispatch(updateUsersInStore(data?.inviteMembers?.members?.[0]?.email));
    },
  });

  const onChange = (e: any, index: number) => {
    const propertyName = e.target.name;
    const propertyValue = e.target.value;
    const temporaryList = JSON.parse(JSON.stringify(clients));
    temporaryList[index][propertyName] = propertyValue;
    setClients(temporaryList);
    dispatch(setUsersInStore(temporaryList));
  };

  const addClient = () => {
    setClients((prevState) => [...prevState, newClient]);
  };

  const sendInvite = async (client: NewClient) => {
    const input = {
      members: [
        {
          email: client.email,
          name: `${client.surname} ${client.name}`,
          clientMutationId: null,
        },
      ],
      clientMutationId: null,
    };
    await inviteMember({
      variables: { input: input },
    });
  };

  useEffect(() => {
    const clients = clientsInStore.length > 0 ? clientsInStore : [newClient];
    setClients(clients);
  }, [clientsInStore]);

  return (
    <>
      <div>
        <h1 style={{ margin: '0px' }}>Users</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <Row
        gutter={[16, 16]}
        justify={'start'}
        style={{ textAlign: 'start', color: '#9A9AAF', width: '1100px' }}
      >
        {clients.map((client, index) => {
          return (
            <React.Fragment key={index}>
              {client.invited ? (
                <InvitedUser client={client} />
              ) : (
                <NewUser
                  client={client}
                  onChange={onChange}
                  index={index}
                  sendInvite={() => sendInvite(client)}
                />
              )}
            </React.Fragment>
          );
        })}
        <Col span={24}>
          <Button
            icon={
              <PlusIcon
                fill='#FFFFFF'
                stroke='#FFFFFF'
                style={{ marginTop: '2px' }}
              />
            }
            type='primary'
            size='large'
            style={{
              display: 'flex',
              paddingLeft: '0px',
              justifyContent: 'space-around',
              width: '150px',
              margin: '10px 5px',
            }}
            onClick={() => addClient()}
          >
            <b>Invite User</b>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default BusinessOnBoardingUsers;
