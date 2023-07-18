import { Button, Card, Col, Input, Modal, Row, Skeleton } from 'antd';
import { INVITE_CLIENTS, INVITE_MEMBERS } from 'api/graphql/mutations';
import { GET_LIST_MEMBERS } from 'api/graphql/queries';
import PlusIcon from 'assets/Icons/Plus';
import UserRolesMenu from 'components/RadioMenu/UserRolesMenu/UserRolesMenu';
import UserRow from 'components/UserRow/UserRow';
import UserTypeSelection from 'components/UserTypeSelection/UserTypeSelection';
import { ClientRoles, ClientStatus, ClientStatusColor } from 'enums/clients';
import { useGraphQlMutation, useGraphQlQuery } from 'hooks/useCustomHookApollo';
import { Client } from 'interfaces/Client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { emailValidator } from 'utils/validators';

function getClientStatusColor(status: ClientStatus | undefined) {
  switch (status) {
    case ClientStatus.INVITED:
      return ClientStatusColor.INVITED;
    case ClientStatus.ACTIVE:
      return ClientStatusColor.ACTIVE;

    default:
      return ClientStatusColor.UN_INVITED;
  }
}

const defaultClientValues: Client = {
  role: ClientRoles.CLIENT,
  name: '',
  surname: '',
  email: '',
  status: ClientStatus.INVITED,
};

function checkObjectForEmptyValues(object: Object) {
  let emptyField = false;
  Object.values(object).forEach((entry) => {
    if (entry === '' || entry === 0) {
      emptyField = true;
    }
  });
  return emptyField;
}

const AgencyUsersSetting = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [modal, setModal] = useState<true | false>(false);
  const [newClient, setNewClient] = useState<Client>(defaultClientValues);

  const {
    data: listMembers,
    loading: isLoadingFetchListMember,
    refetch,
  } = useGraphQlQuery(GET_LIST_MEMBERS);

  const [inviteMember] = useGraphQlMutation(INVITE_MEMBERS, {
    onError(error) {
      toast.error(error.message);
      throw error;
    },
    onCompleted: () => {
      closeModal();
      refetch();
    },
  });

  const [inviteClients] = useGraphQlMutation(INVITE_CLIENTS, {
    onError(error) {
      toast.error(error.message);
      throw error;
    },
    onCompleted: () => {
      closeModal();
      refetch();
    },
  });

  useEffect(() => {
    const newClients: Client[] = listMembers?.members?.nodes?.map(
      (member: Client) => {
        return {
          _id: member?._id,
          name: member?.name,
          email: member?.email,
          status:
            (member?.status as string) === 'INVITED'
              ? ClientStatus.INVITED
              : (member?.status as string) === 'ACTIVE'
              ? ClientStatus.ACTIVE
              : ClientStatus.UN_INVITED,
        };
      }
    );
    setClients(newClients);
  }, [listMembers]);

  const onChange = (e: any) => {
    const propertyName = e.target.name;
    const propertyValue = e.target.value;
    setNewClient((prevState) => ({
      ...prevState,
      [propertyName]: propertyValue,
    }));
  };

  const addClient = async () => {
    if (newClient?.role === 'client') {
      const input = {
        clients: [
          {
            email: newClient.email,
            name: `${newClient.surname} ${newClient.name}`,
            clientMutationId: null,
          },
        ],
        clientMutationId: null,
      };
      await inviteClients({
        variables: { input: input },
      });
    } else {
      const input = {
        members: [
          {
            email: newClient.email,
            name: `${newClient.surname} ${newClient.name}`,
            clientMutationId: null,
          },
        ],
        clientMutationId: null,
      };
      await inviteMember({
        variables: { input: input },
      });
    }
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setNewClient(defaultClientValues);
  };

  return (
    <Card>
      <Row justify={'space-between'} align={'middle'}>
        <Col>
          <h2 style={{ margin: '0px' }}>Users</h2>
        </Col>
        <Col>
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
            onClick={() => openModal()}
          >
            <b>Invite User</b>
          </Button>
        </Col>
      </Row>
      {isLoadingFetchListMember && (
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
      {clients?.map((client, index) => (
        <UserRow
          key={index}
          user={client}
          extras={
            <Row justify={'end'} gutter={[16, 16]}>
              <Col span={8}>
                <UserTypeSelection defaultValue={client.role} />
              </Col>
              <Col span={4}>
                <Button
                  size='large'
                  style={{
                    width: '100%',
                    backgroundColor: getClientStatusColor(client.status),
                  }}
                  disabled
                >
                  {client.status}
                </Button>
              </Col>
            </Row>
          }
        />
      ))}
      <Modal
        title='Invite user'
        open={modal}
        onCancel={closeModal}
        style={{ color: '#9A9AAF' }}
        footer={(function () {
          return (
            <>
              <Button onClick={closeModal}>Cancel</Button>
              <Button
                type='primary'
                onClick={addClient}
                disabled={
                  checkObjectForEmptyValues(newClient) ||
                  !emailValidator(newClient.email)
                }
              >
                Invite
              </Button>
            </>
          );
        })()}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <UserRolesMenu
              onChange={(e) =>
                onChange({
                  target: { name: 'role', value: e.target.value },
                })
              }
              defaultValue={newClient.role}
            />
          </Col>
          <Col span={24}>
            <label>Name</label>
            <Input
              name='name'
              size='large'
              onChange={onChange}
              value={newClient.name}
              placeholder={'Enter name'}
            />
          </Col>
          <Col span={24}>
            <label>Surname</label>
            <Input
              name='surname'
              size='large'
              onChange={onChange}
              value={newClient.surname}
              placeholder={'Enter surname'}
            />
          </Col>
          <Col span={24}>
            <label>Email</label>
            <Input
              name='email'
              size='large'
              type='email'
              onChange={onChange}
              status={emailValidator(newClient.email) ? '' : 'error'}
              value={newClient.email}
              placeholder={'Enter email'}
            />
          </Col>
        </Row>
      </Modal>
    </Card>
  );
};

export default AgencyUsersSetting;
