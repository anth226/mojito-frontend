import { ConnectionStatus, ConnectionType } from 'enums/connections';
import { Connection } from 'interfaces/Connection';
import cover1 from 'assets/covers/card1.png';
import cover2 from 'assets/covers/card2.png';
import cover3 from 'assets/covers/card3.png';

export const connections: Connection[] = [
  {
    status: ConnectionStatus.NOT_CONNECTED,
    type: ConnectionType.META,
    name: 'Meta',
    avatar: 'base64 Image',
    cover: cover1,
    key: 1,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    type: ConnectionType.GOOGLE,
    name: 'Google',
    avatar: 'base64 Image',
    cover: cover2,
    key: 2,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    type: ConnectionType.TIKTOK,
    name: 'Tiktok',
    avatar: 'base64 Image',
    cover: cover3,
    key: 3,
  },
];
