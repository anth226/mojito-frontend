import { useEffect, useState } from 'react';
import {useStripe,useElements} from '@stripe/react-stripe-js';
import { useGraphQlQuery } from 'hooks/useCustomHookApollo';
import { GET_PLANS_LISTS } from 'api/graphql/queries';
import { useGraphQlMutation } from 'hooks/useCustomHookApollo';
import { CREATE_SUBSCRIPTION } from 'api/graphql/mutations';
import Bolt from 'assets/Icons/Bolt';
import PlanCard from 'components/PlanCard/PlanCard';
import classes from './Billing.module.css';
import { useBillingFormInstance } from 'components/BillingForm/BillingForm';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Tenure,Plan } from 'interfaces/billing';
import {
  getOnboardingFromStore,
  nested,
  next,
  setBilling,
  setBillingDetails,
  setBillingPlan,
  setBillingPlanObject,
  setLoading
} from 'reduxSlices/onboarding/onboarding';
import { AgencyOnBoardingPaths } from 'pages/paths';
import { toast } from 'react-toastify';
import Spinner from 'components/loaders/Spinner';

const AgencyOnBoardingBilling = () => {
   
   const stripe =useStripe();
   const elements =useElements()
   const [createSubscription] =useGraphQlMutation(CREATE_SUBSCRIPTION)

  const { billing, nestedSteps, nestedPath, prevStep,billingPlan } = useAppSelector(
    getOnboardingFromStore
  );
  const dispatch = useAppDispatch();

  const [menuItem, setMenuItem] = useState(1);

  const { BillingForm,cardElement} = useBillingFormInstance();

  const onClick = (index: number,plan:Plan) => {
    dispatch(setBillingPlan(index));
    dispatch(setBillingPlanObject(plan))
  };

 

  const {
    data: plansList,
    loading: isFetchPlans,
  } = useGraphQlQuery(GET_PLANS_LISTS);

  const onFinished = async (values: any) => {
    setLoading(true)
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
    
   const res= await createSubscription({variables:{input:input}})
  if(!res.data.createSubscription.success){
    toast.error(res.data.createSubscription.reason)
  }else{
    dispatch(setBillingDetails(values));
    dispatch(next());
  }
  setLoading(false)
    }
  
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
        {isFetchPlans&& (<Spinner/>)}
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
              tenure={plan.interval==="month"? Tenure.MONTHLY:Tenure.YEARLY}
              description={plan.description}
              selected={index === billing.plan}
              onClick={() => onClick(index,plan)}
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
