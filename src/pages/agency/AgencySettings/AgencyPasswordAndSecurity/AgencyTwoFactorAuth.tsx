import { ReactNode, useMemo, useState } from "react";
import classes from "./AgencyPasswordAndSecurity.module.css";
import CustomSwitch from "components/CustomSwitch/CustomSwitch";
import { Col, Input, Row, Select } from "antd";
import CountryList from "country-list-with-dial-code-and-flag";
import { CountryInterface } from "country-list-with-dial-code-and-flag/dist/types";
import CountryFlagSvg from "country-list-with-dial-code-and-flag/dist/flag-svg";

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

export const AgencyTwoFactorAuth = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);

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
    <div className={classes.box_content}>
      <div className={classes.content}>
        <div className={classes.header_content}>
          <h5 className={classes.header_title}>Two-factor authentification</h5>
          <CustomSwitch checked={false} />
        </div>
        <p className={classes.text}>
          Enable this will provide an extra layer of security for your account.
          When logging in or changing a password, we will ask for a special
          authentication code from SMS on your phone.{" "}
        </p>
        <Row>
          <Col span={8}>
            <label htmlFor="country_code">Country Code</label>
            <Select options={CountryListOptions} />
          </Col>
          <Col span={16}>
            <Input />
          </Col>
        </Row>
      </div>
    </div>
  );
};
