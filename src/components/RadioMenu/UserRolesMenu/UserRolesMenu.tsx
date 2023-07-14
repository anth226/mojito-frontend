import { ChangeEventHandler } from 'react';
import RadioMenu from '../RadioMenu';
import classes from './UserRolesMenu.module.css';
import { ClientRoles } from 'enums/clients';

function getUserRoleItem(value: string, color: string) {
  return {
    value: value,
    label: (
      <div className={classes.div_label}>
        <div
          style={{
            width: '8px',
            height: '8px',
            backgroundColor: color,
            borderRadius: '25px',
          }}
        />
        {value[0].toUpperCase() + value.slice(1)}
      </div>
    ),
  };
}

const items = [
  getUserRoleItem(ClientRoles.CLIENT, '#0062FF'),
  getUserRoleItem(ClientRoles.USER, '#FE7E07'),
];

interface UserRolesMenuProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
  name?: string;
}

const UserRolesMenu = ({ onChange, defaultValue }: UserRolesMenuProps) => {
  return (
    <RadioMenu
      items={items}
      group='userRole'
      direction='row'
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
};

export default UserRolesMenu;
