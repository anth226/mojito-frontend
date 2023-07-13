import { RouterProvider } from 'react-router-dom';
import './App.css';
import { BillingFormProvider } from './components/BillingForm/BillingForm';
import { routes } from './pages/routes';

function App() {
  return (
    <BillingFormProvider>
      <RouterProvider router={routes} />
    </BillingFormProvider>
  );
}

export default App;
