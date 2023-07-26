import { AlertStatus } from 'enums/alerts';

export interface Alert {
  id: string;
  name: string;
  source: string;
  fires: number;
  clients: any;
  status: AlertStatus;
  date: Date | string;
  value: number;
  parameter: string;
  operation: string;
  connectionId?: string;
  severity?: string;
}

export interface AlertForm {
  value: string;
  severity: string;
  parameter: string;
  operation: string;
  name: string;
  clientMutationId: string | null;
  clientIds: string[];
  alertId?: string;
}
