import { Avatar, Drawer, DrawerProps, Tabs, TabsProps } from 'antd';
import Eye from 'assets/Icons/Eye';
import ArrowRight from 'assets/Icons/ArrowRight';
import Close from 'assets/Icons/Close';
import { Avatars } from 'assets/base64Icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AlertStatus } from 'enums/alerts';
import { Alert } from 'interfaces/Alert';
import { useMemo } from 'react';
import { DateFormat, USDcurrency } from 'utils/formatters';
import './AlertPanel.css';
import classes from './AlertPanel.module.css';

dayjs.extend(relativeTime);

enum TabsEnum {
  ALL = 'All',
  NEW = 'New',
  ARCHIVE = 'Archieve',
}

interface AlertEntryProps {
  alert: Alert;
  onClick: Function;
}

const AlertEntry = ({ alert, onClick }: AlertEntryProps) => {
  const date = DateFormat(alert.date);

  return (
    <div
      className={classes.alert_entry_container}
      style={{
        backgroundColor:
          alert.status === AlertStatus.NEW ? '#F0F6FF' : '#FFFFFF',cursor: 'pointer'
      }}
    >
      <div className={classes.alert_entry_vertical_center}>
        <Avatar src={Avatars.AVATAR6} size={'large'} />
        <div className={classes.alert_entry_left_side}>
          <p className='sub-title m-0'>{alert.name}</p>
          <p className={classes.alert_entry_value}>
            {USDcurrency.format(alert.value ?? 0)}
          </p>
        </div>
      </div>
      <div className={classes.alert_entry_right_side}>
        <span className='text-small gray-3'>{date}</span>
        <div className={classes.aler_panel_actions}>
          <div className={classes.line_stroke}/>
        <Close width={13} height={13} fill="blue" style={{ cursor: 'pointer' }}/>
        <ArrowRight width={13} height={13}  fill="blue" style={{ cursor: 'pointer' }}/>
        </div>
      </div>
    </div>
  );
};

interface AlertPanelProps extends DrawerProps {
  alerts: Alert[];
  onAlertEyeClick: Function;
}

const AlertPanel = ({
  alerts,
  onAlertEyeClick,
  ...drawerProps
}: AlertPanelProps) => {
  const groupedAlerts = useMemo(() => {
    const newAlerts: Alert[] = [];
    const archiveAlerts: Alert[] = [];
    alerts.forEach((alert) => {
      if (alert.status === AlertStatus.NEW) {
        newAlerts.push(alert);
      }
      if (alert.status === AlertStatus.ARCHIVE) {
        archiveAlerts.push(alert);
      }
    });
    return {
      newAlerts,
      archiveAlerts,
      all: alerts,
    };
  }, [alerts]);

  const items: TabsProps['items'] = [
    {
      key: TabsEnum.ALL,
      label: TabsEnum.ALL,
      children: (
        <>
          {groupedAlerts.all.map((alert) => {
            return (
              <AlertEntry
                key={alert.id}
                alert={alert}
                onClick={onAlertEyeClick}
              />
            );
          })}
        </>
      ),
    },
    {
      key: TabsEnum.NEW,
      label: TabsEnum.NEW,
      children: (
        <>
          {groupedAlerts.newAlerts.map((alert) => {
            return (
              <AlertEntry
                key={alert.id}
                alert={alert}
                onClick={onAlertEyeClick}
              />
            );
          })}
        </>
      ),
    },
    {
      key: TabsEnum.ARCHIVE,
      label: TabsEnum.ARCHIVE,
      children: (
        <>
          {groupedAlerts.archiveAlerts.map((alert) => {
            return (
              <AlertEntry
                key={alert.id}
                alert={alert}
                onClick={onAlertEyeClick}
              />
            );
          })}
        </>
      ),
    },
  ];

  return (
    <Drawer
      closable
      placement='right'
      width={700}
      {...drawerProps}
      bodyStyle={{ padding: '0px' }}
    >
      <div className={classes.alert_panel_header}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ margin: '0' }}>Alerts</h1>
        </div>
        <Close style={{ cursor: 'pointer' }} onClick={drawerProps.onClose} />
      </div>
      <Tabs centered items={items} />
    </Drawer>
  );
};

export default AlertPanel;
