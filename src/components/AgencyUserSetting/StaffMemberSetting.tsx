import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  Modal,
  Row,
  Skeleton,
} from 'antd';
import { INVITE_CLIENTS, INVITE_MEMBERS } from 'api/graphql/mutations';
import { GET_LIST_MEMBERS } from 'api/graphql/queries';
import ArrowDownMini from 'assets/Icons/ArrowDownMini';
import { Avatars } from 'assets/base64Icons';
import UserRolesMenu from 'components/RadioMenu/UserRolesMenu/UserRolesMenu';
import UserRow from 'components/UserRow/UserRow';
import { ClientRoles, ClientStatus, ClientStatusColor } from 'enums/clients';
import { useGraphQlMutation, useGraphQlQuery } from 'hooks/useCustomHookApollo';
import { Client } from 'interfaces/Client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { emailValidator } from 'utils/validators';
import classes from './UserSetting.module.css';

import EditIcon from 'assets/Icons/EditIcon';
import { ReactComponent as MagnifyingGlass } from 'assets/Icons/MagnifyingGlass.svg';
import UserTypeSelection from 'components/UserTypeSelection/UserTypeSelection';

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

const StaffMemberSetting = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [modal, setModal] = useState<true | false>(false);
  const [newClient, setNewClient] = useState<Client>(defaultClientValues);
  const [searchValue, setSearchValue] = useState('');

  console.log(searchValue);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value;
    setSearchValue(searchString);
  };

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
          role: member?.role,
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

  // const openModal = () => {
  //   setModal(true);
  // };

  const closeModal = () => {
    setModal(false);
    setNewClient(defaultClientValues);
  };

  return (
    <Card className={classes.card_box}>
      <Row
        justify={'space-between'}
        align={'middle'}
        className={classes.filter}
      >
        <Col span={14}>
          <Input
            className={classes.search_box}
            size='large'
            placeholder='Search'
            prefix={<MagnifyingGlass />}
            onChange={onSearchChange}
          />
        </Col>
        <Col>
          <Dropdown
            menu={{
              items: [
                {
                  label: 'Ascending',
                  key: 'asc-name',
                },
                {
                  label: 'Descending',
                  key: 'desc-name',
                },
              ],
            }}
            trigger={['click']}
          >
            <div
              style={{
                backgroundColor: '#e2e2ea',
                padding: '7px 11px',
                borderRadius: '25px',
                width: '120px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <span>Sort by</span>
              <ArrowDownMini />
            </div>
          </Dropdown>
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
              <Col style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar.Group>
                  <Avatar
                    src={
                      <img
                        src={Avatars.AVATAR1}
                        alt={''}
                        style={{ objectFit: 'contain' }}
                      />
                    }
                  />
                  <Avatar src={Avatars.AVATAR2} />
                  <Avatar
                    src={
                      <img
                        src={Avatars.AVATAR3}
                        alt={''}
                        style={{ objectFit: 'contain' }}
                      />
                    }
                  />
                  <Avatar src={Avatars.AVATAR4} />
                </Avatar.Group>
              </Col>
              <Col span={2}></Col>
              <Col span={8}>
                <UserTypeSelection
                  type='userRoles'
                  disabled={true}
                  defaultValue={client.role}
                />
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
              <Col
                span={2}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Button type='text' shape='circle' icon={<EditIcon />} />
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

export default StaffMemberSetting;
