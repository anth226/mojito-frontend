import { Key } from 'react';
import { ConnectionStatus, ConnectionType } from '../enums/connections';

export interface Connection {
  _id?: string;
  status?:
    | ConnectionStatus.CONNECTED
    | ConnectionStatus.NOT_CONNECTED
    | ConnectionStatus.SYNC_FAILED;
  type: ConnectionType.GOOGLE | ConnectionType.META | ConnectionType.TIKTOK;
  name: string;
  avatar: string;
  cover: string;
  description?: string;
  key: Key;
}

export interface ConnectionClient {
  name: string;
  email: string;
  avatar?: string;
  status: ConnectionStatus;
  active: boolean;
}
