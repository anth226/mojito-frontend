import { Select } from 'antd';
import classes from './CustomSelect.module.css';
import './CustomSelect.css';
import ArrowDownMini from 'assets/Icons/ArrowDownMini';

interface Option {
  label: string;
  value: string;
}
type CustomSelectProps = {
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string | Option, option: Option | Option[]) => void;
};

export const CustomSelect = (props: CustomSelectProps) => {
  const { options, defaultValue, onChange } = props;
  return (
    <Select
      suffixIcon={<ArrowDownMini />}
      className={[classes.select, 'select-input'].join(' ')}
      options={options}
      defaultValue={defaultValue ?? options[0]}
      onChange={onChange}
    ></Select>
  );
};
