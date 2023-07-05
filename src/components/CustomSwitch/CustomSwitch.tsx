import React from 'react';
import { Switch } from 'antd';
import { SwitchChangeEventHandler } from 'antd/es/switch';
import './CustomSwitch.css';

type CustomSwitchProps = {
  checked: boolean;
  onChange?: SwitchChangeEventHandler;
};

const CustomSwitch: React.FC<CustomSwitchProps> = ({ checked, onChange }) => {
  return (
    <Switch className='button-switch' checked={checked} onChange={onChange} />
  );
};

export default CustomSwitch;
