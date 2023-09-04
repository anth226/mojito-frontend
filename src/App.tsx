import { RouterProvider } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { STRIPE_PUBLIC_KEY } from 'configs/env';
import './App.css';
import { BillingFormProvider } from './components/BillingForm/BillingForm';
import { routes } from './pages/routes';

function App() {
  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  return (
    <BillingFormProvider>
       <Elements stripe={stripePromise}>
      <RouterProvider router={routes} />
      </Elements>
    </BillingFormProvider>
  );
}

export default App;
