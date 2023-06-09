import { Button, Card, Col, Input, Row } from "antd";
import { useState } from "react";
import classes from "./AgencyPasswordAndSecurity.module.css";

const AgencyPasswordAndSecurity = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyNewPassword, setVerifyNewPassword] = useState("");

  return (
    <Card>
      <Row>
        <Col span={24}>
          <h2 style={{ margin: "0px" }}>Password</h2>
          <p>
            Your password must contains at least 6 characters, 1 uppercase, 1
            lowercase and 1 number
          </p>
        </Col>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <label className={classes.password_label}>Current Password</label>
              <Input
                name="currentPassword"
                type="password"
                size="large"
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
              />
            </Col>
            <Col span={24}>
              <label className={classes.password_label}>New Password</label>
              <Input
                name="newPassword"
                type="password"
                size="large"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </Col>
            <Col span={24}>
              <label className={classes.password_label}>
                Confirm new Password
              </label>
              <Input
                name="verifyNewPassword"
                type="password"
                size="large"
                onChange={(e) => setVerifyNewPassword(e.target.value)}
                value={verifyNewPassword}
              />
            </Col>
            <Col span={24}>
              <Row gutter={[16, 16]} justify={"end"}>
                <Col>
                  <Button>Cancel</Button>
                </Col>
                <Col>
                  <Button type="primary">Save</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default AgencyPasswordAndSecurity;
