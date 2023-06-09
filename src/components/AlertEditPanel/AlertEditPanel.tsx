import { Button, Col, Drawer, DrawerProps, Input, Row, Select } from "antd";
import { actions, parameters } from "../../mockdata/Alerts";
import { mockClients } from "../../mockdata/Client";
import Close from "../../assets/Icons/Close";
import classes from "./AlertEditPanel.module.css";

interface AlertModalProps extends DrawerProps {
  multipleClients?: Boolean;
}

const clientsOptions = (() => {
  return mockClients.map((client) => {
    return {
      value: client.email,
      label: client.name,
    };
  });
})();

const AlertEditPanel = ({
  multipleClients,
  ...drawerProps
}: AlertModalProps) => {
  return (
    <Drawer
      closable
      placement="right"
      width={700}
      {...drawerProps}
      //   bodyStyle={{ padding: "0px" }}
    >
      <div className={classes.alert_panel_header}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ margin: "0" }}>Edit Alert</h1>
        </div>
        <Close style={{ cursor: "pointer" }} onClick={drawerProps.onClose} />
      </div>

      <Row gutter={[16, 16]} align={"bottom"}>
        <Col span={12}>
          <label>Alert for</label>
          <Select
            style={{ width: "100%" }}
            placeholder={"Input Placeholder"}
            options={clientsOptions}
            mode={multipleClients ? "multiple" : undefined}
          />
        </Col>
        <Col span={12}>
          <label>Severity</label>
          <Select style={{ width: "100%" }} placeholder={"Input Placeholder"} />
        </Col>
        <Col span={24}>
          <b style={{ color: "#000000" }}>Alert Setting</b>
        </Col>
        <Col span={4}>
          <Select
            showArrow={false}
            options={parameters}
            bordered={false}
            style={{ width: "100%" }}
            defaultValue={parameters[0]}
          />
        </Col>
        <Col span={20}>
          <label>Parameter</label>
          <Select style={{ width: "100%" }} placeholder={"Input Placeholder"} />
        </Col>
        <Col span={4}></Col>
        <Col span={10}>
          <label>Math Value</label>
          <Select style={{ width: "100%" }} placeholder={"More Than"} />
        </Col>
        <Col span={10}>
          <label>Value</label>
          <Input placeholder={"Input Placeholder"} />
        </Col>
        <Col span={4}>
          <Select
            showArrow={false}
            options={actions}
            bordered={false}
            style={{ width: "100%" }}
            defaultValue={actions[0]}
          />
        </Col>
        <Col span={20}>
          <label>Alert name</label>
          <Input placeholder={"Input Placeholder"} />
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]} justify={"end"}>
            <Col>
              <Button onClick={drawerProps.onClose}>Cancel</Button>
            </Col>
            <Col>
              <Button type="primary">Save</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Drawer>
  );
};

export default AlertEditPanel;
