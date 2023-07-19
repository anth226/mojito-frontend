import { Button, Col, Input, Select } from 'antd';
import { ClientRoles } from 'enums/clients';
import { emailValidator } from 'utils/validators';

const getSelectOptionItem = ({ value, label }: any) => {
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
            backgroundColor: '#0062FF',
            borderRadius: '25px',
          }}
        />
        {label}
      </div>
    ),
  };
};

const options = [
  getSelectOptionItem({ value: 'client', label: 'Client' }),
  getSelectOptionItem({ value: 'user', label: 'User' }),
];

interface NewUserProps {
  client: {
    name: string;
    surname: string;
    email: string;
    role?: ClientRoles;
  };
  onChange: Function;
  index: number;
  sendInvite: CallableFunction;
}

const NewUser = ({ client, onChange, index, sendInvite }: NewUserProps) => {
  const handleChange = (value: any) => {
    onChange(value, index);
  };
  const canInvite = () => {
    if (
      client.name !== '' &&
      client.surname !== '' &&
      client.email !== '' &&
      emailValidator(client.email)
    ) {
      return true;
    }
    return false;
  };
  return (
    <>
      <Col span={6}>
        <label>Name</label>
        <Input
          name='name'
          size='large'
          onChange={(e) => onChange(e, index)}
          value={client.name}
          placeholder={'Enter name'}
        />
      </Col>
      <Col span={6}>
        <label>Surname</label>
        <Input
          name='surname'
          size='large'
          onChange={(e) => onChange(e, index)}
          value={client.surname}
          placeholder={'Enter surname'}
        />
      </Col>
      <Col span={6}>
        <label>Email</label>
        <Input
          name='email'
          size='large'
          type='email'
          onChange={(e) => onChange(e, index)}
          status={emailValidator(client.email) ? '' : 'error'}
          value={client.email}
          placeholder={'Enter email'}
        />
      </Col>
      <Col span={4}>
        <Select
          size='large'
          options={options}
          onChange={handleChange}
          //   bordered={false}
          style={{ width: '100%', marginTop: '20px' }}
          defaultValue={options[0]}
        />
      </Col>
      <Col span={2}>
        <Button
          size='large'
          style={{ width: '100%', marginTop: '20px' }}
          onClick={() => sendInvite(index)}
          disabled={!canInvite()}
        >
          Invite
        </Button>
      </Col>
    </>
  );
};

export default NewUser;
