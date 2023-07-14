import { Button, ButtonProps } from 'antd';
import { ReactComponent as ConnectionIcon } from 'assets/Icons/ConnectionIcon.svg';
import { ReactComponent as Reconnect } from 'assets/Icons/Reconnect.svg';
import { ConnectionStatus } from 'enums/connections';
import classes from './ConnectionButton.module.css';

const ConnectionButton = (buttonProps: ButtonProps) => {
  return (
    <Button
      icon={<ConnectionIcon />}
      shape={'round'}
      className={classes.connection_button}
      {...buttonProps}
    >
      Connect
    </Button>
  );
};

export default ConnectionButton;

interface ConnectionBadgeColorsInterface {
  CONNECTED: ConnectionBadgeColorObject;
  SYNC_FAILED: ConnectionBadgeColorObject;
}

interface ConnectionBadgeColorObject {
  value: ConnectionStatus;
  background: string;
  color: string;
}

const ConnectionBadgeColors: ConnectionBadgeColorsInterface = {
  CONNECTED: {
    value: ConnectionStatus.CONNECTED,
    background: '#ECFDF3',
    color: '#3DD598',
  },
  SYNC_FAILED: {
    value: ConnectionStatus.SYNC_FAILED,
    background: '#FFD9641A',
    color: '#FE7E07',
  },
};

export interface ConnectionBadgeButtonProps extends ButtonProps {
  status?: ConnectionStatus;
  borderColor?: string;
  backgroundColor?: string;
  color?: string;
}

export const ConnectionBadgeButton = ({
  status,
  style,
  borderColor,
  backgroundColor,
  color,
  ...buttonProps
}: ConnectionBadgeButtonProps) => {
  return (
    <Button
      icon={status === ConnectionStatus.CONNECTED ? '' : <Reconnect />}
      shape={'round'}
      className={classes.connection_badge_button}
      style={{
        borderColor: borderColor
          ? borderColor
          : status === ConnectionStatus.CONNECTED
          ? ConnectionBadgeColors.CONNECTED.color
          : ConnectionBadgeColors.SYNC_FAILED.color,

        background: backgroundColor
          ? backgroundColor
          : status === ConnectionStatus.CONNECTED
          ? ConnectionBadgeColors.CONNECTED.background
          : ConnectionBadgeColors.SYNC_FAILED.background,
        color: color
          ? color
          : status === ConnectionStatus.CONNECTED
          ? ConnectionBadgeColors.CONNECTED.color
          : ConnectionBadgeColors.SYNC_FAILED.color,
        ...style,
      }}
      {...buttonProps}
    >
      {status === ConnectionStatus.CONNECTED ? 'Connected' : 'Reconnect'}
    </Button>
  );
};

export const ConnectionBadge = ({ status }: ConnectionBadgeButtonProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid',
        borderColor:
          status === ConnectionStatus.CONNECTED
            ? ConnectionBadgeColors.CONNECTED.color
            : ConnectionBadgeColors.SYNC_FAILED.color,

        borderRadius: '1000px',
        padding: '4px 20px',
        background:
          status === ConnectionStatus.CONNECTED
            ? ConnectionBadgeColors.CONNECTED.background
            : ConnectionBadgeColors.SYNC_FAILED.background,
      }}
    >
      {status === ConnectionStatus.CONNECTED ? (
        ''
      ) : (
        <Reconnect
          style={{ marginRight: '13px', width: '12px', height: '12px' }}
        />
      )}
      <span
        style={{
          fontSize: '12px',
          fontWeight: '300',
          color:
            status === ConnectionStatus.CONNECTED
              ? ConnectionBadgeColors.CONNECTED.color
              : ConnectionBadgeColors.SYNC_FAILED.color,
        }}
      >
        {status === ConnectionStatus.CONNECTED ? 'Connected' : 'Reconnect'}
      </span>
    </div>
  );
};
