import { Button, Col, Input } from "antd";
import { emailValidator } from "../../../../../../utils/validators";

interface NewUserProps {
  client: {
    name: string;
    surname: string;
    email: string;
  };
  onChange: Function;
  index: number;
  sendInvite: CallableFunction;
}

const NewUser = ({ client, onChange, index, sendInvite }: NewUserProps) => {
  const canInvite = () => {
    if (
      client.name !== "" &&
      client.surname !== "" &&
      client.email !== "" &&
      emailValidator(client.email)
    ) {
      return true;
    }
    return false;
  };
  return (
    <>
      <Col span={7}>
        <label>Name</label>
        <Input
          name="name"
          size="large"
          onChange={(e) => onChange(e, index)}
          value={client.name}
          placeholder={"Enter name"}
        />
      </Col>
      <Col span={7}>
        <label>Surname</label>
        <Input
          name="surname"
          size="large"
          onChange={(e) => onChange(e, index)}
          value={client.surname}
          placeholder={"Enter surname"}
        />
      </Col>
      <Col span={7}>
        <label>Email</label>
        <Input
          name="email"
          size="large"
          type="email"
          onChange={(e) => onChange(e, index)}
          status={emailValidator(client.email) ? "" : "error"}
          value={client.email}
          placeholder={"Enter email"}
        />
      </Col>
      <Col span={3}>
        <Button
          size="large"
          style={{ width: "100%", marginTop: "20px" }}
          onClick={() => sendInvite(index)}
          disabled={!canInvite()}
        >
          Invite
        </Button>
      </Col>
    </>
  );
};

export default NewUser;
