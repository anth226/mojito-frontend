import { Row, Col, Button } from 'antd';
import classes from '../BillingSettings.module.css';
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
  const { BillingForm, FormInstance } = useBillingFormInstance();

  const onEdit = (values: any) => {
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
