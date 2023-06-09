import { Card, Space, Avatar, Select, Divider, Progress } from "antd";
import { Avatars } from "../../assets/base64Icons";
import "./AlertCard.css";
import classes from "./AlertCard.module.css";
import { Alert } from "../../interfaces/Alert";
import { operators, parameters } from "../../mockdata/Alerts";

interface AlertCardProps {
  alert: Alert;
  onClick?: Function;
}

const ParameterSelectors = ({ alert }: { alert: Alert }) => {
  return (
    <div style={{ display: "flex", columnGap: "12px" }}>
      <Select
        showArrow={false}
        options={parameters}
        bordered={false}
        style={{ width: "50px" }}
        defaultValue={alert.parameter}
      />
      <span className={classes.bold_text}>Parameter</span>
      <Select
        showArrow={false}
        options={operators}
        bordered={false}
        style={{ width: "150px" }}
        defaultValue={alert.operator}
      />
      <span className={classes.bold_text}>Value</span>
    </div>
  );
};

const AlertCard = ({ alert, onClick }: AlertCardProps) => {
  const ifClickable = () => {
    if (onClick instanceof Function) {
      onClick();
    }
  };
  return (
    <Card
      bordered={false}
      onClick={ifClickable}
      hoverable={onClick instanceof Function}
    >
      <div className={classes.alert_box}>
        <Space>
          <Avatar size={"large"} src={Avatars.AVATAR1} />
          <div className={classes.alert_overview}>
            <span className={classes.bold_text}>{alert.name}</span>
            <span className={classes.light_text}>{alert.source}</span>
          </div>
        </Space>
        <ParameterSelectors alert={alert} />
      </div>
    </Card>
  );
};

export const AlertCardAgency = ({ alert, onClick }: AlertCardProps) => {
  const ifClickable = () => {
    if (onClick instanceof Function) {
      onClick();
    }
  };
  return (
    <Card
      bordered={false}
      onClick={ifClickable}
      hoverable={onClick instanceof Function}
    >
      <div className={classes.alert_box}>
        <Space>
          <Avatar size={"large"} src={Avatars.AVATAR1} />
          <div className={classes.alert_overview}>
            <span className={classes.bold_text}>{alert.name}</span>
            <span className={classes.light_text}>{alert.source}</span>
          </div>
        </Space>
        <div
          style={{ display: "flex", columnGap: "12px", alignItems: "center" }}
        >
          <Progress
            strokeColor={"#027A48"}
            percent={50}
            showInfo={false}
            style={{ width: "300px" }}
          />
          <div
            style={{
              backgroundColor: "#F2F3F7",
              padding: "12px",
              borderRadius: "12px",
            }}
          >
            <span>Fired: </span>
            <b>60 times</b>
          </div>
        </div>
      </div>
      <Divider />
      <div className={classes.alert_box}>
        <ParameterSelectors alert={alert} />
        <span>12 Clients</span>
      </div>
    </Card>
  );
};

export default AlertCard;
