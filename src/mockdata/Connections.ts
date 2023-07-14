import { ConnectionStatus, ConnectionType } from 'enums/connections';
import { Connection } from 'interfaces/Connection';
import cover1 from 'assets/covers/card1.png';
import cover2 from 'assets/covers/card2.png';
import cover3 from 'assets/covers/card3.png';

export const otherConnectionList: Connection[] = [
  {
    status: ConnectionStatus.NOT_CONNECTED,
    type: ConnectionType.META,
    name: 'Asana',
    avatar: 'base64 Image',
    cover: cover1,
    key: 1,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    type: ConnectionType.META,
    name: 'Grammarly',
    avatar: 'base64 Image',
    cover: cover2,
    key: 2,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    type: ConnectionType.META,
    name: 'Random',
    avatar: 'base64 Image',
    cover: cover3,
    key: 3,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    type: ConnectionType.META,
    name: 'Grammarly',
    avatar: 'base64 Image',
    cover: cover2,
    key: 4,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    type: ConnectionType.META,
    name: 'Random',
    avatar: 'base64 Image',
    cover: cover3,
    key: 5,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    type: ConnectionType.META,
    name: 'Random',
    avatar: 'base64 Image',
    cover: cover3,
    key: 6,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    type: ConnectionType.META,
    name: 'Random',
    avatar: 'base64 Image',
    cover: cover3,
    key: 7,
  },
  {
    status: ConnectionStatus.NOT_CONNECTED,
    type: ConnectionType.META,
    name: 'Random',
    avatar: 'base64 Image',
    cover: cover3,
    key: 8,
  },
];

export const connectionList: Connection[] = [
  {
    status: ConnectionStatus.SYNC_FAILED,
    type: ConnectionType.META,
    name: 'Source Name',
    avatar: 'base64 Image',
    cover: cover1,
    key: 1,
  },
  {
    status: ConnectionStatus.SYNC_FAILED,
    type: ConnectionType.META,
    name: 'Source Name',
    avatar: 'base64 Image',
    cover: cover1,
    key: 2,
  },
  {
    status: ConnectionStatus.CONNECTED,
    type: ConnectionType.META,
    name: 'Source Name',
    avatar: 'base64 Image',
    cover: cover1,
    key: 3,
  },
  {
    status: ConnectionStatus.CONNECTED,
    type: ConnectionType.META,
    name: 'Source Name',
    avatar: 'base64 Image',
    cover: cover1,
    key: 4,
  },
  {
    status: ConnectionStatus.CONNECTED,
    type: ConnectionType.META,
    name: 'Source Name',
    avatar: 'base64 Image',
    cover: cover1,
    key: 5,
  },
];
