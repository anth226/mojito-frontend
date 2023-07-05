import { Button, Col, Input, Row } from 'antd';
import PlusIcon from 'assets/Icons/Plus';
import { Client } from 'interfaces/Client';
import React, { useState } from 'react';
import { emailValidator } from 'utils/validators';

import classes from './GeneralInfo.module.css';

const newClient: Client = {
  name: '',
  email: '',
};
interface GeneralInfoProps {
  step: any;
}
export const GeneralInfo = (props: GeneralInfoProps) => {
  const [clients, setCLients] = useState<Client[]>([newClient]);

  const { step } = props;

  const addClient = () => {
    setCLients((prevState) => [...prevState, newClient]);
  };

  const onChange = (e: any, index: number) => {
    const propertyName = e.target.name;
    const propertyValue = e.target.value;
    const temporaryList = JSON.parse(JSON.stringify(clients));
    temporaryList[index][propertyName] = propertyValue;
    setCLients(temporaryList);
  };

  return (
    <>
      <h1 className={classes.title}>{step.title}</h1>
      <Row gutter={[32, 32]}>
        {clients.map((client, index) => {
          return (
            <React.Fragment key={index}>
              <Col span={12}>
                <label className={classes.input_label}>Client name</label>
                <Input
                  name='name'
                  onChange={(e) => onChange(e, index)}
                  value={client.name}
                  placeholder='Input placeholder'
                  className={classes.input}
                />
              </Col>
              <Col span={12}>
                <label className={classes.input_label}>Email</label>
                <Input
                  name='email'
                  type='email'
                  onChange={(e) => onChange(e, index)}
                  status={emailValidator(client.email) ? '' : 'error'}
                  value={client.email}
                  placeholder='Input placeholder'
                  className={classes.input}
                />
              </Col>
            </React.Fragment>
          );
        })}
        <Col span={12}>
          <Button
            icon={<PlusIcon />}
            type='text'
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '0px',
              justifyContent: 'space-around',
              color: '#384CFF',
            }}
            onClick={addClient}
          >
            <b className={classes.button_text}>Add More Client</b>
          </Button>
        </Col>
      </Row>
    </>
  );
};
