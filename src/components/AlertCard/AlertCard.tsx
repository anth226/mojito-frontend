import { Avatar, Card, Divider, Progress, Select, Space } from 'antd';
import { alertParameter, mathValues } from 'constants/Alert';
import { Avatars } from 'assets/base64Icons';
import { Alert } from 'interfaces/Alert';
import './AlertCard.css';
import classes from './AlertCard.module.css';
const PROGRESSWIDTH = 300;

interface AlertCardProps {
  progressBarValue?: number;
  alert: Alert;
  onClick?: Function;
}

const ParameterSelectors = ({ alert }: { alert: Alert }) => {
  return (
    <div style={{ display: 'flex', columnGap: '12px' }}>
      <Select
        showArrow={false}
        options={alertParameter}
        bordered={false}
        style={{ width: 'auto' }}
        value={alert.parameter}
        disabled
      />
      <span className={[classes.bold_text, classes.text_content].join(' ')}>
        Parameter
      </span>
      <Select
        showArrow={false}
        options={mathValues}
        bordered={false}
        style={{ width: '150px' }}
        value={alert.operation}
        disabled
      />
      <span className={[classes.bold_text, classes.text_content].join(' ')}>
        Value
      </span>
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
          <Avatar size={'large'} src={Avatars.AVATAR1} />
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

export const AlertCardAgency = ({
  alert,
  progressBarValue,
  onClick,
}: AlertCardProps) => {
  const ifClickable = () => {
    if (onClick instanceof Function) {
      onClick();
    }
  };
  const pecent = progressBarValue
    ? (alert.clients?.length / progressBarValue) * 100
    : 0;

  return (
    <Card
      bordered={false}
      onClick={ifClickable}
      hoverable={onClick instanceof Function}
    >
      <div className={classes.alert_box}>
        <Space>
          <Avatar size={'large'} src={Avatars.AVATAR1} />
          <div className={classes.alert_overview}>
            <span className={classes.bold_text}>{alert.name}</span>
            <span className={classes.light_text}>{alert.source}</span>
          </div>
        </Space>
        <div
          style={{ display: 'flex', columnGap: '12px', alignItems: 'center' }}
        >
          <Progress
            strokeColor={'#027A48'}
            percent={pecent}
            showInfo={false}
            style={{ width: `${PROGRESSWIDTH}px` }}
          />
          <div
            style={{
              backgroundColor: '#F2F3F7',
              padding: '12px',
              borderRadius: '12px',
            }}
          >
            <span>Fired: </span>
            <b>{alert.fires} times</b>
          </div>
        </div>
      </div>
      <Divider />
      <div className={classes.alert_box}>
        <ParameterSelectors alert={alert} />
        <span>{alert.clients?.length} Clients</span>
      </div>
    </Card>
  );
};

export default AlertCard;
