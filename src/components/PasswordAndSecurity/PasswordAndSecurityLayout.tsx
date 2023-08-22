import { Space } from 'antd';
import ArrowRight from 'assets/Icons/ArrowRight';
import { IconKey } from 'assets/Icons/IconKey';
import { IconSecurity } from 'assets/Icons/IconSecurity';
import { Fragment, useState } from 'react';
import PasswordAndSecurity from './PasswordAndSecurity';
import classes from './PasswordAndSecurity.module.css';
import { TwoFactorAuth } from './TwoFactorAuth';

export const PasswordAndSecurityLayout = () => {
  const [securityMethod, setSecurityMethod] = useState<string[]>(['', '']);

  const handleChangeSecurityMethod = (index: number) => {
    const newSecurityMethod = securityMethod;
    if (index === 0) {
      newSecurityMethod[index]
        ? (newSecurityMethod[index] = '')
        : (newSecurityMethod[index] = 'Password');
    } else {
      newSecurityMethod[index]
        ? (newSecurityMethod[index] = '')
        : (newSecurityMethod[index] = 'Two-factor authentification');
    }

    setSecurityMethod([...newSecurityMethod]);
  };

  const securityMethods = [
    {
      name: 'Password',
      icon: <IconKey fill='#F2F3F7' stroke='#656575' />,
    },
    {
      name: 'Two-factor authentification',
      icon: <IconSecurity fill='#F2F3F7' stroke='#656575' />,
    },
  ];

  return (
    <>
      <div className={classes.box_content}>
        {securityMethods.map((item: any, index: number) => (
          <Fragment key={index}>
            <Space
              className={classes.box_item}
              onClick={() => handleChangeSecurityMethod(index)}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                {item.icon}
                <p className={classes.item_name}>{item.name}</p>
              </div>
              <ArrowRight />
            </Space>
            {securityMethod.includes('Password') &&
              item.name === 'Password' && <PasswordAndSecurity />}
            {securityMethod.includes('Two-factor authentification') &&
              item.name === 'Two-factor authentification' && <TwoFactorAuth />}
          </Fragment>
        ))}
      </div>
    </>
  );
};
