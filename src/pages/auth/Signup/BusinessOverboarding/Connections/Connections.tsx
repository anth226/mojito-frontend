import { Col, Input, Row, Space } from 'antd';
import React, { useState } from 'react';
import ConnectionCard from 'components/ConnectionCard/ConnectionCard';
import { ReactComponent as MagnifyingGlass } from 'assets/Icons/MagnifyingGlass.svg';
import classes from './Connections.module.css';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getOnboardingFromStore,
  updateConnections,
} from 'reduxSlices/onboarding/onboarding';

const BusinessOnBoardingConnections = () => {
  const { allConnectionList } = useAppSelector(getOnboardingFromStore);

  const [searchValue, setSearchValue] = useState('');

  const dispatch = useAppDispatch();

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value;
    setSearchValue(searchString);
  };

  const isInSearch = (connectionName: string) => {
    if (connectionName.includes(searchValue)) {
      return true;
    } else {
      return false;
    }
  };

  const onConnectButtonClick = (index: number) => {
    dispatch(updateConnections({ index, notNested: true }));
  };

  return (
    <Space direction='vertical'>
      <>
        <div>
          <h1 style={{ margin: '0px' }}>Connections</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <Input
          className={classes.search_box}
          size='large'
          placeholder='Search'
          prefix={<MagnifyingGlass />}
          onChange={onSearchChange}
        />
        <Row gutter={[16, 16]} justify={'center'}>
          {allConnectionList.map((connection, index) => {
            if (!isInSearch(connection.name)) {
              return <React.Fragment key={connection.key}></React.Fragment>;
            }
            return (
              <Col key={connection.key}>
                <ConnectionCard
                  connection={connection}
                  cover
                  description
                  direction='vertical'
                  onConnectButtonClick={() => onConnectButtonClick(index)}
                />
              </Col>
            );
          })}
        </Row>
      </>
    </Space>
  );
};

export default BusinessOnBoardingConnections;
