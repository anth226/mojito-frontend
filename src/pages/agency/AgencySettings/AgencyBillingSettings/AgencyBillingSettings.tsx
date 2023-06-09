import { Col, Modal, Row, Table } from "antd";
import PlanCard from "../../../../components/PlanCard/PlanCard";
import { useState } from "react";
import { ReactComponent as UploadIcon } from "../../../../assets/Icons/Upload.svg";
import dayjs from "dayjs";
import { USDcurrency } from "../../../../utils/formatters";
import CustomBadge from "../../../../components/CustomBadge/CustomBadge";
import Tick from "../../../../assets/Icons/Tick";
import ArrowDown from "../../../../assets/Icons/ArrowDown";
import classes from "./AgencyBillingSettings.module.css";
import AgencyAccountSummary from "./AgencyAccountSummary/AgencyAccountSummary";
import AgencyBillingDetails from "./AgencyBillingDetails/AgencyBillingDetails";
import { plans } from "../../../../constants/BillingPlans";
import { BillingTypes } from "../../../../enums/billing";

const { IconBadge } = CustomBadge;

const columns = [
  {
    title: (
      <span>
        Invoice <ArrowDown stroke="black" />
      </span>
    ),
    dataIndex: "title",
    render(value: any, record: any, index: any) {
      return (
        (record as any).title +
        " - " +
        dayjs((record as any).date).format("MMM YYYY")
      );
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: "150px",
    render(value: number | bigint, record: any, index: any) {
      return "USD " + USDcurrency.format(value);
    },
  },
  {
    title: "Date",
    dataIndex: "date",
    width: "150px",
    render(value: Date) {
      return dayjs(value).format("MMM D, YYYY");
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    width: "130px",
    render(value: any, record: any, index: any) {
      return (
        <IconBadge
          icon={<Tick />}
          text={<span style={{ fontWeight: "500" }}>{value}</span>}
        />
      );
    },
  },
  {
    title: "",
    dataIndex: "",
    width: "70px",
    render(value: any, record: any, index: any) {
      return (
        <UploadIcon
          style={{
            width: "24px",
            height: "24px",
            cursor: "pointer",
            // background: "#F2F3F7",
            // padding: "11px",
            // borderRadius: "25px",
          }}
        />
      );
    },
  },
];

const data: any = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    title: "Starter plan",
    amount: 828,
    date: new Date(),
    status: "Paid",
  });
}

const accountSummary = [
  {
    label: "Company name",
    value: "OPTYO",
  },
  {
    label: "Current plan",
    value: "Professional",
  },
  {
    label: "Subscription renewal",
    value: "OPTYO",
  },
];

const billingDetails = [
  {
    label: "Name",
    value: "Casey Melika",
  },
  {
    label: "Email",
    value: "casey@optyo.ney",
  },
  {
    label: "Phone",
    value: "3109936929",
  },
  {
    label: "Address",
    value: "3030 CHICAGO ST,San Diego, California US 92117",
  },
  {
    label: "Card",
    value: "4148 **** **** 4123",
  },
  {
    label: "Expiry",
    value: "8 / 2026",
  },
];

const billingDetailsForm = {
  card_number: "4242 4242 4242 4242",
  card_expiration: "11/23",
  card_cvv: "111",
  name: "Casey Melika",
  email: "casey@optyo.ney",
  country_code: "+1",
  phone: "3109936929",
  street: "CHICAGO ST",
  apt_suit_number: "3030",
  region: "US",
  state: "California",
  city: "San Diego",
  zip_code: "92117",
};

const { confirm } = Modal;

const ClientBillingSettings = () => {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [menuItem, setMenuItem] = useState(1);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onBillingChange = (data: number, type: BillingTypes) => {
    if (type === BillingTypes.PACKAGE) {
      confirm({
        title: "Are you sure, you want to change your plan?",
        content:
          "Changes in you plan will take effects from the next billing cycle.",
        onOk() {
          setSelectedPlan(data);
        },
        okText: "Yes, Confirm",
        onCancel() {
          console.log("Canceled");
        },
        width: "600px",
      });
    }
    if (type === BillingTypes.FREQUENCY) {
      confirm({
        title: "Are you sure, you want to change your billing frequency?",
        content:
          "Changes in you plan will take effects from the next billing cycle.",
        onOk() {
          setMenuItem(data);
        },
        okText: "Yes, Confirm",
        onCancel() {
          console.log("Canceled");
        },
        width: "600px",
      });
    }
  };

  return (
    <Row gutter={[48, 16]}>
      <Col span={18}>
        <div style={{ display: "grid", gap: "10px" }}>
          <div style={{ display: "grid", gap: "10px" }}>
            {plans.map((plan, index) => {
              return (
                <PlanCard
                  key={index}
                  title={plan.title}
                  amount={plan.amount}
                  tenure={plan.tenure}
                  description={plan.description}
                  selected={index === selectedPlan}
                  onClick={() => onBillingChange(index, BillingTypes.PACKAGE)}
                  Icon={plan.icon}
                />
              );
            })}
          </div>
          <div>
            <p
              style={{
                marginTop: "24px",
                marginBottom: "10px",
                fontWeight: "500",
                fontSize: "1rem",
              }}
            >
              Billing history
            </p>
            <Table
              tableLayout="fixed"
              scroll={{ y: "380px" }}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          </div>
        </div>
      </Col>
      <Col span={6}>
        <div className={classes.billing_menu}>
          <span
            style={{
              color: menuItem === 0 ? "#FFFFFF" : "#0062FF",
              backgroundColor: menuItem === 0 ? "#0062FF" : "#FFFFFF",
            }}
            className={classes.billing_menu_button}
            onClick={() => onBillingChange(0, BillingTypes.FREQUENCY)}
          >
            <b>Billed monthly</b>
          </span>
          <span
            style={{
              color: menuItem === 1 ? "#FFFFFF" : "#0062FF",
              backgroundColor: menuItem === 1 ? "#0062FF" : "#FFFFFF",
            }}
            className={classes.billing_menu_button}
            onClick={() => onBillingChange(1, BillingTypes.FREQUENCY)}
          >
            <b>Billed annually</b>
          </span>
        </div>
        {accountSummary.length > 0 && (
          <AgencyAccountSummary accountSummary={accountSummary} />
        )}
        {billingDetails.length > 0 && (
          <AgencyBillingDetails
            billingDetails={billingDetails}
            billingDetailsForm={billingDetailsForm}
          />
        )}
      </Col>
    </Row>
  );
};

export default ClientBillingSettings;
