import { useEffect, useState } from 'react';
import { useGraphQlQuery } from 'hooks/useCustomHookApollo';
import { GET_PLANS_LISTS } from 'api/graphql/queries';
import {useStripe,useElements} from '@stripe/react-stripe-js';
import { useGraphQlMutation } from 'hooks/useCustomHookApollo';
import { CREATE_SUBSCRIPTION } from 'api/graphql/mutations';
import Bolt from 'assets/Icons/Bolt';
import PlanCard from 'components/PlanCard/PlanCard';
import classes from './Billing.module.css';
import { useBillingFormInstance } from 'components/BillingForm/BillingForm';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getOnboardingFromStore,
  nested,
  next,
  setBilling,
  setBillingDetails,
  setBillingPlan,
  setBillingPlanObject
} from 'reduxSlices/onboarding/onboarding';
import { AgencyOnBoardingPaths } from 'pages/paths';

const AgencyOnBoardingBilling = () => {
   
   const stripe =useStripe();
   const elements =useElements()
   const [createSubscription] =useGraphQlMutation(CREATE_SUBSCRIPTION,{
    onError(error) {
    console.log(error);
  }})

  const { billing, nestedSteps, nestedPath, prevStep,billingPlan } = useAppSelector(
    getOnboardingFromStore
  );
  const dispatch = useAppDispatch();

  const [menuItem, setMenuItem] = useState(1);

  const { BillingForm,cardElement} = useBillingFormInstance();

  const onClick = (index: number,id:string) => {
    dispatch(setBillingPlan(index));
    dispatch(setBillingPlanObject(id))
  };

  enum Tenure {
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
  }

   interface Plan {
    id: string;
    amount: number;
    planName: string;
    currency: string;
    internal: string;
    trialPeriodDays: string;
    billingScheme: string;
  }

  const {
    data: plansList,
    loading: isFetchPlans,
  } = useGraphQlQuery(GET_PLANS_LISTS);

  const onFinished = async (values: any) => {
    if (!stripe) 
      {
        return "";
      }
    const card = elements?.getElement(cardElement);
    if (!card) {
      return;
    }
    const {token}= await stripe?.createToken(card)
    if(token){
    const input={
        billingPlan:billingPlan?.id,
        cardBrand:token.card?.brand,
        source:token.id,
        name:values.name,
        email:values.email,
        priceId:billingPlan?.id,
        quantity:15,
        country_code:values.country_code,
        phone: values.phone,
        street: values.region,
        apt_suit_number:values.apt_suit_number,
        region: values.region,
        state: values.state,
        city: values.city,
        zip_code: values.zip_code,
        expiry:`${token.card?.exp_month}/${token.card?.exp_year}`,
        card: token.card?.last4

    }
    
    await createSubscription({variables:{input:input}})
    }
    
   
    dispatch(setBillingDetails(values));
    dispatch(next());
  };

  useEffect(() => {
    dispatch(setBilling({ set: prevStep === 3 ? false : true }));
    dispatch(nested(AgencyOnBoardingPaths.BILLING));
    return () => {
      dispatch(nested(''));
    };
  }, [dispatch, prevStep]);

  return (
    <>
      <div>
        <h1 style={{ margin: '0px' }}>Billing</h1>
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
                color: menuItem === 0 ? '#FFFFFF' : '#0062FF',
                backgroundColor: menuItem === 0 ? '#0062FF' : '#FFFFFF',
              }}
              className={classes.billing_menu_button}
              onClick={() => setMenuItem(0)}
            >
              <b>Billed monthly</b>
            </span>
            <span
              style={{
                color: menuItem === 1 ? '#FFFFFF' : '#0062FF',
                backgroundColor: menuItem === 1 ? '#0062FF' : '#FFFFFF',
              }}
              className={classes.billing_menu_button}
              onClick={() => setMenuItem(1)}
            >
              <b>Billed annually</b>
            </span>
          </div>
        )}
      </div>
      <div style={{ display: 'grid', gap: '10px' }}>

        {!isFetchPlans&&plansList.fetchPlans.plans.map((plan:Plan, index:number) => {
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
              title={plan.planName}
              amount={plan.amount}
              tenure={plan.internal==="month"? Tenure.MONTHLY:Tenure.YEARLY}
              description={"Includes up to 10 users, 20GB indiviual data and access to all features."}
              selected={index === billing.plan}
              onClick={() => onClick(index,plan.id)}
              Icon={Bolt}
            />
          );
        })}
      </div>
      {nestedPath === AgencyOnBoardingPaths.BILLING && nestedSteps === 1 && (
        <BillingForm onFinished={onFinished}  />

      )}
    </>
  );
};

export default AgencyOnBoardingBilling;
