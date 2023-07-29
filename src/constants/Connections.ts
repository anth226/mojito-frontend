import { ConnectionStatus, ConnectionType } from 'enums/connections';
import { Connection } from 'interfaces/Connection';
import cover1 from 'assets/covers/card1.png';
import cover2 from 'assets/covers/card2.png';
import cover3 from 'assets/covers/card3.png';
import { Connections } from 'assets/base64Icons';

export const connections: Connection[] = [
  {
    status: ConnectionStatus.NOT_CONNECTED,
    type: ConnectionType.META,
    name: 'Meta',
    avatar: Connections.META,
    cover: cover1,
    key: 1,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    type: ConnectionType.GOOGLE,
    name: 'Google',
    avatar: Connections.GOOGLE,
    cover: cover2,
    key: 2,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    type: ConnectionType.TIKTOK,
    name: 'Tiktok',
    avatar: Connections.TIKTOK,
    cover: cover3,
    key: 3,
  },
];
