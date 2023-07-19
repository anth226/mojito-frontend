import { Select } from 'antd';
import { ClientRoles } from 'enums/clients';

const getSelectOptionItem = ({ value, label, dotColor }: any) => {
  return {
    value: value,
    label: (
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          fontWeight: 'bold',
          color: 'black',
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            backgroundColor: dotColor ?? '#0062FF',
            borderRadius: '25px',
          }}
        />
        {label}
      </div>
    ),
  };
};

const options = [
  // getSelectOptionItem({ value: ClientRoles.ADMIN, label: 'Admin' }),
  // getSelectOptionItem({ value: ClientRoles.OWNER, label: 'Owner' }),
  getSelectOptionItem({ value: ClientRoles.CLIENT, label: 'Client' }),
  // getSelectOptionItem({ value: ClientRoles.STAFF, label: 'Staff' }),
  getSelectOptionItem({
    value: ClientRoles.USER,
    label: 'User',
    dotColor: '#FE7E07',
  }),
];

interface UserTypeSelectionProps {
  defaultValue?: string;
  onChange?: (
    value: string | { value: any; label: JSX.Element },
    option:
      | { value: any; label: JSX.Element }
      | { value: any; label: JSX.Element }[]
  ) => void;
}

const UserTypeSelection = ({
  defaultValue,
  onChange,
}: UserTypeSelectionProps) => {
  return (
    <Select
      size='large'
      options={options}
      bordered={false}
      style={{
        width: '100%',
        background: '#E2E2EA',
        // border: "1px solid #384CFF",
      }}
      defaultValue={defaultValue ?? options[0]}
      onChange={onChange}
    />
  );
};

export default UserTypeSelection;
