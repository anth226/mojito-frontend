import { useState } from 'react';
import { Col, Form, FormInstance, Input, Row, Select} from 'antd';
import {CardNumberElement,CardExpiryElement,CardCvcElement} from "@stripe/react-stripe-js"
import CountryList from 'country-list-with-dial-code-and-flag';
import CountryFlagSvg from 'country-list-with-dial-code-and-flag/dist/flag-svg';
import { CountryInterface } from 'country-list-with-dial-code-and-flag/dist/types';
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from 'react';
import classes from './BillingForm.module.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useAppSelector } from 'app/hooks';
import { getOnboardingFromStore } from 'reduxSlices/onboarding/onboarding';


dayjs.extend(customParseFormat);

interface extrasInterface extends CountryInterface {
  svg: string;
}

interface getCountryCodeWithFlagArguments {
  value: number | string;
  label: ReactNode;
  extras: extrasInterface;
}

const getCountryCodeWithFlag = ({
  value,
  label,
  extras,
}: getCountryCodeWithFlagArguments) => {
  return {
    value: value,
    label: (
      <div className={classes.select_label}>
        <div
          className={classes.svg}
          dangerouslySetInnerHTML={{ __html: extras.svg }}
        />
        {label}
      </div>
    ),
  };
};

export interface BillingFields {
  card_number: string;
  card_expiration: string;
  card_cvv: string;
  name?: string;
  email?: string;
  country_code?: string;
  phone?: string;
  street: string;
  apt_suit_number: string;
  region: string;
  state: string;
  city: string;
  zip_code: string;
}

const BillingFormContext = createContext<FormInstance<BillingFields> | null>(
  null
);

export const BillingFormProvider = ({ children }: PropsWithChildren) => {
  const [formInstance] = Form.useForm<BillingFields>();

  return (
    <BillingFormContext.Provider value={formInstance}>
      {children}
    </BillingFormContext.Provider>
  );
};


export const useBillingFormInstance = () => {
  const billingFormInstance = useContext(BillingFormContext);
  return {
    BillingForm: ({
      onFinished,
    }: {
      onFinished: ((values: any) => void) | undefined;
    }) => (
      <BillingForm
        formInstance={billingFormInstance as FormInstance}
        onFinished={onFinished}

      />
    ),
    FormInstance: billingFormInstance,
    cardElement:CardNumberElement
  };
};

interface BillingFormProps {
  formInstance?: FormInstance<BillingFields>;
  onFinished?: ((values: any) => void) | undefined;
}

const BillingForm = ({ formInstance, onFinished}: BillingFormProps) => {
  const billing = useAppSelector(getOnboardingFromStore).billing.billingDetails;
  const [cardError, setCardError] = useState(null);
  const [cvvError, setCvvError] = useState(null);
  const [expiryError, setExpiryError] = useState(null);

  const CountryListOptions = useMemo(() => {
    const temp = CountryList.getAll()
      .filter((country, index, arr) => {
        return (
          arr.findIndex((contry) => contry.dial_code === country.dial_code) ===
          index
        );
      })
      .sort(
        (prevCountry, currentCountry) =>
          Number(prevCountry.dialCode) - Number(currentCountry.dialCode)
      )
      .map((country) => {
        return getCountryCodeWithFlag({
          value: country.dial_code,
          label: country.dial_code,
          extras: {
            svg: CountryFlagSvg[country.code],
            name: country.name,
            dial_code: country.dial_code,
            code: country.code,
            flag: country.flag,
            preferred: country.preferred,
            secondary: country.secondary,
            area_codes: country.areaCodes,
            country_code: country.countryCode,
          },
        });
      });
    return temp;
  }, []);

  const onCardChange = (e:any) => {
    setCardError(null)
    if(e.error){
      setCardError(e.error.message)
    }
  }
  const onCvvChange = (e:any) => {
    setCvvError(null)
    console.log(e.error)
    if(e.error){
      setCvvError(e.error.message)
    }
  }
  const onExpiryChange = (e:any) => {
    if(e.error){
      setExpiryError(e.error.message)
    }
  }

  const ElementOptions = {
    style: {
      base: {
        fontSize: '14px',
        color: 'rgba(0, 0, 0, 0.88)',
        '::placeholder': {
          color: '#fff',
        },
      },
      invalid: {
        color: 'rgba(0, 0, 0, 0.88)',
      },
    },
  };

  return (
    <Form
      layout='vertical'
      form={formInstance}
      onFinish={onFinished}
      className={classes.form}
      initialValues={billing}
    >
      <Row gutter={[16, 0]}>
        <Col span={24}>
          <p className={classes.billing_details}>Billing details</p>
        </Col>
        <Col span={24}>
          <Form.Item
            className={classes.label}
            label='Card number'
            name={'card_number'}
            validateStatus={cardError ? cardError : ''}
            rules={[
              {
                required: true,
                message: 'Please enter card Number!',
              },
            ]}
            help={cardError && <div className='ant-form-item-explain-error' >{cardError}</div>}
            
          >
            <CardNumberElement 
            className={`${classes.element_number_input} ${cardError?classes.error_border:classes.normal_border}`} 
            onChange={onCardChange} options={ElementOptions}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className={classes.label}
            label='Expiration (MM/YY)'
            name={'card_expiration'}
            validateStatus={expiryError ? expiryError : ''}
            help={expiryError && <div className='ant-form-item-explain-error' >{expiryError}</div>}
            rules={[
              {
                required: true,
                message: 'Please enter card expiration!',
              },
              
            ]}
           
          >
            <CardExpiryElement onChange={onExpiryChange} className={`${classes.element_number_input} ${expiryError?classes.error_border:classes.normal_border}`}  options={ElementOptions} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className={classes.label}
            label='CVV'
            name={'card_cvv'}
            validateStatus={cvvError ? cvvError : ''}
            help={cvvError && <div className='ant-form-item-explain-error' >{cvvError}</div>}
            rules={[
              {
                required: true,
                message: 'Please enter card cvv!',
              },
            ]}
          >
            <CardCvcElement onChange={onCvvChange} options={ElementOptions}  className={`${classes.element_number_input} ${cvvError?classes.error_border:classes.normal_border}`}  />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item className={classes.label} label='Name' name={'name'}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item className={classes.label} label='Email' name={'email'}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            className={classes.label}
            label='Country Code'
            name={'country_code'}
          >
            <Select options={CountryListOptions} />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item className={classes.label} label='Phone' name={'phone'}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={24}>
          <p className={classes.billing_address}>Billing address</p>
        </Col>

        <Col span={24}>
          <Form.Item
            className={classes.label}
            label='Street'
            name={'street'}
            rules={[
              {
                required: true,
                message: 'Please enter street!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            className={classes.label}
            label='Apt or suite number (optional)'
            name={'apt_suit_number'}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            className={classes.label}
            label='Country/region'
            name={'region'}
            rules={[
              {
                required: true,
                message: 'Please enter Country/region*!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            className={classes.label}
            label='State'
            name={'state'}
            rules={[
              {
                required: true,
                message: 'Please enter state!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            className={classes.label}
            label='City'
            name={'city'}
            rules={[
              {
                required: true,
                message: 'Please enter city!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            className={classes.label}
            label='Zip code'
            name={'zip_code'}
            rules={[
              {
                required: true,
                message: 'Please enter zip code!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default BillingForm;
