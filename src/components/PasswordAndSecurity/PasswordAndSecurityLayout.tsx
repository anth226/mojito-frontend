import { Space } from 'antd';
import ArrowRight from 'assets/Icons/ArrowRight';
import { IconKey } from 'assets/Icons/IconKey';
import { IconSecurity } from 'assets/Icons/IconSecurity';
import { useEffect, useState } from 'react';
import PasswordAndSecurity from './PasswordAndSecurity';
import classes from './PasswordAndSecurity.module.css';
import { TwoFactorAuth } from './TwoFactorAuth';
import { useNavigate } from 'react-router-dom';

export const PasswordAndSecurityLayout = () => {
  const [securityMethod, setSecurityMethod] = useState<string>('');
  const navigate = useNavigate();

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
  useEffect(() => {
    setSecurityMethod('');
  }, [navigate]);

  return (
    <>
      {securityMethod === 'Password' && <PasswordAndSecurity />}
      {securityMethod === 'Two-factor authentification' && <TwoFactorAuth />}
      {!securityMethod && (
        <div className={classes.box_content}>
          {securityMethods.map((item: any, index: number) => (
            <Space
              className={classes.box_item}
              key={index}
              onClick={() => setSecurityMethod(item.name)}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                {item.icon}
                <p className={classes.item_name}>{item.name}</p>
              </div>
              <ArrowRight />
            </Space>
          ))}
        </div>
      )}
    </>
  );
};
