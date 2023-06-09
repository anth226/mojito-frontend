import { Button, Card, Col, Input, Modal, Row } from "antd";
import { useState } from "react";
import { Client } from "../../../../interfaces/Client";
import PlusIcon from "../../../../assets/Icons/Plus";
import UserRow from "../../../../components/UserRow/UserRow";
import {
  ClientRoles,
  ClientStatus,
  ClientStatusColor,
} from "../../../../enums/clients";
import UserTypeSelection from "../../../../components/UserTypeSelection/UserTypeSelection";
import UserRolesMenu from "../../../../components/RadioMenu/UserRolesMenu/UserRolesMenu";
import { emailValidator } from "../../../../utils/validators";
import { mockClients } from "../../../../mockdata/Client";

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
  name: "",
  surname: "",
  email: "",
  status: ClientStatus.INVITED,
};

function checkObjectForEmptyValues(object: Object) {
  let emptyField = false;
  Object.values(object).forEach((entry) => {
    if (entry === "" || entry === 0) {
      emptyField = true;
    }
  });
  return emptyField;
}

const ClientUsersSetting = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [modal, setModal] = useState<true | false>(false);
  const [newClient, setNewClient] = useState<Client>(defaultClientValues);
  const [changedUsers, setChangedUsers] = useState<true | false>(false);

  const onChange = (e: any) => {
    const propertyName = e.target.name;
    const propertyValue = e.target.value;
    setNewClient((prevState) => ({
      ...prevState,
      [propertyName]: propertyValue,
    }));
  };

  const onEdit = (value: ClientRoles, index: number) => {
    const temp = [...clients];
    temp[index].role = value;
    setClients(temp);
    setChangedUsers(true);
  };

  const addClient = () => {
    const temp = [...clients];
    temp.push(newClient);
    setClients(temp);
    closeModal();
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
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          <h2 style={{ margin: "0px" }}>Users</h2>
        </Col>
        <Col>
          <div style={{ display: "flex", gap: "10px" }}>
            {changedUsers && (
              <Button
                size="large"
                type="primary"
                style={{
                  display: "flex",
                  paddingLeft: "0px",
                  justifyContent: "space-around",
                  width: "150px",
                  margin: "10px 5px",
                }}
              >
                <b>Save</b>
              </Button>
            )}
            <Button
              icon={
                <PlusIcon
                  fill="#FFFFFF"
                  stroke="#FFFFFF"
                  style={{ marginTop: "2px" }}
                />
              }
              type="primary"
              size="large"
              style={{
                display: "flex",
                paddingLeft: "0px",
                justifyContent: "space-around",
                width: "150px",
                margin: "10px 5px",
              }}
              onClick={() => openModal()}
            >
              <b>Invite User</b>
            </Button>
          </div>
        </Col>
      </Row>
      {clients.map((client, index) => (
        <UserRow
          key={index}
          user={client}
          extras={
            <Row justify={"end"} gutter={[16, 16]}>
              <Col span={8}>
                <UserTypeSelection
                  defaultValue={client.role}
                  onChange={(value) => onEdit(value as ClientRoles, index)}
                />
              </Col>
              <Col span={4}>
                <Button
                  size="large"
                  style={{
                    width: "100%",
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
        title="Invite user"
        open={modal}
        onCancel={closeModal}
        style={{ color: "#9A9AAF" }}
        footer={(function () {
          return (
            <>
              <Button onClick={closeModal}>Cancel</Button>
              <Button
                type="primary"
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
                  target: { name: "role", value: e.target.value },
                })
              }
              defaultValue={newClient.role}
            />
          </Col>
          <Col span={24}>
            <label>Name</label>
            <Input
              name="name"
              size="large"
              onChange={onChange}
              value={newClient.name}
              placeholder={"Enter name"}
            />
          </Col>
          <Col span={24}>
            <label>Surname</label>
            <Input
              name="surname"
              size="large"
              onChange={onChange}
              value={newClient.surname}
              placeholder={"Enter surname"}
            />
          </Col>
          <Col span={24}>
            <label>Email</label>
            <Input
              name="email"
              size="large"
              type="email"
              onChange={onChange}
              status={emailValidator(newClient.email) ? "" : "error"}
              value={newClient.email}
              placeholder={"Enter email"}
            />
          </Col>
        </Row>
      </Modal>
    </Card>
  );
};

export default ClientUsersSetting;
