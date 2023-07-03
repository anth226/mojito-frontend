import { Connections } from '../assets/base64Icons';
import { ClientBadgeProps } from '../components/ClientBadge/ClientBadge';
import { ConnectionStatus, ConnectionType } from '../enums/connections';
import { Connection } from '../interfaces/Connection';
import { mockClients } from './Client';
import cover1 from '../assets/covers/card1.png';
import cover2 from '../assets/covers/card2.png';
import cover3 from '../assets/covers/card3.png';

const mockConnections: Connection[] = [
  {
    status: ConnectionStatus.CONNECTED,
    type: ConnectionType.TIKTOK,
    name: 'TikTok',
    avatar: Connections.TIKTOK,
    cover: cover1,
    key: 1,
  },
  {
    status: ConnectionStatus.CONNECTED,
    type: ConnectionType.GOOGLE,
    name: 'Google Ads',
    avatar: Connections.GOOGLE_ADS,
    cover: cover2,
    key: 2,
  },
  {
    status: ConnectionStatus.CONNECTED,
    type: ConnectionType.META,
    name: 'Meta',
    avatar: Connections.META,
    cover: cover3,
    key: 3,
  },
];

export const recentClients: ClientBadgeProps[] = (() => {
  const temp: ClientBadgeProps[] = [];
  for (let i = 0; i < 3; i++) {
    temp.push({
      ...mockClients[i],
      date: 'Date',
      connections: mockConnections,
    });
  }
  return temp;
})();
