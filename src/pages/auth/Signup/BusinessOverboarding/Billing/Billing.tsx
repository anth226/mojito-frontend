import { useEffect, useState } from "react";
import PlanCard from "../../../../../components/PlanCard/PlanCard";
import classes from "./Billing.module.css";
import { useBillingFormInstance } from "../../../../../components/BillingForm/BillingForm";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import {
  getOnboardingFromStore,
  nested,
  next,
  setBilling,
  setBillingPlan,
} from "../../../../../reduxSlices/onboarding/onboarding";
import { BusinessOnBoardingPaths } from "../../../../paths";
import { plans } from "../../../../../constants/BillingPlans";

const BusinessOnBoardingBilling = () => {
  const { billing, nestedSteps, nestedPath, prevStep } = useAppSelector(
    getOnboardingFromStore
  );
  const dispatch = useAppDispatch();

  const [menuItem, setMenuItem] = useState(1);

  const { BillingForm } = useBillingFormInstance();

  const onClick = (index: number) => {
    dispatch(setBillingPlan(index));
  };

  const onFinished = (values: any) => {
    dispatch(next());
  };

  useEffect(() => {
    dispatch(setBilling({ set: prevStep === 1 ? false : true }));
    dispatch(nested(BusinessOnBoardingPaths.BILLING));
    return () => {
      dispatch(nested(""));
    };
  }, [dispatch, prevStep]);

  return (
    <>
      <div>
        <h1 style={{ margin: "0px" }}>Billing</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className={classes.center}>
        {nestedSteps === 0 && (
          <div className={classes.billing_menu}>
            <span
              style={{
                color: menuItem === 0 ? "#FFFFFF" : "#0062FF",
                backgroundColor: menuItem === 0 ? "#0062FF" : "#FFFFFF",
              }}
              className={classes.billing_menu_button}
              onClick={() => setMenuItem(0)}
            >
              <b>Billed monthly</b>
            </span>
            <span
              style={{
                color: menuItem === 1 ? "#FFFFFF" : "#0062FF",
                backgroundColor: menuItem === 1 ? "#0062FF" : "#FFFFFF",
              }}
              className={classes.billing_menu_button}
              onClick={() => setMenuItem(1)}
            >
              <b>Billed annually</b>
            </span>
          </div>
        )}
      </div>
      <div style={{ display: "grid", gap: "10px" }}>
        {plans.map((plan, index) => {
          if (
            billing.plan !== -1 &&
            billing.plan !== index &&
            nestedSteps !== 0
          ) {
            return null;
          }
          return (
            <PlanCard
              key={index}
              title={plan.title}
              amount={plan.amount}
              tenure={plan.tenure}
              description={plan.description}
              selected={index === billing.plan}
              onClick={() => onClick(index)}
              Icon={plan.icon}
            />
          );
        })}
      </div>
      {nestedPath === BusinessOnBoardingPaths.BILLING && nestedSteps === 1 && (
        <BillingForm onFinished={onFinished} />
      )}
    </>
  );
};

export default BusinessOnBoardingBilling;
