import { Button, Col, Input, Row } from 'antd';
import React, { useState } from 'react';
import { read, utils } from 'xlsx';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { ReactComponent as PlusIcon } from '../../../../../assets/Icons/Plus.svg';
import Uploader from '../../../../../components/Uploader/Uploader';
import { Client } from '../../../../../interfaces/Client';
import {
  getOnboardingFromStore,
  setClientsInStore,
} from '../../../../../reduxSlices/onboarding/onboarding';
import { emailValidator } from '../../../../../utils/validators';

const newClient: Client = {
  name: '',
  email: '',
  avatar: '',
  value: 0,
  percentage: 0,
};
const Clients = () => {
  const clientsInStore = useAppSelector(getOnboardingFromStore).clients;
  const [clients, setCLients] = useState<Client[]>(
    clientsInStore.length > 0 ? clientsInStore : [newClient]
  );
  const dispatch = useAppDispatch();

  const addClient = () => {
    setCLients((prevState) => [...prevState, newClient]);
  };

  const onChange = (e: any, index: number) => {
    const propertyName = e.target.name;
    const propertyValue = e.target.value;
    const temporaryList = JSON.parse(JSON.stringify(clients));
    temporaryList[index][propertyName] = propertyValue;
    setCLients(temporaryList);
    dispatch(setClientsInStore(temporaryList));
  };

  const onFileGet = async (info: any) => {
    const file = await info.file.arrayBuffer();
    const workbook = read(file);
    const data = utils.sheet_to_json(workbook.Sheets['Sheet1'], { raw: true });
    addClientsFromFile(data);
  };

  const addClientsFromFile = (data: any) => {
    const temporaryList = [];
    for (const row of data) {
      temporaryList.push({
        name: row.Name,
        email: row.Email,
        avatar: '',
        value: 0,
        percentage: 0,
        connections: [],
      });
    }
    setCLients(temporaryList);
    dispatch(setClientsInStore(temporaryList));
  };

  return (
    <>
      <div>
        <h1 style={{ margin: '0px' }}>Clients</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <Uploader
        onFileGet={onFileGet}
        filesDescription={'XLS (max. 200 mb)'}
        accept={'.xlsx,.csv'}
      />
      <b>or enter the clients manually</b>
      <Row
        gutter={[16, 16]}
        justify={'start'}
        style={{ textAlign: 'start', color: '#9A9AAF' }}
      >
        {clients.map((client, index) => {
          return (
            <React.Fragment key={index}>
              <Col span={12}>
                <label>Client name</label>
                <Input
                  name='name'
                  onChange={(e) => onChange(e, index)}
                  value={client.name}
                />
              </Col>
              <Col span={12}>
                <label>Email</label>
                <Input
                  name='email'
                  type='email'
                  onChange={(e) => onChange(e, index)}
                  status={emailValidator(client.email) ? '' : 'error'}
                  value={client.email}
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
              width: '60%',
              display: 'flex',
              paddingLeft: '0px',
              justifyContent: 'space-around',
              color: '#0062FF',
            }}
            onClick={addClient}
          >
            <b>Add Client</b>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Clients;
