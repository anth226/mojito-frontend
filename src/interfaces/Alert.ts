import { AlertStatus } from 'enums/alerts';

export interface Alert {
  id: number;
  name: string;
  source: string;
  fires: number;
  clients: number;
  status: AlertStatus;
  date: Date;
  value: number;
  parameter: string;
  operation: string;
  connectionId?: string;
  severity?: string;
}

export const getAlertObject = () =>
  Object.create({
    id: 12312,
    name: 'No Ad Spend',
    source: 'Source name',
    parameter: 'If',
    operator: 'Is greater than',
    fired: 0,
    clients: 0,
    status: AlertStatus.NEW,
    date: new Date(),
    value: 0,
  });
