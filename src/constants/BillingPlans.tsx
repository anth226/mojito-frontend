import Bolt from 'assets/Icons/Bolt';
import MultiStack from 'assets/Icons/MultiStack';
import StacksIcon from 'assets/Icons/Stacks';
import { Tenure } from 'components/PlanCard/PlanCard';

export const plans = [
  {
    title: 'Starter plan',
    amount: 828,
    tenure: Tenure.YEARLY,
    description:
      'Includes up to 10 users, 20GB indiviual data and access to all features.',
    icon: StacksIcon,
  },
  {
    title: 'Professional plan',
    amount: 1788,
    tenure: Tenure.YEARLY,
    description:
      'Includes up to 20 users, 40GB indiviual data and access to all features.',
    icon: MultiStack,
  },
  {
    title: 'Scale plan',
    amount: 4428,
    tenure: Tenure.YEARLY,
    description:
      'Unlimited users, unlimited individual data and access to all features.',
    icon: Bolt,
  },
];
