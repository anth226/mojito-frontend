import { Button, Card, Form, Input, Space } from "antd";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import useAuthentication from "hooks/authentication";
import {
  LoginCredentials,
  getAuthFromStore,
  AccountRole,
} from "reduxSlices/auth/auth";
import {
  AgencyNavBarPaths,
  AuthenticationPaths,
  ClientNavBarPaths,
} from "../paths";

const Login = () => {
  const authObject = useAppSelector(getAuthFromStore);
  const { authenticate } = useAuthentication();

  const navigate = useNavigate();

  const onFinish = (values: LoginCredentials) => {
    try {
      // API to login
      authenticate(values);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (authObject.authenticated) {
      if (authObject.role === AccountRole.AGENCY) {
        navigate(AgencyNavBarPaths.HQ);
      }
      if (authObject.role === AccountRole.BUSINESS) {
        navigate(ClientNavBarPaths.OVERVIEW);
      }
      if (authObject.role === AccountRole.CLIENT) {
        navigate(ClientNavBarPaths.OVERVIEW);
      }
    }
  }, [authObject.authenticated, authObject.role, navigate]);

  return (
    <Card
      style={{ maxWidth: "590px", height: "fit-content", marginTop: "80px" }}
    >
      <Space direction="vertical" size="middle" style={{ textAlign: "center" }}>
        <h1>Log in</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          Password AGENCY to see into AGENCY Password CLIENT to see into CLIENT
        </p>
        <Form id="login" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name={"email"}
            rules={[
              {
                required: true,
                message: "Please enter email!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
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
            <Input type="password" />
          </Form.Item>
          <NavLink
            to="/#"
            style={{
              display: "flex",
              marginBottom: "24px",
            }}
          >
            Forgot password?
          </NavLink>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </Form.Item>
          <p>
            Already have an account?{" "}
            <NavLink to={AuthenticationPaths.SIGNUP}>Sign up?</NavLink>
          </p>
        </Form>
      </Space>
    </Card>
  );
};

export default Login;
