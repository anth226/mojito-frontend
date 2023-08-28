export enum Tenure {
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
  }

export interface Plan {
    id: string;
    description:string
    amount: number;
    planName: string;
    currency: string;
    interval: string;
    trialPeriodDays: string;
    billingScheme: string;
  }