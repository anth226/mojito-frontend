import { Avatar, Card, Empty } from 'antd';
import { ReactComponent as Eye } from 'assets/Icons/Eye.svg';
import { ReactComponent as SyncFailed } from 'assets/Icons/SyncFailed.svg';
import { ReactComponent as Synced } from 'assets/Icons/Synced.svg';
import dayjs from 'dayjs';
import ConnectionButton, {
  ConnectionBadgeButton,
  ConnectionBadgeButtonProps,
} from '../ConnectionButton/ConnectionButton';
import { ConnectionStatus } from 'enums/connections';
import { Connection } from 'interfaces/Connection';

interface ConnectionCardStatusDescriptionProps
  extends ConnectionBadgeButtonProps {}
const ConnectionCardStatusDescription = ({
  status,
}: ConnectionCardStatusDescriptionProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {status === ConnectionStatus.CONNECTED ? <Synced /> : <SyncFailed />}
      <span style={{ color: '#9A9AAF', margin: '0px 5px' }}>
        {status === ConnectionStatus.CONNECTED ? 'Synced on' : 'Sync failed on'}
      </span>
      <span>{dayjs().format('ddd, D YYYY | HH:mm')}</span>
    </div>
  );
};

// export interface ConnectionForCard {
//   status?: ConnectionStatus;
//   name: string;
//   avatar?: string;
//   cover?: string;
//   description?: string;
// }

export enum ButtonUI {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}
interface ConnectionCardProps {
  connection: Connection;
  onDetailClick?: Function;
  direction?: `${ButtonUI}`;
  description?: boolean;
  cover?: boolean;
  avatar?: boolean;
  statusDescription?: boolean;
  detailClickIcon?: boolean;
  onConnectButtonClick:
    | (React.MouseEventHandler<HTMLAnchorElement> &
        React.MouseEventHandler<HTMLButtonElement>)
    | undefined;
}

const ConnectionCard = ({
  connection,
  onDetailClick,
  direction,
  description = false,
  cover = false,
  avatar = false,
  statusDescription = false,
  detailClickIcon = false,
  onConnectButtonClick,
}: ConnectionCardProps) => {
  return (
    <Card
      bodyStyle={{ width: '385px', textAlign: 'initial' }}
      cover={
        cover ? (
          connection.cover ? (
            <img src={connection.cover} alt='' />
          ) : (
            <Empty
              description={<p>No Logo/Image Found</p>}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )
        ) : null
      }
    >
      {avatar && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '5px 0px 18px 0px',
          }}
        >
          <Avatar size={'large'} />
          {direction === ButtonUI.HORIZONTAL &&
            (connection.status === ConnectionStatus.NOT_CONNECTED ||
            !connection.status ? (
              <ConnectionButton onClick={onConnectButtonClick} />
            ) : (
              <ConnectionBadgeButton
                status={connection.status}
                onClick={onConnectButtonClick}
              />
            ))}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h4
          style={{
            fontSize: '16px',
            fontWeight: '600',
            marginTop: '0px',
            marginBottom: '8px',
          }}
        >
          {connection.name}
        </h4>
        {detailClickIcon && (
          <Eye
            style={{ width: '20px', height: '24px', cursor: 'pointer' }}
            onClick={() => onDetailClick && onDetailClick(connection)}
          />
        )}
      </div>
      {description && (
        <p
          style={{
            color: '#9A9AAF',
            margin: '-5px 0px 15px 0px',
            textAlign: 'left',
          }}
        >
          {connection.description ?? 'Short description'}
        </p>
      )}
      {statusDescription && (
        <ConnectionCardStatusDescription status={connection.status} />
      )}
      {direction === ButtonUI.VERTICAL &&
        (connection.status === ConnectionStatus.NOT_CONNECTED ||
        !connection.status ? (
          <ConnectionButton onClick={onConnectButtonClick} />
        ) : (
          <ConnectionBadgeButton
            status={connection.status}
            onClick={onConnectButtonClick}
          />
        ))}
    </Card>
  );
};

export default ConnectionCard;
