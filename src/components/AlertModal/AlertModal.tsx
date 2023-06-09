import { Button, Col, Input, Modal, ModalProps, Row, Select } from "antd";
import { actions, parameters } from "../../mockdata/Alerts";
import { mockClients } from "../../mockdata/Client";

interface AlertModalProps extends Omit<ModalProps, "onCancel"> {
  closeModal: Function;
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

const AlertModal = ({ open, closeModal, multipleClients }: AlertModalProps) => {
  return (
    <Modal
      title="New Alert"
      open={open}
      onCancel={() => closeModal()}
      style={{ color: "#9A9AAF" }}
      footer={(function () {
        return (
          <>
            <Button onClick={() => closeModal()}>Cancel</Button>
            <Button
              type="primary"
              //   onClick={addClient}
              //   disabled={
              //     checkObjectForEmptyValues(newClient) ||
              //     !emailValidator(newClient.email)
              //   }
            >
              Save
            </Button>
          </>
        );
      })()}
    >
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
      </Row>
    </Modal>
  );
};

export default AlertModal;
