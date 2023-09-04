import { Row, Col, Button } from 'antd';
import classes from '../BillingSettings.module.css';
import {useStripe,useElements} from '@stripe/react-stripe-js';
import { useGraphQlMutation } from 'hooks/useCustomHookApollo';
import { UPDATE_BILLING_DETAILS } from 'api/graphql/mutations';
import {
  BillingFields,
  useBillingFormInstance,
} from 'components/BillingForm/BillingForm';
import Modal from 'antd/es/modal/Modal';
import { Fragment, useState } from 'react';

interface BillingDetailsObject {
  label: string;
  value: string;
}

interface BillingDetailsProps {
  billingDetails: BillingDetailsObject[];
  billingDetailsForm: BillingFields;
}

const BillingDetails = ({
  billingDetails,
  billingDetailsForm,
}: BillingDetailsProps) => {
  const [openModal, setOpenModal] = useState<false | true>(false);
  const { BillingForm, FormInstance,cardElement  } = useBillingFormInstance();
  const stripe =useStripe();
  const elements =useElements()
  const [updateBillingDetails] =useGraphQlMutation(UPDATE_BILLING_DETAILS)
  const onEdit = async (values: any) => {
    if (!stripe) 
      {
        return "";
      }
      const card = elements?.getElement(cardElement);
      if (!card) {
        return;
      }
      const {token}= await stripe?.createToken(card)
      const input={
        name:values.name,
        email:values.email,
        country_code:values.country_code,
        phone: values.phone,
        street: values.region,
        apt_suit_number:values.apt_suit_number,
        region: values.region,
        state: values.state,
        city: values.city,
        zip_code: values.zip_code,

    }
    const res =await updateBillingDetails({variables:{input:input}})
      
    console.log(values);
    setOpenModal(false);
  };

  return (
    <>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Row gutter={[0, 16]} justify={'space-between'}>
            <Col>
              <h3>Billing Details</h3>
            </Col>
            <Col
              style={{
                color: '#0062FF',
                cursor: 'pointer',
              }}
            >
              <h4
                onClick={() => {
                  setOpenModal(true);
                  FormInstance?.setFieldsValue(billingDetailsForm);
                }}
              >
                Edit
              </h4>
            </Col>
          </Row>
        </Col>
        {billingDetails.map((description, index) => {
          return (
            <Fragment key={index}>
              <Col span={12} className={classes.description}>
                {description.label}
              </Col>
              <Col span={12} className={classes.description_value}>
                {description.value}
              </Col>
            </Fragment>
          );
        })}
      </Row>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={[
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>,
          <Button type='primary' onClick={() => FormInstance?.submit()}>
            Save
          </Button>,
        ]}
      >
        <BillingForm onFinished={onEdit} />
      </Modal>
    </>
  );
};

export default BillingDetails;
