import { AlertStatus } from '../enums/alerts';
import { Alert } from '../interfaces/Alert';

export const mockAlerts: Alert[] = [
  {
    id: 1,
    name: 'No Ad Spend',
    source: 'Source name',
    parameter: 'If',
    operation: 'Is greater than',
    clients: 12,
    date: new Date(),
    fired: 0,
    status: AlertStatus.NEW,
    value: 0,
  },
  {
    id: 2,
    name: 'No Ad Spend',
    source: 'Source name',
    parameter: 'If',
    operation: 'Is greater than',
    clients: 12,
    date: new Date(),
    fired: 0,
    status: AlertStatus.ARCHIVE,
    value: 0,
  },
  {
    id: 3,
    name: 'No Ad Spend',
    source: 'Source name',
    parameter: 'If',
    operation: 'Is greater than',
    clients: 12,
    date: new Date(),
    fired: 0,
    status: AlertStatus.NEW,
    value: 0,
  },
];

export const parameters = [
  {
    value: 'If',
    label: 'If',
  },
];

export const operators = [
  {
    value: 'Is less than',
    label: 'Is less than',
  },
  {
    value: 'Is greater than',
    label: 'Is greater than',
  },
];

export const mathValues = [
  {
    value: 'LESS_THAN',
    label: 'Less Than',
  },
  {
    value: 'GREATER_THAN',
    label: 'Greater Than',
  },
  {
    value: 'EQUAL',
    label: 'Equal',
  },
];
export const actions = [
  {
    value: 'Then',
    label: 'Then',
  },
  {
    value: 'Before',
    label: 'Before',
  },
];
