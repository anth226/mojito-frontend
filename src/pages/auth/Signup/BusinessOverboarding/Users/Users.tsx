import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import PlusIcon from "../../../../../assets/Icons/Plus";
import InvitedUser from "./InvitedUser/InvitedUser";
import NewUser from "./NewUser/NewUser";

interface NewClient {
  name: string;
  surname: string;
  email: string;
  avatar: string;
  invited: boolean;
}

const newClient: NewClient = {
  name: "",
  surname: "",
  email: "",
  avatar: "",
  invited: false,
};

const BusinessOnBoardingUsers = () => {
  const [clients, setClients] = useState<NewClient[]>([newClient]);

  const onChange = (e: any, index: number) => {
    const propertyName = e.target.name;
    const propertyValue = e.target.value;
    const temporaryList = JSON.parse(JSON.stringify(clients));
    temporaryList[index][propertyName] = propertyValue;
    setClients(temporaryList);
  };

  const addClient = () => {
    const temp = [...clients];
    temp.push(newClient);
    setClients(temp);
  };

  const sendInvite = (index: number) => {
    const temp = [...clients];
    temp[index].invited = true
    setClients(temp)
  }

  return (
    <>
      <div>
        <h1 style={{ margin: "0px" }}>Users</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <Row
        gutter={[16, 16]}
        justify={"start"}
        style={{ textAlign: "start", color: "#9A9AAF" }}
      >
        {clients.map((client, index) => {
          return (
            <React.Fragment key={index}>
              {client.invited ? (
                <InvitedUser client={client}/>
              ) : (
                <NewUser client={client} onChange={onChange} index={index} sendInvite={sendInvite} />
              )}
            </React.Fragment>
          );
        })}
        <Col span={24}>
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
