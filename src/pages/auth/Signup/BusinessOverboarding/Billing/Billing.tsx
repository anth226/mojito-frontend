import { useEffect, useState } from 'react';
import { GET_PLANS_LISTS } from 'api/graphql/queries';
import { useGraphQlQuery,useGraphQlMutation } from 'hooks/useCustomHookApollo';
import {useStripe,useElements} from '@stripe/react-stripe-js';
import PlanCard from 'components/PlanCard/PlanCard';
import classes from './Billing.module.css';
import { useBillingFormInstance } from 'components/BillingForm/BillingForm';
import { CREATE_SUBSCRIPTION } from 'api/graphql/mutations';
import { useAppDispatch, useAppSelector, } from 'app/hooks';
import {
  getOnboardingFromStore,
  nested,
  next,
  setBilling,
  setBillingDetails,
  setBillingPlan,
  setBillingPlanObject
} from 'reduxSlices/onboarding/onboarding';
import { BusinessOnBoardingPaths } from 'pages/paths';
import Bolt from 'assets/Icons/Bolt';

const BusinessOnBoardingBilling = () => {

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

  const stripe =useStripe();
  const elements =useElements()
  const [createSubscription] =useGraphQlMutation(CREATE_SUBSCRIPTION,{
    onError(error) {
  }})

  const { billing, nestedSteps, nestedPath, prevStep, billingPlan } = useAppSelector(
    getOnboardingFromStore
  );
  const dispatch = useAppDispatch();

  const [menuItem, setMenuItem] = useState(1);

  const { BillingForm,cardElement } = useBillingFormInstance();

  const onClick = (index: number,plan:Plan) => {
    dispatch(setBillingPlan(index));
    dispatch(setBillingPlanObject(plan))
  };

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
        billingPlan:billingPlan?.planName,
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
    dispatch(setBilling({ set: prevStep === 1 ? false : true }));
    dispatch(nested(BusinessOnBoardingPaths.BILLING));
    return () => {
      dispatch(nested(''));
    };
  }, [dispatch, prevStep]);

  const {
    data: plansList,
    loading: isFetchPlans,
  } = useGraphQlQuery(GET_PLANS_LISTS);

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
            onClick={() => onClick(index,plan)}
            Icon={Bolt}
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
