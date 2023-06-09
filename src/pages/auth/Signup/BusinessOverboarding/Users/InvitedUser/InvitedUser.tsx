import { Avatar, Button, Col, Row, Space } from "antd";
import { Avatars } from "../../../../../../assets/base64Icons";
import classes from "./InvitedUser.module.css";

interface InvitedUserProps {
  client: {
    name: string;
    surname: string;
    email: string;
  };
}

const InvitedUser = ({ client }: InvitedUserProps) => {
  return (
    <Col span={24}>
      <Row
        gutter={[16, 16]}
        align="middle"
        style={{
          background: "#f2f3f7",
          padding: "12px 0px",
          borderRadius: "12px",
        }}
      >
        <Col span={21}>
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
        </Col>
        <Col span={3}>
          <Button size="large" style={{ width: "100%" }} disabled>
            Invited
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default InvitedUser;
