import { ClientRoles, ClientStatus } from "../enums/clients";

export interface Client {
  email: string;
  name: string;
  role?: ClientRoles;
  avatar?: string;
  surname?: string;
  value?: number;
  percentage?: number;
  connections?: string[];
  status?: ClientStatus;
}
export interface NewClient {
  name: string;
  surname: string;
  email: string;
  avatar: string;
  invited: boolean;
}