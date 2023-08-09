import { Col, Input, Row, Select } from 'antd';
import CustomSwitch from 'components/CustomSwitch/CustomSwitch';
import CountryList from 'country-list-with-dial-code-and-flag';
import CountryFlagSvg from 'country-list-with-dial-code-and-flag/dist/flag-svg';
import { CountryInterface } from 'country-list-with-dial-code-and-flag/dist/types';
import { ReactNode, useMemo, useState } from 'react';
import classes from './PasswordAndSecurity.module.css';

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

export const TwoFactorAuth = () => {
  const [checked, setChecked] = useState(false);

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

  const onChange = () => {
    setChecked(!checked);
  };

  return (
    <div className={classes.box_content}>
      <div className={classes.content}>
        <div className={classes.header_content}>
          <h5 className={classes.header_title}>Two-factor authentification</h5>
          <CustomSwitch checked={checked} onChange={onChange} />
        </div>
        <p className={classes.text}>
          Enable this will provide an extra layer of security for your account.
          When logging in or changing a password, we will ask for a special
          authentication code from SMS on your phone.{' '}
        </p>
        {checked && (
          <Row className={classes.box_form}>
            <Col span={6}>
              <label htmlFor='country_code' className={classes.select_label}>
                Country Code
              </label>
              <Select options={CountryListOptions} defaultValue={'+44'} />
            </Col>
            <Col span={18}>
              <label htmlFor='country_code' className={classes.select_label}>
                Country Code
              </label>
              <Input placeholder='Enter your phone' />
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};
