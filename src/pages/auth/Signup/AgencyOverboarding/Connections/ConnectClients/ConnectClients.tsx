import { Avatar, Button, Divider, Space } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import { Avatars } from "../../../../../../assets/base64Icons";
import {
  ConnectionBadgeButton,
} from "../../../../../../components/ConnectionButton/ConnectionButton";
import { ConnectionStatus } from "../../../../../../enums/connections";
import { Connection } from "../../../../../../interfaces/Connection";
import {
  getOnboardingFromStore,
  updateConnectionsOfClient,
} from "../../../../../../reduxSlices/onboarding/onboarding";
import classes from "./connectClients.module.css";
import { ReactComponent as PlusIcon } from "../../../../../../assets/Icons/Plus.svg";

interface ConnectClientsProps {
  connection: Connection;
}

const ConnectClients = ({ connection }: ConnectClientsProps) => {
  const { clients } = useAppSelector(getOnboardingFromStore);
  const dispatch = useAppDispatch();

  const addConnection = (index: number) => {
    const payload = {
      action: "add",
      index,
      connectionName: connection.name,
    };
    dispatch(updateConnectionsOfClient(payload));
  };

  const removeConnection = (index: number) => {
    const payload = {
      action: "remove",
      index,
      connectionName: connection.name,
    };
    dispatch(updateConnectionsOfClient(payload));
  };

  return (
    <Space direction="vertical">
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "0px 12px",
          }}
        >
          <Avatar size={"large"} src={connection.cover} />
          <h1 style={{ margin: "0px" }}>{connection.name}</h1>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {clients.map((client, index) => {
          return (
            <React.Fragment key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Space>
                  <Avatar size={"large"} src={Avatars.AVATAR1} />
                  <div className={classes.client_details}>
                    <span className={classes.client_name}>
                      {client.name ?? "NAME"}
                    </span>
                    <span className={classes.client_email}>
                      {client.email ?? "email"}
                    </span>
                  </div>
                </Space>
                {client.connections?.includes(connection.name) ? (
                  <ConnectionBadgeButton
                    status={ConnectionStatus.CONNECTED}
                    color={"#0062FF"}
                    borderColor={"#0062FF"}
                    backgroundColor={"#CCE0FE"}
                    onClick={() => removeConnection(index)}
                  />
                ) : (
                  <Button
                    icon={<PlusIcon />}
                    type="text"
                    style={{
                      display: "flex",
                      paddingLeft: "0px",
                      justifyContent: "space-around",
                      color: "#0062FF",
                    }}
                    onClick={() => addConnection(index)}
                  >
                    <b>Add Connection</b>
                  </Button>
                )}
              </div>
              <Divider style={{ margin: "12px 0px" }} />
            </React.Fragment>
          );
        })}
      </div>
    </Space>
  );
};

export default ConnectClients;
