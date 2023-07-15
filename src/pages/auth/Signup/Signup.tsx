import { Card, Space } from 'antd';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import { ReactComponent as AgencyIcon } from 'assets/Icons/Agency.svg';
import { ReactComponent as BusinessIcon } from 'assets/Icons/Business.svg';
import CustomMenu, { MenuItem } from 'components/CustomMenu/CustomMenu';
import { AccountType, getAuthFromStore } from 'reduxSlices/auth/auth';
import { AgencyOnBoardingPaths, AuthenticationPaths } from 'pages/paths';
import AgencySignUp from './AgencySignUp/AgencySignUp';
import BusinessSignUp from './BusinessSignUp/BusinessSignUp';

const items: MenuItem[] = [
  {
    label: 'Agency',
    value: AccountType.AGENCY,
    icon: <AgencyIcon />,
  },
  {
    label: 'Business',
    value: AccountType.BUSINESS,
    icon: <BusinessIcon />,
  },
];

const SignUp = () => {
  const authObject = useAppSelector(getAuthFromStore);
  const [accountType, setAccountType] = useState<AccountType>(0);

  const navigate = useNavigate();

  const onUserTypeChange = (item: any) => {
    setAccountType(item.value);
  };

  useEffect(() => {
    if (authObject.signup) {
      if (authObject.signup.account === AccountType.AGENCY) {
        navigate(AgencyOnBoardingPaths.CLIENTS);
      }
      if (authObject.signup.account === AccountType.BUSINESS) {
        navigate(AuthenticationPaths.BUSINESS_OVERBOARDING);
      }
    }
  }, [authObject.authenticated, authObject.role, authObject.signup, navigate]);

  return (
    <Card
      style={{ maxWidth: '590px', height: 'fit-content', marginTop: '80px' }}
    >
      <Space
        direction='vertical'
        size='middle'
        style={{ textAlign: 'center', width: '500px' }}
      >
        <div>
          <h1 style={{ margin: '0px' }}>Sign up</h1>
          <span>
            Already have an account?{' '}
            <NavLink to={AuthenticationPaths.LOGINPATH}>Log In</NavLink>
          </span>
        </div>
        <span style={{ display: 'flex', marginLeft: '2px' }}>User Type</span>
        <CustomMenu
          direction='horizontal'
          items={items}
          onItemClick={onUserTypeChange}
        />
        {accountType === AccountType.AGENCY && <AgencySignUp />}
        {accountType === AccountType.BUSINESS && <BusinessSignUp />}
      </Space>
    </Card>
  );
};

export default SignUp;
