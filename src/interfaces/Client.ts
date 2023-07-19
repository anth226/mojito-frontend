import { ClientRoles, ClientStatus } from 'enums/clients';

interface Connection {
  connectionKey: string;
  connectionId: string;
  clientMutationId: string;
}
export interface Client {
  _id?: string;
  email: string;
  name: string;
  role?: ClientRoles;
  avatar?: string;
  surname?: string;
  value?: number;
  percentage?: number;
  connections?: Connection[];
  status?: ClientStatus;
}
export interface NewClient {
  name: string;
  surname: string;
  email: string;
  avatar: string;
  invited: boolean;
  role?: ClientRoles;
}
