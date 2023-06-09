import { Col, Row } from "antd";
import classes from "../AgencyBillingSettings.module.css";
import { Fragment } from "react";

interface AccountSummaryObject {
  label: string;
  value: string;
}

interface AccountSummaryProps {
  accountSummary: AccountSummaryObject[];
}

const AgencyAccountSummary = ({ accountSummary }: AccountSummaryProps) => {
  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <h3>Account Summary</h3>
      </Col>
      {accountSummary.map((description, index) => {
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
  );
};

export default AgencyAccountSummary;
