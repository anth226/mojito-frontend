import { Avatar, Card, Divider } from "antd";
import { Connections } from "../../assets/base64Icons";
import { Connection } from "../../interfaces/Connection";
import { Client } from "../../interfaces/Client";

const { Meta } = Card;

export interface ClientBadgeProps extends Omit<Client, "connections"> {
  date: string;
  connections: Connection[];
}

const ClientBadge = ({
  name = "Client Name",
  date = "Date",
  avatar,
  connections,
}: ClientBadgeProps) => {
  return (
    <Card bodyStyle={{ minWidth: "340px" }}>
      <Meta
        avatar={<Avatar size={60} src={avatar} />}
        title={name}
        description={date}
      />
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Connections</span>
        <Avatar.Group>
          <Avatar
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "1px 2px 0px 0px #f3f1f1",
              padding: "4px",
            }}
            src={
              <img
                src={connections[0].avatar ?? Connections.TIKTOK}
                alt={""}
                style={{ objectFit: "contain" }}
              />
            }
          />
          <Avatar
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "1px 2px 0px 0px #f3f1f1",
              padding: "4px",
            }}
            src={connections[1].avatar ?? Connections.GOOGLE_ADS}
          />
          <Avatar
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "1px 2px 0px 0px #f3f1f1",
              padding: "4px",
            }}
            src={
              <img
                src={connections[2].avatar ?? Connections.META}
                alt={""}
                style={{ objectFit: "contain" }}
              />
            }
          />
        </Avatar.Group>
      </div>
    </Card>
  );
};

export default ClientBadge;
