import React from 'react';
import { Switch } from 'antd';
import { SwitchChangeEventHandler } from 'antd/es/switch';
import './CustomSwitch.css';

type CustomSwitchProps = {
  loading?: boolean;
  checked: boolean;
  onChange?: SwitchChangeEventHandler;
};

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  checked,
  onChange,
  loading,
}) => {
  return (
    <Switch
      loading={loading}
      className='button-switch'
      checked={checked}
      onChange={onChange}
    />
  );
};

export default CustomSwitch;
