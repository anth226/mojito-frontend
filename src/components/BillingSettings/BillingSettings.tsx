import { Col, Modal, Row, Table } from 'antd';
import { useGraphQlQuery } from 'hooks/useCustomHookApollo';
import PlanCard from 'components/PlanCard/PlanCard';
import { useEffect, useState } from 'react';
import { ReactComponent as UploadIcon } from 'assets/Icons/Upload.svg';
import dayjs from 'dayjs';
import { USDcurrency } from 'utils/formatters';
import CustomBadge from 'components/CustomBadge/CustomBadge';
import Tick from 'assets/Icons/Tick';
import ArrowDown from 'assets/Icons/ArrowDown';
import classes from './BillingSettings.module.css';
import AgencyAccountSummary from './AccountSummary/AccountSummary';
import AgencyBillingDetails from './BillingDetails/BillingDetails';
import { GET_PLANS_LISTS,GET_BILLING_DETAILS,GET_BILLING_History} from 'api/graphql/queries';
import { Tenure,Plan } from 'interfaces/billing';
import Spinner from 'components/loaders/Spinner';
import Bolt from 'assets/Icons/Bolt';
import { BillingTypes } from 'enums/billing';

const { IconBadge } = CustomBadge;

const columns = [
  {
    title: (
      <span>
        Invoice <ArrowDown stroke='black' />
      </span>
    ),
    dataIndex: 'title',
    render(value: any, record: any, index: any) {
      return (
        (record as any).title +
        ' - ' +
        dayjs((record as any).date).format('MMM YYYY')
      );
    },
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    width: '150px',
    render(value: number | bigint, record: any, index: any) {
      return 'USD ' + USDcurrency.format(value);
    },
  },
  {
    title: 'Date',
    dataIndex: 'date',
    width: '150px',
    render(value: Date) {
      return dayjs(value).format('MMM D, YYYY');
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: '130px',
    render(value: any, record: any, index: any) {
      return (
        <IconBadge
          icon={<Tick />}
          text={<span style={{ fontWeight: '500' }}>{value}</span>}
        />
      );
    },
  },
  {
    title: '',
    dataIndex: '',
    width: '70px',
    render(value: any, record: any, index: any) {
      return (
        <UploadIcon
          style={{
            width: '24px',
            height: '24px',
            cursor: 'pointer',
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

 type detail={
  label: string
  value: string
 }
 type history={
  key:number,
  title:string,
  amount: number,
  date: Date,
  status: string,
 }



const billingDetailsForm = {
  card_number: '4242 4242 4242 4242',
  card_expiration: '11/23',
  card_cvv: '111',
  name: 'Casey Melika',
  email: 'casey@optyo.ney',
  country_code: '+1',
  phone: '3109936929',
  street: 'CHICAGO ST',
  apt_suit_number: '3030',
  region: 'US',
  state: 'California',
  city: 'San Diego',
  zip_code: '92117',
};

const { confirm } = Modal;

const BillingSettings = () => {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [accountSummary,setAccountSummary] = useState<detail[]>([])
  const [billingDetails, setBillingDetails] = useState<detail[]>([])
  const [data, setData] = useState<history[]>([])

  const [menuItem, setMenuItem] = useState(1);

  

  const {
    data: plansList,
    loading: isFetchPlans,
  } = useGraphQlQuery(GET_PLANS_LISTS);
  
  const {
    data: myBillingData,
    loading: isFetchBillingData,
  } = useGraphQlQuery(GET_BILLING_DETAILS);

  const {
    data: myBillingHistory,
    loading: isFetchBillingHistory,
  } = useGraphQlQuery(GET_BILLING_History);
  console.log(myBillingHistory)

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(()=>{
    if(!isFetchBillingData){
      const tempSummary = [
  {
    label: 'Company name',
    value: myBillingData.userBillingDetails.name,
  },
  {
    label: 'Current plan',
    value: myBillingData.userBillingDetails.plan,
  },
  {
    label: 'Subscription renewal',
    value: myBillingData.userBillingDetails.nextBilling,
  },
  
];

const tempBillingDetails = [
  {
    label: 'Name',
    value: myBillingData.userBillingDetails.name,
  },
  {
    label: 'Email',
    value: myBillingData.userBillingDetails.email,
  },
  {
    label: 'Phone',
    value: myBillingData.userBillingDetails.phone,
  },
  {
    label: 'Address',
    value: `${myBillingData.userBillingDetails.apt_suit_number} ${myBillingData.userBillingDetails.street},${myBillingData.userBillingDetails.city}, ${myBillingData.userBillingDetails.state} ${myBillingData.userBillingDetails.region} 92117`,
  },
  {
    label: 'Card',
    value: `Visa **** **** ${myBillingData.userBillingDetails.card_number}`,
  },
  {
    label: 'Expiry',
    value: `${myBillingData.userBillingDetails.card_expiration}`,
  },
];

setBillingDetails(tempBillingDetails)
setAccountSummary(tempSummary)

    }

  },[isFetchBillingData, myBillingData])

  useEffect(()=>{
    if(!isFetchBillingHistory){
      const tempData:history[]=[]
      myBillingHistory.userBillingHistory.billingHistory.map((history:history,index:number)=>{
        tempData.push({
          key: index,
          title: 'Starter plan',
          amount: history.amount,
          date: new Date(history.date),
          status: 'Paid',
        });
        
      })
      setData(tempData)


    }

  },[isFetchBillingHistory,myBillingHistory])
  const onBillingChange = (data: number, type: BillingTypes) => {
    if (type === BillingTypes.PACKAGE) {
      confirm({
        title: 'Are you sure, you want to change your plan?',
        content:
          'Changes in you plan will take effects from the next billing cycle.',
        onOk() {
          setSelectedPlan(data);
        },
        okText: 'Yes, Confirm',
        onCancel() {
          console.log('Canceled');
        },
        width: '600px',
      });
    }
    if (type === BillingTypes.FREQUENCY) {
      confirm({
        title: 'Are you sure, you want to change your billing frequency?',
        content:
          'Changes in you plan will take effects from the next billing cycle.',
        onOk() {
          setMenuItem(data);
        },
        okText: 'Yes, Confirm',
        onCancel() {
          console.log('Canceled');
        },
        width: '600px',
      });
    }
  };

  return (
    <Row gutter={[48, 16]}>
      <Col span={18}>
        <div>
        {isFetchPlans&& (<Spinner/>)}  
          <div style={{ display: 'grid', gap: '10px' }}>
            {!isFetchPlans&&plansList.fetchPlans.plans.map((plan:Plan, index:number) => {
              return (
                <PlanCard
                  key={index}
                  title={plan.planName}
                  amount={plan.amount}
                  tenure={plan.interval==="month"? Tenure.MONTHLY:Tenure.YEARLY}
                  description={plan.description}
                  selected={index === selectedPlan}
                  onClick={() => onBillingChange(index, BillingTypes.PACKAGE)}
                  Icon={Bolt}
                />
              );
            })}
          </div>
          <div>
            <p
              style={{
                marginTop: '24px',
                marginBottom: '10px',
                fontWeight: '500',
                fontSize: '1rem',
              }}
            >
              Billing history
            </p>
            <Table
              tableLayout='fixed'
              scroll={{ y: '380px' }}
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
              color: menuItem === 0 ? '#FFFFFF' : '#0062FF',
              backgroundColor: menuItem === 0 ? '#0062FF' : '#FFFFFF',
            }}
            className={classes.billing_menu_button}
            onClick={() => onBillingChange(0, BillingTypes.FREQUENCY)}
          >
            <b>Billed monthly</b>
          </span>
          <span
            style={{
              color: menuItem === 1 ? '#FFFFFF' : '#0062FF',
              backgroundColor: menuItem === 1 ? '#0062FF' : '#FFFFFF',
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

export default BillingSettings;
