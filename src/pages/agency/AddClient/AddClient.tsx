import { Button, message, Steps } from 'antd';
import { Client } from 'interfaces/Client';
import { useState } from 'react';
import { GeneralInfo } from './GeneralInfo/GeneralInfo';
import { Connections } from './Connections/Connections';
import classes from './AddClient.module.css';
import ArrowLeft from 'assets/Icons/ArrowLeft';

const newClient: Client = {
  name: '',
  email: '',
};

export const AddClient = () => {
  const [current, setCurrent] = useState(0);
  const [clients, setCLients] = useState<Client[]>([newClient]);

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

  const steps = [
    {
      title: 'General information',
      content: 'general-information',
    },
    {
      title: 'Connections',
      content: 'connections',
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <div style={{ display: 'flex', height: '100%', width: '100%' }}>
        <div style={{ width: '340px' }}>
          <Button icon={<ArrowLeft />} className={classes.button_back}>
            Back
          </Button>
          <Steps current={current} items={items} direction='vertical' />
        </div>
        <div style={{ width: '100%' }}>
          <div>
            {steps[current].content === 'general-information' && (
              <div className={classes.content_box}>
                <GeneralInfo step={steps[current]} />
              </div>
            )}
            {steps[current].content === 'connections' && (
              <div className={classes.content_box}>
                <Connections step={steps[current]} />
              </div>
            )}
          </div>
          <div className={classes.action_box}>
            <Button
              className={[classes.button_action, classes.button_cancel].join(
                ' '
              )}
              type='primary'
            >
              Cancel
            </Button>
            {current < steps.length - 1 && (
              <Button
                className={[classes.button_action, classes.button_next].join(
                  ' '
                )}
                type='primary'
                onClick={() => next()}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                className={[classes.button_action, classes.button_next].join(
                  ' '
                )}
                type='primary'
                onClick={() => message.success('Processing complete!')}
              >
                Confirm
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
