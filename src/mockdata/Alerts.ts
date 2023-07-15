import { AlertStatus } from 'enums/alerts';
import { Alert } from 'interfaces/Alert';

export const mockAlerts: Alert[] = [
  {
    id: '1',
    name: 'No Ad Spend',
    source: 'Source name',
    parameter: 'If',
    operation: 'Is greater than',
    clients: 12,
    date: new Date(),
    fires: 0,
    status: AlertStatus.NEW,
    value: 0,
  },
  {
    id: '2',
    name: 'No Ad Spend',
    source: 'Source name',
    parameter: 'If',
    operation: 'Is greater than',
    clients: 12,
    date: new Date(),
    fires: 0,
    status: AlertStatus.ARCHIVE,
    value: 0,
  },
  {
    id: '3',
    name: 'No Ad Spend',
    source: 'Source name',
    parameter: 'If',
    operation: 'Is greater than',
    clients: 12,
    date: new Date(),
    fires: 0,
    status: AlertStatus.NEW,
    value: 0,
  },
];
