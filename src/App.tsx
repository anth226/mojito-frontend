import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./pages/routes";
import { BillingFormProvider } from "./components/BillingForm/BillingForm";

function App() {
  return (
    <BillingFormProvider>
      <RouterProvider router={routes} />
    </BillingFormProvider>
  );
}

export default App;
