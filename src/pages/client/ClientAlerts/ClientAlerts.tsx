import { Row, Col, Button } from "antd";
import PlusIcon from "../../../assets/Icons/Plus";
import AlertCard from "../../../components/AlertCard/AlertCard";
import { mockAlerts } from "../../../mockdata/Alerts";
import AlertModal from "../../../components/AlertModal/AlertModal";
import AlertPanel from "../../../components/AlertPanel/AlertPanel";
import { useState } from "react";
import { AlertStatus } from "../../../enums/alerts";
import { Alert } from "../../../interfaces/Alert";

const ClientAlerts = () => {
  const [alertsPanel, setAlertsPanel] = useState<true | false>(false);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [newAlertModal, setNewAlertModal] = useState(false);

  const onAlertClickPanel = (clickedAlert: Alert) => {
    const temp: Alert[] = [];
    for (const alert of alerts) {
      if (alert.id === clickedAlert.id) {
        temp.push({
          ...alert,
          status:
            clickedAlert.status === AlertStatus.NEW
              ? AlertStatus.ARCHIVE
              : AlertStatus.NEW,
        });
      } else {
        temp.push({ ...alert });
      }
    }
    setAlerts(temp);
  };
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
      <Col span={24}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ margin: "0px" }}>Alerts</h1>

          <Button
            icon={<PlusIcon fill="#FFFFFF" />}
            type="primary"
            style={{
              width: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
            size="large"
            onClick={() => setNewAlertModal(true)}
          >
            <b>New alert</b>
          </Button>
        </div>
      </Col>
      {mockAlerts.map((alert, index) => {
        return (
          <Col span={24}>
            <AlertCard
              alert={alert}
              key={index}
              onClick={() => setAlertsPanel(true)}
            />
          </Col>
        );
      })}
      <AlertPanel
        onAlertEyeClick={onAlertClickPanel}
        alerts={alerts}
        open={alertsPanel}
        onClose={() => setAlertsPanel(false)}
        closable={false}
      />
      <AlertModal
        closeModal={() => setNewAlertModal(false)}
        open={newAlertModal}
      />
    </Row>
  );
};

export default ClientAlerts;
