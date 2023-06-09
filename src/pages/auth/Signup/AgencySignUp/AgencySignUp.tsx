import { Alert, Button, Form, Input } from "antd";
import { useAppDispatch } from "../../../../app/hooks";
import { AccountType, signup } from "../../../../reduxSlices/auth/auth";
import classes from "./AgencySignUp.module.css";

const AgencySignUp = () => {
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    console.log(values);
    dispatch(signup({...values, account: AccountType.AGENCY}));
  };

  return (
    <Form id="login" layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Agency Name"
        name={"agency_name"}
        rules={[
          {
            required: true,
            message: "Please enter agency name!",
          },
        ]}
      >
        <Input type="agency name" placeholder="Please enter agency name" />
      </Form.Item>
      <Form.Item
        label="Email"
        name={"email"}
        rules={[
          {
            required: true,
            message: "Please enter admin email!",
          },
        ]}
        style={{
            marginBottom: "0px",
          }}
      >
        <Input type="email" placeholder="Please enter admin email" />
      </Form.Item>
      <Alert
        message="Additional contacts/users can be added in the settings"
        type="info"
        showIcon
        className={classes.additional_info}
      />
      <Form.Item
        label="Password"
        name={"password"}
        rules={[
          {
            required: true,
            message: "Please enter password!",
          },
        ]}
        style={{
          marginBottom: "0px",
        }}
      >
        <Input type="password" placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%", marginTop: "24px" }}
        >
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AgencySignUp;
