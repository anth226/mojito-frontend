import { Col, Form, FormInstance, Input, Row, Select } from "antd";
import CountryList from "country-list-with-dial-code-and-flag";
import CountryFlagSvg from "country-list-with-dial-code-and-flag/dist/flag-svg";
import { CountryInterface } from "country-list-with-dial-code-and-flag/dist/types";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from "react";
import classes from "./BillingForm.module.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const VisaCardRegex = "^4[0-9]{12}(?:[0-9]{3})?$";
const MasterCardRegex =
  "^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$";

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
  };
};

interface BillingFormProps {
  formInstance?: FormInstance<BillingFields>;
  onFinished?: ((values: any) => void) | undefined;
}

const BillingForm = ({ formInstance, onFinished }: BillingFormProps) => {
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

  return (
    <Form
      layout="vertical"
      form={formInstance}
      onFinish={onFinished}
      className={classes.form}
    >
      <Row gutter={[16, 0]}>
        <Col span={24}>
          <p className={classes.billing_details}>Billing details</p>
        </Col>
        <Col span={24}>
          <Form.Item
            className={classes.label}
            label="Card number"
            name={"card_number"}
            rules={[
              {
                required: true,
                message: "Please enter card number!",
              },
              {
                pattern: new RegExp(`${VisaCardRegex}|${MasterCardRegex}`),
                message: "This is not a valid card",
                transform(value) {
                  return value.replaceAll(" ", "");
                },
              },
            ]}
            normalize={(value) => {
              const sanitize = Array.from(value.replaceAll(" ", ""));
              let str = "";
              for (let i = 0; i < sanitize.length; i++) {
                if (i % 4 === 0 && i !== 0) {
                  str += " " + sanitize[i];
                } else {
                  str += sanitize[i];
                }
              }
              return str;
            }}
          >
            <Input maxLength={19} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className={classes.label}
            label="Expiration (MM/YY)"
            name={"card_expiration"}
            rules={[
              {
                required: true,
                message: "Please enter card expiration!",
              },
              {
                validator(_rule, value) {
                  if (value !== "") {
                    const split = value.split("/");
                    if (Number(split[0]) > 12) {
                      return Promise.reject(new Error("Invalid Month"));
                    }
                    const enteredDate = dayjs(value, "MM/YY");
                    if (dayjs().isBefore(enteredDate)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(new Error("Date is not Valid"));
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
            normalize={(value) => {
              const sanitize = Array.from(value.replaceAll("/", ""));
              let str = "";
              for (let i = 0; i < sanitize.length; i++) {
                if (i % 2 === 0 && i !== 0) {
                  str += "/" + sanitize[i];
                } else {
                  str += sanitize[i];
                }
              }
              return str;
            }}
          >
            <Input maxLength={5} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className={classes.label}
            label="CVV"
            name={"card_cvv"}
            rules={[
              {
                required: true,
                message: "Please enter card cvv!",
              },
            ]}
            normalize={(value, prevValue) => {
              if (value === "") {
                return value;
              }
              return Number(value) ? value : prevValue;
            }}
          >
            <Input maxLength={3} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item className={classes.label} label="Name" name={"name"}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item className={classes.label} label="Email" name={"email"}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            className={classes.label}
            label="Country Code"
            name={"country_code"}
          >
            <Select options={CountryListOptions} />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item className={classes.label} label="Phone" name={"phone"}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={24}>
          <p className={classes.billing_address}>Billing address</p>
        </Col>

        <Col span={24}>
          <Form.Item
            className={classes.label}
            label="Street"
            name={"street"}
            rules={[
              {
                required: true,
                message: "Please enter street!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            className={classes.label}
            label="Apt or suite number (optional)"
            name={"apt_suit_number"}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            className={classes.label}
            label="Country/region"
            name={"region"}
            rules={[
              {
                required: true,
                message: "Please enter Country/region*!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            className={classes.label}
            label="State"
            name={"state"}
            rules={[
              {
                required: true,
                message: "Please enter state!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            className={classes.label}
            label="City"
            name={"city"}
            rules={[
              {
                required: true,
                message: "Please enter city!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            className={classes.label}
            label="Zip code"
            name={"zip_code"}
            rules={[
              {
                required: true,
                message: "Please enter zip code!",
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
